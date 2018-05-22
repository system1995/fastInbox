/**
 * ReportController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    console.log(module.exports.getGAStats());
    return res.view('page/reports/index',{GAStats:module.exports.getGAStats()});
  },
  getGAStats:function () {
    var url = "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A175383866&start-date=30daysAgo&end-date=2018-05-18&metrics=ga%3Asessions%2Cga%3AsessionDuration&dimensions=ga%3Acountry&access_token=ya29.Gly-Bf_hYT6xuGeNzVwcYp5gcYp8cJMjYFJSyODLKl-brKiDzrdAMCPup-or5viRBga5HHpWW2_ginWUsZ56S_-6zE-r3T01NlwnXO5zOG6pxydiKQeFfivEU5Fetw";
    var request = require('sync-request');
    var result = request('GET', url);
    return JSON.parse(result.body.toString('utf-8')).rows;
  }
};

