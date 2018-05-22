/**
 * SettingController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  cronIndex: function (req, res) {
    Cron.find().limit(1).exec(function(err, cron){
      if (err) return res.serverError(err);
      res.view('page/settings/cron/index');
    });
  },
  serversIndex:function (req,res) {
    Server.find().exec(function(err, servers){
      if (err) return res.serverError(err);
      var serversEmail=[],serversSMS=[];
      serversEmail = servers.filter(function (el) {
        return el.category == 'SMTP' ;
      });
      serversSMS = servers.filter(function (el) {
        return el.category == 'SMS' ;
      });
      res.view('page/settings/servers/index',{serversEmail: serversEmail,serversSMS:serversSMS});
    });
  },

  serversNew:function (req,res) {
    if(req.param('category')=='SMTP') {
      if(req.param('type')=='MailJet') {
        res.view('page/settings/servers/SMTP/newMailJet');
      }
      else if(req.param('type')=='SendinBlue'){
        res.view('page/settings/servers/SMTP/newSendinBlue');
      }
      else if(req.param('type')=='Amazon'){
        res.view('page/settings/servers/SMTP/newAmazon');
      }
      else if(req.param('type')=='SMTP'){
        res.view('page/settings/servers/SMTP/newSMTP');
      }
    }
    else {
      res.json({});
    }
  },

  serversCreate:function (req,res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Server.create(params, function ServerCreated (err, createdserver) {
      if (err)  return res.serverError(err);
      module.exports.addServersPMTA(createdserver);
      return res.redirect('/settings_servers');
    });
  },

  addServersPMTA:function (server) {
    const fs = require('fs');
    var str='<domain '+server.name+'>\n'+
    '#use-unencrypted-plain-auth yes \n'+
    'auth-username '+server.userName+'\n'+
    'auth-password '+server.password+'\n'+
    'route '+server.hostName+':'+server.port+'\n'+
    'use-starttls yes\n'+
    'require-starttls yes\n'+
    '</domain>';
    fs.appendFile('C:\\pmta\\config.dat', str, function (err) {
      if (err) throw err;
    });

    //restart pmta
    var cmd="pmta reload";
    console.log(cmd);
    const { exec } = require('child_process');
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }
};

