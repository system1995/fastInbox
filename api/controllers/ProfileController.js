/**
 * ProfileController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    res.view('page/profile');
  },

  edit: function (req, res) {
    var id = req.user.id;
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    User.update(id,params, function userUpdated (err, updateduser) {
      if (err)  return res.serverError(err);
      res.redirect('/profile');
    });
  },

  editImage: function (req, res) {
    var id = req.user.id;
    req.file('file').upload({
      dirname:'../../assets/files/users/'+id},function(err,files){
      if (err) return res.serverError(err);
      User.update(id,{image:files[0].fd.split("\\").pop(-1)}, function userUpdated (err, updateduser) {
        if (err)  return res.serverError(err);
        return;
      });
    });
  },

};

