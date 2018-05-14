/**
 * CampaignController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Campaign.find().exec(function(err, campaigns){
      if (err) return res.serverError(err);
      var campaignsEmail=[],campaignsSMS=[];
      res.view('page/campaigns/index',{campaignsEmail: campaignsEmail,campaignsSMS:campaignsSMS});
    });
  },

  new: function (req, res) {
    if(req.param('step')=='1') {
      res.view('page/campaigns/new-step1');
    }
    else
    if(req.param('step')=='2') {
      if(req.param('type')=='email')
      {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        Campaign.create(params, function campaignCreated (err, createdCampaign) {
          if (err)  return res.serverError(err);
          EmailTemplate.find().exec(function (err, emailsTemplate) {
            if (err) {
              return res.serverError(err);
            }
            res.view('page/campaigns/new-step2', {emailsTemplate: emailsTemplate,campaign:createdCampaign});
          });

        });

      }
      else {
        res.view('page/campaigns/new-step3');
      }
    }else if(req.param('step')=='3') {
      if(req.param('type')=='email')
      {
        Campaign.update({id:req.param('idCampaign')},{emailTemplate:req.param('emailTemplate')}).exec(function (err, campaign) {
          if (err) {
            return res.serverError(err);
          }
          EmailTemplate.findOne({id:req.param('emailTemplate')}).exec(function (err, emailTemplate) {
            if (err) {
              return res.serverError(err);
            }
            res.view('page/campaigns/new-step3', {emailTemplate: emailTemplate,campaign:req.param('idCampaign')});
          });
        });
      }
      else {
        List.find(function (err, lists) {
          if (err) {
            return res.serverError(err);
          }
          return res.view('page/campaigns/new-step4', {lists: lists});
        });
      }
    }else if(req.param('step')=='4') {
      if (req.param('type') == 'email') {
        List.find(function (err, lists) {
          if (err) {
            return res.serverError(err);
          }
          res.view('page/campaigns/new-step4', {lists: lists,campaign:req.param('idCampaign')});
        })
      }
      else {
       return  res.view('page/campaigns/new-step5');
      }
    }
    else if(req.param('step')=='5') {
      if (req.param('type') == 'email') {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        Campaign.update(req.param('idCampaign'),{lists:params['lists[]']}).exec(function (err, campaign) {
          if (err) {
            return res.serverError(err);
          }
          List.find(params['lists[]'],function (err, lists) {
            if (err) {
              return res.serverError(err);
            }
            console.log(lists);
            return res.view('page/campaigns/new-step5',{campaign:campaign[0],lists:lists});
          });
        });
      }
      else {
        return  res.view('page/campaigns/new-step5');
      }
    }
  },

  create:function(req,res)
  {
    Campaign.findOne({id:req.param('idCampaign')}).populate('lists').exec(function (err, campaign) {
      if (err) {
        return res.serverError(err);
      }
      var listsID = campaign.lists.map(l => l.id);
      Subscriber.find().populate('lists').exec(function(err, subscribers){
        if (err) return res.serverError(err);
        subscribers = subscribers.filter(function(subscriber) { return listsID.some(r=> (subscriber.lists.map(l => l.id)).indexOf(r) >= 0)  } );
        subscribers.forEach(function(subscriber) {
          module.exports.sendEmail(subscriber.email, sails.config.appPath+"\\assets\\files\\campaigns\\"+campaign.id+"\\campaign.html");
        });
      });



      return res.json({});
    });

  },

  saveEmailingCampaign:function(req,res){
    var fs = require('fs');
    var dir = sails.config.appPath+"\\assets\\files\\campaigns\\"+req.param('idCampaign');
    fs = require('fs');
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    fs.writeFile(dir+"\\campaign.html","<html><style>"+req.param('css')+"</style>"+req.param('html')+"</html>", function(err) {
      if(err) {
        return console.log(err);
      }
    });
    var projectController = require('./EmailTemplateController');
     projectController.screenShotHTML(dir+"\\campaign.html",dir);
    return res.json({});
  },

  sendEmail:function (email,path) {
    console.log("----> Send email To :"+email);
    var cmd="java -jar "+sails.config.appPath+"\\assets\\powermta\\powermta.jar"+ " "+email+" "+path;
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
  },

  spamCheck:function (req,res) {
    var fs                = require('fs');
    var postmarkSpamcheck = require('postmark-spamcheck');
    fs.readFile("C:\\Users\\HANNS\\Desktop\\Matious\\fastinbox\\assets\\files\\campaigns\\5af5aafdf47796a02b1bbbdb\\campaign.html", 'utf-8', function (err, content) {
      if (err) {
        throw err;
      }
      postmarkSpamcheck.check({
        options: 'long',
        email: content
      }, function(info) {
        res.json(info);
      });
    });
  },

  campaignPreview:function (req,res) {
    var content="<html><style>"+req.param('css')+"</style>"+req.param('html')+"</html>";
    var fs=require('fs');
    fs.open(sails.config.appPath + '/.tmp/public/files/campaigns/test.html', 'w+', function(err, data) {
      if (err) {
        console.log("ERROR !! " + err);
      } else {
        fs.write(data,content, 0,content.length, null, function(err) {
          if (err)
            console.log("ERROR !! " + err);
          fs.close(data, function() {
            console.log('written success');
          })
        });
      }
    });
    return res.json({});

  }

};

