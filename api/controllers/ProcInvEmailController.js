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
          subscribers.forEach(function(subscriber)
          {
            invalidSubscribers.push(subscriber);
            if(typeof subscriber.email == 'undefined' || !subscriber.email) subscriber.reason="Empty email";
            else if(require('isemail').validate(subscriber.email)==false) subscriber.reason="Syntaxe Error : RFCs 5321, 5322";
            else if(module.exports.checkDomainExist((subscriber.email).split("@")[1])) subscriber.reason="Non existence domain";
            else if(module.exports.checkEmailExist(subscriber.email)) subscriber.reason="Non existence email";
            else invalidSubscribers.pop();
          });
          res.view('page/procInvEmail/new-step2', {subscribers: invalidSubscribers});
        });
      }
    }
  },

  checkDomainExist:function (domain) {
    require ('dns').resolve4( domain, function (err, domain) {
      //console.log(err);
      if (err) return false;
      return true;
    })
  },

  checkEmailExist:function (email) {
    var verifier = require('email-exist');
    verifier.verify(email, function (err, info) {
      if (err) {
        //console.log(err);
        return true;
      } else {
        return info.success;
        //console.log( "Success: " + info.success );
        //console.log( "Info: " + info.info );
        //console.log( "Response from smtp: " + info.response );
      }
    });
  },

  destroy:function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Subscriber.destroy(params['id[]']).exec(function (err){
      if (err) {return res.negotiate(err);}
      return res.redirect("/process_invalid_emails/");
    });
  }

}
