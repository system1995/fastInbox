/**
 * SegmentController
 *
 * @description :: Server-side logic for managing list
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Segment.find().populate('subscribers').exec(function (err, segments) {
      if (err) return res.serverError(err);
      res.view('page/segments/index', {segments: segments});
    });
  },

  new: function (req, res) {
    List.find().exec(function (err, lists) {
      if (err) {
        return res.serverError(err);
      }
      res.view('page/segments/new-step1', {lists: lists});
    });
  },

  create: function(req,res) {
    if(req.param('idSegment')) {
      module.exports.createStep2(req,res);
    }
    else {
      module.exports.createStep1(req,res);
    }
  },

  createStep1:function(req,res)
  {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    var lists=params['lists[]'];
    delete params['lists[]'];
    Segment.create(Object.assign(params,{lists:lists}), function segmentCreated (err, createdSegment) {
      if (err) {
        return res.serverError(err);
      }
      return res.view('page/segments/new-step2',{segment:createdSegment});
    });
  },

  createStep2:function(req,res)
  {
    var id = req.param('idSegment');
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Segment.findOne({id:id}).populate('lists').exec(function (err, segment) {
      if (err) return res.serverError(err);
      for(var k in params) segment[k]=params[k];
      segment.save(function(err){ console.log(err)});
      var lists = _.pluck(segment.lists, 'id');
      Subscriber.find().exec(function (err, subscribers) {
        if (err) return res.serverError(err);
        return res.view('page/segments/new-step3',{subscribers:subscribers});
      });

    });
  },
}
