/**
 * ImportController
 *
 * @description :: Server-side logic for managing Import
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Import.find().populate('lists').populate('segments').exec(function (err, imports) {
      if (err) {
        return res.serverError(err);
      }
      res.view('page/imports/index', {imports: imports});
    });
  },

  destroy: function (req, res) {
    return res.json({});
    var id = req.param('id');
    Import.destroy({id: id}).exec(function (err) {
      if (err) {
        return res.negotiate(err);
      }
      return res.redirect("/imports/");
    });
  },

  new: function (req, res) {
    List.find(function (err, lists) {
      //return res.view('page/imports/new-step3');
      if (err) {
        return res.serverError(err);
      }
      Parameter.find({model: 'audience'}, function (err, audiences) {
        if (err) {
          return res.serverError(err);
        }
        res.view('page/imports/new-step1', {audiences: audiences, lists: lists});
      })
    });
  },

  XLSX2ToJson: function (path) {
    const XLSX = require('xlsx');
    const workbook = XLSX.readFile(path);
    const sheet_name_list = workbook.SheetNames;
    var arrayJSON = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    var arrayLines = [];
    for (var key in arrayJSON) {
      if (key == 0) arrayLines.push(Object.keys(arrayJSON[key]));
      arrayLines.push(Object.values(arrayJSON[key]));
    }
    return arrayLines;
  },

  CSV2ToJson: function (path) {
    var fs = require('fs');
    var Papa = require('papaparse');
    var content = fs.readFileSync(path, "utf8");
    var rows;
    Papa.parse(content, {
      header: false,
      complete: function (results) {
        //console.log("Finished:", results.data);
        rows = results.data;
      }
    });
    return rows;
  },

  XML2ToJson: function (path) {

  },


  createStep1: function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    req.file('ImportFile').upload({
      dirname: '../../assets/files/imports/'
    }, function (err, files) {
      if (err) return res.serverError(err);
      if (files[0].filename.split('.').pop() == "xlsx") var first2Line = module.exports.XLSX2ToJson(files[0].fd).slice(0, 2);
      else if (files[0].filename.split('.').pop() == "csv") var first2Line = module.exports.CSV2ToJson(files[0].fd).slice(0, 2);
      else var first2Line = module.exports.XML2ToJson(files[0].fd).slice(0, 2);
      var lists = params['lists[]'];
      delete params['lists[]'];
      Import.create(Object.assign(params, {
        path: files[0].fd,
        name: files[0].filename,
        lists: lists,
        progress: '0/1'
      }), function importCreated(err, createdImport) {
        if (err) {
          return res.serverError(err);
        }
        res.view('page/imports/new-step2', {Import: createdImport, first2Line: first2Line});
      });
    });
  },

  createStep2: function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Import.findOne({id: req.param('idImport')}).populate('lists').exec(function (err, Import) {
      if (err) {
        return res.serverError(err);
      }
      if (Import.name.split('.').pop() == "csv") var subscribers = module.exports.CSV2ToJson(Import.path);
      else if (Import.name.split('.').pop() == "xml") var subscribers = module.exports.XML2ToJson(Import.path);
      else var subscribers = module.exports.XLSX2ToJson(Import.path);
      if (params['importFirstLine'] != 'on') subscribers.shift();
      delete params['idImport'];
      var newSubscriber = {};
      var lists=Import.lists;
      module.exports.createImportedSubscriber(subscribers,params,lists,0,9);
      Import.progress = 10 + '/' + subscribers.length;
      Import.save();
      var schedule = require('node-schedule');
      var j = schedule.scheduleJob('*/1 * * * *', function () {
        var currentLine = parseInt(Import.progress.split("/")[0]);
        module.exports.createImportedSubscriber(subscribers,params,lists,currentLine,currentLine+10);
        if(currentLine+10 > subscribers.length)
        {
          Import.progress = subscribers.length + '/' + subscribers.length;
        }
        else Import.progress = (currentLine+10) + '/' + subscribers.length;
        //console.log('Cron Job --> Import :'+Import.name+'Progress : '+Import.progress);
        Import.save();
      });
      var date = new Date((new Date()).getTime() + (subscribers.length/10)*60000);
      schedule.scheduleJob(date, function(){
        //console.log('Finish :) Cron Job --> Import :'+Import.name);
        j.cancel();
      });
      res.redirect("/subscribers/");
    });
  },

  createImportedSubscriber: function (subscribers,params,lists, startRange, endRange)
  {
    var newSubscriber = {},subscriber={};
    for(var i=startRange;i<endRange && i<subscribers.length;i++)
    {
      subscriber=subscribers[i];
      var keys = Object.keys(subscriber);
      for (var key in params) {
        newSubscriber[params[key]] = subscriber[Object.keys(subscriber)[parseInt(key.slice(-1))]];
      }
      //console.log(lists);
      Subscriber.create(Object.assign(newSubscriber, {
        status: 'active',
        lists: lists
      })).exec(function (err, subscriberCreated) {
        if (err) {
          return res.serverError(err);
        }
      });
    }
  },

  create: function(req,res) {
    if(req.param('idImport')) {
      module.exports.createStep2(req,res);
    }
    else {
      module.exports.createStep1(req,res);
    }
  },

}
