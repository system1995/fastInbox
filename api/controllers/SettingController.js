/**
 * SettingController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  cronIndex: function (req, res) {
    Cron.find().limit(1).exec(function(err, cron){
      if (err) return res.serverError(err);
      res.view('page/settings/cron/index');
    });
  },
};

