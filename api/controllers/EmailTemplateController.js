/**
 * emailTemplateController
 *
 * @description :: Server-side logic for managing Import
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    require('sleep').sleep(3);
    EmailTemplate.find().exec(function (err, emailsTemplate) {
      if (err) {
        return res.serverError(err);
      }
      res.view('page/emailsTemplate/index', {emailsTemplate: emailsTemplate});
    });
  },

  new: function (req, res) {
    res.view('page/emailsTemplate/new');
  },

  create: function(req,res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    EmailTemplate.create(params, function importCreated (err, emailsTemplate) {
      if (err) {
        return res.serverError(err);
      }
      req.file('ImportFile').upload({
        dirname:'../../assets/files/emailsTemplate/'+emailsTemplate.id},function(err,files){
        if (err) return res.serverError(err);
        emailsTemplate.path=files[0].fd;
        emailsTemplate.save(function(err){ console.log(err)});
        module.exports.screenTemplateEmail(emailsTemplate.path,emailsTemplate.id);
        res.redirect("/emailsTemplate/");
      });
    });
  },

  screenTemplateEmail:function(path,id){
    module.exports.screenShotHTML(path,sails.config.appPath+'/assets/files/emailsTemplate/'+id);
    if (!require("fs").existsSync(sails.config.appPath + '/.tmp/public/files/emailsTemplate/')) {
      require("fs").mkdir(sails.config.appPath + '/.tmp/public/files/emailsTemplate/');
    }
    if (!require("fs").existsSync(sails.config.appPath + '/.tmp/public/files/emailsTemplate/'+id)) {
      require("fs").mkdir(sails.config.appPath + '/.tmp/public/files/emailsTemplate/' + id);
    }
    module.exports.screenShotHTML(path,sails.config.appPath+'/.tmp/public/files/emailsTemplate/'+id);
  },

  screenShotHTML:function(pathInput,pathOutput){
    var htmlConvert = require('html-convert');
    var fs = require('fs');
    if (fs.existsSync(pathOutput+'/screenShot.jpg')) {
        fs.unlink(pathOutput+'/screenShot.jpg');
    }
    var convert = htmlConvert();
// or as a transform stream
    var stream=fs.createReadStream(pathInput);
      stream.pipe(convert())
      .pipe(fs.createWriteStream(pathOutput+'/screenShot.jpg'))
      .on('finish', () =>{
        //console.log("finish");
      });
  },

  edit: function (req,res) {
    var id = req.param('id');
    if (!id) return res.send("No id specified.",500);
    EmailTemplate.findOne({id:id}).exec(function (err, emailTemplate){
      if (err) {
        return res.serverError(err);
      }
      res.view('page/emailsTemplate/edit',{emailTemplate:emailTemplate});
    });
  },

  update: function (req,res) {
    if (!req.param('id')) return res.send("No id specified.",500);
    EmailTemplate.findOne({id:req.param('id')}).exec(function (err, emailTemplate){
      if (err) {
        return res.serverError(err);
      }
      emailTemplate.name=req.param('name');
      emailTemplate.category=req.param('category');
      emailTemplate.description=req.param('description');
      emailTemplate.save();
      fs = require('fs');
      fs.writeFile(emailTemplate.path,req.param('html'), function(err) {
        if(err) {
          return console.log(err);
        }
        module.exports.screenTemplateEmail(emailTemplate.path,emailTemplate.id);
        res.json({});
      });
    });
  },


  destroy: function (req,res) {
    var id = req.param('id');
    EmailTemplate.destroy({id:id}).exec(function (err){
      if (err) {return res.negotiate(err);}
      require('rmdir')(sails.config.appPath+'/assets/files/emailsTemplate/'+id, function (err, dirs, files) {
        if(err) return console.log(err);
      });
      return res.redirect("/emailsTemplate/");
    });
  },

}
