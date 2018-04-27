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
        EmailTemplate.find().exec(function (err, emailsTemplate) {
          if (err) {
            return res.serverError(err);
          }
          res.view('page/campaigns/new-step2', {emailsTemplate: emailsTemplate});
        });
      }
      else {
        res.view('page/campaigns/new-step3');
      }
    }else if(req.param('step')=='3') {
      if(req.param('type')=='email')
      {
        EmailTemplate.findOne({id:req.param('emailTemplate')}).exec(function (err, emailTemplate) {
          if (err) {
            return res.serverError(err);
          }
          res.view('page/campaigns/new-step3', {emailTemplate: emailTemplate});
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
          res.view('page/campaigns/new-step4', {lists: lists});
        })
      }
      else {
       return  res.view('page/campaigns/new-step5');
      }
    }
    else if(req.param('step')=='5') {
      if (req.param('type') == 'email') {
        res.view('page/campaigns/new-step5');
      }
      else {
        return  res.view('page/campaigns/new-step5');
      }
    }
  },

};

