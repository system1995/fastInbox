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
      else
      {

      }
    }

  },


};

