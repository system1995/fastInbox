/**
 * ImportController
 *
 * @description :: Server-side logic for managing Import
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Export.find().populate('lists').populate('segments').exec(function (err, exports) {
      if (err) {
        return res.serverError(err);
      }
      res.view('page/exports/index', {exports: exports});
    });
  },

  new: function (req, res) {
    List.find(function (err, lists) {
      if (err) {
        return res.serverError(err);
      }
      res.view('page/exports/new-step1', {lists: lists});
    });
  },

  JSON2ToCSV:function(data,idExport)
  {
    var str = '';
    var properties=[];
    /********Add Field of subscribers*******
    for (var i = 0; i < data.length; i++) {
      for (var property in data[i]) {
        if (data[i].hasOwnProperty(property)) {
          if(properties.includes(property)==false) {
            if (line != '') line += ',';
            line += property;
            properties.push(property);
          }
        }
      }
    }
    console.log("Line : "+line);
    */
    /********Add subscribers*******/
    for (var i = 0; i < data.length; i++) {
      var line = '';
       for (var property in data[i]) {
        if (data[i].hasOwnProperty(property)) {
          if (line != '') line += ','
          line += data[i][property];
        }
      }
      str += line + '\r\n';
    }
    fs=require('fs');
    fs.openSync(sails.config.appPath+"/assets/files/exports/"+idExport+".csv", 'w');
    fs.writeFile(sails.config.appPath+"/assets/files/exports/"+idExport+".csv", str, function (err) {
      if (err) throw err;
    });

  },

  JSON2ToXLSX:function(data,idExport)
  {
      const XLSX = require('xlsx');
      const wb = { SheetNames: [], Sheets: {} };
      wb.Props = {
        Title: "Export",
        Author: "FastInbox"
      };
      var ws = XLSX.utils.json_to_sheet(data);
      var ws_name = "DataSheet 1";
      XLSX.utils.book_append_sheet(wb, ws, ws_name);
      XLSX.writeFile(wb, sails.config.appPath+"/assets/files/exports/"+idExport+".xlsx");
  },

  JSON2ToXML:function(data,idExport)
  {
  },

  create: function (req, res) {
    if(req.param('id')) {
      Export.findOne({id:req.param('id')}).exec(function (err, Export) {
        if (err) {
          return res.serverError(err);
        }
        res.download(sails.config.appPath+"/assets/files/exports/"+req.param('id')+"."+Export.format);
      });
    }
    else
    {
      var params = _.extend(req.query || {}, req.params || {}, req.body || {});
      Export.create({name:params['name'],format:params['format'],lists:params['lists[]']}).exec(function (err, Export) {
        if (err) {
          return res.serverError(err);
        }
        Subscriber.find(params['lists']).populate('lists').exec(function (err, subscribers) {
          if(params['format']=='csv') module.exports.JSON2ToCSV(subscribers, Export.id);
          else if(params['format']=='xlsx') module.exports.JSON2ToXLSX(subscribers, Export.id);
          else module.exports.JSON2ToXML(subscribers, Export.id);
        });
        res.view('page/exports/new-step2', {Export: Export});
      });
    }
  },

  destroy: function (req, res) {

  },
}
