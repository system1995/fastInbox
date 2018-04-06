/**
 * ImportController
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
        Subscriber.find({id: params['id[]']}).exec(function (err, subscribers) {
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
          res.view('page/procInvEmail/new-step2', {subscribers: subscribers});
        });
      }
    }
  },


}
