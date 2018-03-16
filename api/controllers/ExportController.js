/**
 * ImportController
 *
 * @description :: Server-side logic for managing Import
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Export.find().populate('lists').populate('segments').exec(function (err, imports) {
      if (err) {
        return res.serverError(err);
      }
      res.view('page/exports/index', {model: imports});
    });
  },

  new: function (req, res) {
    List.find(function (err, lists) {
      if (err) {
        return res.serverError(err);
      }
      res.view('page/exports/new', {lists: lists});
    });
  },

  create: function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Export.create(params).exec(function (err, imports) {
      if (err) {return res.serverError(err);}
      Subscriber.find(params['list']).exec(function (err,subscribers) {
        if (err) {return res.serverError(err);}
        const XLSX = require('xlsx');
        const wb = { SheetNames: [], Sheets: {} };
        wb.Props = {
          Title: "Export",
          Author: "Matious"
        };
        var ws = XLSX.utils.json_to_sheet(subscribers);
        var ws_name = "DataSheet 1";
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        var wbbuf = XLSX.write(wb, {
          type: 'base64'
        });
        res.writeHead(200, [['Content-Type',  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']]);
        res.end( new Buffer(wbbuf, 'base64') );
      });
      res.view('page/exports/index', {model: imports});
    });
  },

  destroy: function (req, res) {

  },
}
