/**
 * ListController
 *
 * @description :: Server-side logic for managing list
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    List.find().populate('subscribers').exec(function(err, lists){
      if (err) return res.serverError(err);
      res.view('page/lists/index',{lists: lists});
    });
  },

  new: function (req, res) {
    Parameter.find({model:'audience'},function (err,audiences) {
      if (err) { return res.serverError(err); }
      res.view('page/lists/new',{audiences:audiences});
    })
  },

  create: function(req,res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    List.create(params, function listCreated (err, createdlist) {
      if (err)  return res.serverError(err);
      res.redirect('/lists');
    });
  },

  show: function (req,res) {
    var id = req.param('id');
    if (!id) return res.send("No id specified.", 500);
    User.find(id, function userFound(err, user) {
      if(err) return res.serverError(err);
      if(!user) return res.send("User "+id+" not found", 404);
      res.view({user:user});
    });
  },

  edit: function (req,res) {
    var id = req.param('id');
    if (!id) return res.send("No id specified.",500);
    List.findOne({id:id}).exec(function (err, list){
      if (err) return res.serverError(err);
      Parameter.find({model:'audience'},function (err,audiences) {
        if (err) { return res.serverError(err); }
        res.view('page/lists/edit',{list:list,audiences:audiences});
      })
    });
  },

  update: function(req,res) {
    var id = req.param('id');
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    List.update(id,params, function userUpdated (err, updatedlist) {
      if (err)  return res.serverError(err);
      res.redirect('/lists');
    });
  },

  destroy: function (req,res) {
    var id = req.param('id');
    List.destroy({id:id}).exec(function (err){
      if (err) return res.serverError(err);
      return res.redirect("/lists");
    });
  }
};

