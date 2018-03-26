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

  new: function (req, res) {
    if(req.method=='GET') {
      List.find(function (err, lists) {
        if (err) {
          return res.serverError(err);
        }
        res.view('page/imports/new-step1', {lists: lists});
      });
    }
    else{
      var params = _.extend(req.query || {}, req.params || {}, req.body || {});
      req.file('ImportFile').upload({
        dirname:'../../assets/files/'},function(err,files){
        if (err) return res.serverError(err);
        req.session.import={file:files[0],lists:params['lists[]']};
        var first2Line=module.exports.XLSX2ToJson(files[0].fd)[0];
        res.view('page/imports/new-step2',{first2Line:first2Line});
      });
    }
  },

  XLSX2ToJson:function (path) {
    const XLSX = require('xlsx');
    const workbook = XLSX.readFile(path);
    const sheet_name_list = workbook.SheetNames;
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  },


  create: function(req,res) {
    var file=req.session.import.file,
       lists=req.session.import.lists;
      var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Import.create({path:file.fd,name:file.filename,lists:lists}, function importCreated (err, createdImport) {
      if (err) {return res.serverError(err);}
      var subscribers=module.exports.XLSX2ToJson(file.fd);
      subscribers.forEach(function(subscriber)
      {
        var keys=Object.keys(subscriber);
        for (var key in params) {
          subscriber[params[key]] =subscriber[keys[Object.keys(params).indexOf(key)]];
          delete subscriber[keys[Object.keys(params).indexOf(key)]];
          console.log(subscriber);
        }
        subscriber.lists=lists;
        Subscriber.create(subscriber).exec(function (err,subscriberCreated) {
          if (err) {return res.serverError(err);}
        })
      });
      res.redirect("/imports/");
    });
  },

  destroy: function (req,res) {
    return res.json({});
    var id = req.param('id');
    Import.destroy({id:id}).exec(function (err){
      if (err) {return res.negotiate(err);}
      return res.redirect("/imports/");
    });
  }

}
