/**
 * SupportController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    Ticket.find().populate('campaign').exec(function(err, tickets){
      if (err) return res.serverError(err);
      return res.view('page/support/index',{tickets:tickets});
    });
  },
  new: function (req, res) {
    Campaign.find().exec(function (err,campaigns) {
      if (err) { return res.serverError(err); }
      res.view('page/support/new',{campaigns:campaigns});
    })
  },
  create: function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    params['message']=new Array({message:params['message'],date:new Date(),user:res.locals.user});
    params['user']=res.locals.user.id;
    params['status']='open';
    Ticket.create(params, function ticketCreated (err, createdticket) {
      if (err)  return res.serverError(err);
      res.redirect('/support');
    });
  },

  ticket:function (req,res) {
    Ticket.findOne({id:req.param('id')}).exec(function (err,ticket) {
      if (err) { return res.serverError(err); }
      ticket.message.forEach(function(msg) {
        res.view('page/support/ticket',{ticket:ticket});
      });
    })
  },
  ticketNew:function (req,res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    Ticket.findOne({id:req.param('id')}).exec(function (err,ticket) {
      if (err) { return res.serverError(err); }
      ticket.message.push({message:params['message'],date:new Date(),user:res.locals.user});
      ticket.save();
      res.view('page/support/ticket',{ticket:ticket});
    })
  }

};


