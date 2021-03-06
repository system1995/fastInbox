/**
 * SubscriberController
 *
 * @description :: Server-side logic for managing subscriber
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Subscriber.find().populate('lists').exec(function (err, subscribers) {
      if (err) {
        return res.serverError(err);
      }
      Parameter.find({model:'audience'},function (err,audiences) {
        if (err) { return res.serverError(err); }
        res.view('page/subscribers/index',{subscribers: subscribers,audiences:audiences});
      });
    });
  },

  new: function (req, res) {
    List.find(function(err, lists){
      if (err) { return res.serverError(err); }
      Parameter.find({model:'audience'},function (err,audiences) {
        if (err) { return res.serverError(err); }
        res.view('page/subscribers/new',{lists: lists,audiences:audiences});
      })
    });
  },

  create: function(req,res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    delete params['fields'];
    params['status']='active';
    Subscriber.create(params, function listCreated (err, createdSubscriber) {
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
    Subscriber.findOne({id:id}).populate('lists').exec(function (err, subscriber){
      if (err) {
        return res.serverError(err);
      }
      List.find(function (err, lists) {
        if (err) {
          return res.serverError(err);
        }
        Parameter.find({model:'audience'},function (err,audiences) {
          if (err) { return res.serverError(err); }
          res.view('page/subscribers/edit',{subscriber:subscriber,lists: lists,audiences:audiences});
        })
      });
    });
  },

  update: function(req,res) {
    var id = req.param('id');
    if (!id) return res.send("No id specified.",500);
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Subscriber.find({id:id}).exec(function (err,foundSubscriber){
      Subscriber.destroy({id:id}).exec(function (err){
        if (err) {return res.negotiate(err);}
        Subscriber.create(Object.assign(params,{id:id,createdAt:foundSubscriber[0].createdAt,status:foundSubscriber[0].status})).exec(function (err){
          if (err) {return res.negotiate(err);}
          return res.redirect("/subscribers");
        });
      });
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

