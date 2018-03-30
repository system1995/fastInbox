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

  destroy: function (req,res) {
    return res.json({});
    var id = req.param('id');
    Import.destroy({id:id}).exec(function (err){
      if (err) {return res.negotiate(err);}
      return res.redirect("/imports/");
    });
  },

  new: function (req, res) {
    List.find(function (err, lists) {
      if (err) {
        return res.serverError(err);
      }
      res.view('page/imports/new-step1', {lists: lists});
    });
  },



  XLSX2ToJson:function (path) {
    const XLSX = require('xlsx');
    const workbook = XLSX.readFile(path);
    const sheet_name_list = workbook.SheetNames;
    var arrayJSON=XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    var arrayLines=[];
    for (var key in arrayJSON) {
      if(key==0) arrayLines.push(Object.keys(arrayJSON[key]));
      arrayLines.push(Object.values(arrayJSON[key]));
    }
    return arrayLines;
  },

  CSV2ToJson:function(path)
  {
    var fs = require('fs');
    var Papa = require('papaparse');
    var content = fs.readFileSync(path, "utf8");
    var rows;
    Papa.parse(content, {
      header: false,
      complete: function(results) {
        //console.log("Finished:", results.data);
        rows = results.data;
      }
    });
    return rows;
  },

  XML2ToJson:function(path)
  {

  },


  createStep1:function(req,res)
  {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    req.file('ImportFile').upload({
      dirname:'../../assets/files/imports/'},function(err,files){
      if (err) return res.serverError(err);
      if(files[0].filename.split('.').pop()=="xlsx") var first2Line=module.exports.XLSX2ToJson(files[0].fd).slice(0,2);
      else if(files[0].filename.split('.').pop()=="csv") var first2Line=module.exports.CSV2ToJson(files[0].fd).slice(0,2);
      else var first2Line=module.exports.XML2ToJson(files[0].fd).slice(0,2);
      Import.create({path:files[0].fd,name:files[0].filename,lists:params['lists[]'],progress:'30'}, function importCreated (err, createdImport) {
        if (err) {
          return res.serverError(err);
        }
        res.view('page/imports/new-step2',{Import:createdImport,first2Line:first2Line});
      });
    });
  },

  createStep2:function(req,res)
  {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Import.findOne({id:req.param('idImport')}).populate('lists').exec(function (err, Import) {
      if (err) {
        return res.serverError(err);
      }
      else if(Import.name.split('.').pop()=="csv") var subscribers=module.exports.CSV2ToJson(Import.path).slice(1);
      else var subscribers=module.exports.XML2ToJson(Import.path);

      var subscribers=module.exports.XLSX2ToJson(Import.path), newSubscriber={};
      delete params['idImport'];
      subscribers.forEach(function(subscriber)
      {
        var keys=Object.keys(subscriber);
        for (var key in params) {
          newSubscriber[params[key]]=subscriber[Object.keys(subscriber)[Object.keys(params).indexOf(key)]];
        }
        Subscriber.create(Object.assign(newSubscriber,{status:'active',lists:Import.lists})).exec(function (err,subscriberCreated) {
          if (err) {return res.serverError(err);}
        })
      });
      res.redirect("/subscribers/");
    });
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
