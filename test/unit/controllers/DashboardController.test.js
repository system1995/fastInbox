var request = require('supertest');
var assert = require('assert');
var should = require('should');

describe('DashboardController', function(done) {
  var agent;
  it("should authenticate to the dashboard", function(done) {
    agent = request.agent(sails.hooks.http.app);
    agent
      .post('/auth/local/')
      .send({ identifier: 'errouissimusta@gmail.com', password: 'HANNS.G95' })
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body = {id:res.body};
      },done)
      .expect(200, {
        id: 'success'
      }, done);
  });
  it("index : should be redirect to the dashboard page", function(done) {
    agent
      .get("/")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
      if (err) throw err;

        assert(res.text!="undefined");
        assert(res.text.match(/html/));
      done();
    });

  });
});
