/**
 * SubscriberController
 *
 * @description :: Server-side logic for managing subscriber
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Subscriber.find(function(err, subscribers){
      if (err) { return res.serverError(err); }
      res.view('page/subscribers/index',{model: subscribers});
    });
  },

  new: function (req, res) {
    res.view('page/subscribers/new');
  },

  create: function(req,res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Subscriber.create(params, function userCreated (err, createdSubscriber) {
      if (err)  return res.serverError(err);
      res.redirect('/subscribers');
    });
  },

  show: function (req,res) {

    var id = req.param('id')

    if (!id) return res.send("No id specified.", 500);


    User.find(id, function userFound(err, user) {
      if(err) return res.sender(err,500);
      if(!user) return res.send("User "+id+" not found", 404);

      res.view({
        user:user
      })
    });
  },

  edit: function (req,res) {
    var id = req.param('id');
    if (!id) return res.send("No id specified.",500);
    Subscriber.findOne({id:id}).exec(function (err, subscriber){
      if (err) {
        return res.serverError(err);
      }
      return res.view('page/subscribers/edit',{model:subscriber});
    });
  },

  update: function(req,res) {
    var id = req.param('id');
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Subscriber.update(id,params, function userUpdated (err, updatedSubscriber) {
      if (err)  return res.serverError(err);
      res.redirect('/subscribers');
    });
  },



  destroy: function (req,res) {
    var id = req.param('id');
    Subscriber.destroy({id:id}).exec(function (err){
      if (err) {return res.negotiate(err);}
      return res.redirect("/subscribers");
    });
  }




};
