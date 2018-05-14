/**
 * ProcInvEmailController
 *
 * @description :: Server-side logic for managing Import
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function (req, res) {
    if (req.method == "GET") {
      List.find().exec(function (err, lists) {
        if (err) {
          return res.serverError(err);
        }
        res.view('page/procInvEmail/new-step1', {lists: lists});
      });
    }
    else {
      var params = _.extend(req.query || {}, req.params || {}, req.body || {});
      if(params['current_step']=='2') {
        delete params ['current_step'];
        Subscriber.find(Object.keys(params)).exec(function (err, subscribers) {
          if (err) {
            return res.serverError(err);
          }
          res.view('page/procInvEmail/new-step3', {subscribers: subscribers});
        });
      }
      else {
        Subscriber.find({lists: params['lists']}).exec(function (err, subscribers) {
          if (err) {
            return res.serverError(err);
          }
          var invalidSubscribers = [];
          subscribers.forEach(function(subscriber) {
            if(typeof subscriber.email == 'undefined' || !subscriber.email) subscriber.reason="Empty email";
            else if(require('isemail').validate(subscriber.email)==false) subscriber.reason="Syntaxe Error : RFCs 5321, 5322";
            else if(module.exports.checkDomainExist((subscriber.email).split("@")[1])==false) subscriber.reason = "No existence domain";
            else if(module.exports.checkEmailExist(subscriber.email)==false) subscriber.reason = "No existence email";
            if (typeof subscriber.reason != "undefined") invalidSubscribers.push(subscriber);
          });
          console.log("---------------->j'ai checker all emails");
          res.view('page/procInvEmail/new-step2', {subscribers: invalidSubscribers});
        });
      }
    }
  },

  checkDomainExist:function (hostname) {
    var dnsSync = require('dns-sync');
    if(dnsSync.resolve(hostname)==null)
    {
      console.log(hostname+"--->Domain Not Exist");
      return false;
    }
    console.log(hostname+"--->Domain Exist");
    return true;
  },

  checkEmailExist:function (email) {
    var url = "https://api.zerobounce.net/v1/validate?apikey=8c0979e6737c4f8783b040dbcb9afec9&email="+email
    var request = require('sync-request');
    var res = request('GET', url);
    if(JSON.parse(res.body.toString('utf-8')).status!='Valid') return false;
    return true;
  },

  destroy:function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Subscriber.destroy(params['id[]']).exec(function (err){
      if (err) {return res.negotiate(err);}
      return res.redirect("/process_invalid_emails/");
    });
  }
}
