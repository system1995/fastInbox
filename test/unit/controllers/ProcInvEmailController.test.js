var request = require('supertest');
var assert = require('assert');
var should = require('should');

describe('ProcInvEmailController', function(done) {
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
  it("New : should be redirect to the new process invalid email page -step1-", function(done) {
    agent
      .get("/process_invalid_emails")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
      if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
      done();
    });
  });

  it("Process -Step1- : should identify invalid emails and return step2 view", function(done) {
    agent
      .post("/process_invalid_emails?current_step=1")
      .send({ lists: ['5b168a3e95a6f1101cf3429d','5af62398f4a0b9d003162f4e','5af18db9e40ed750311bd48b','5ad7b47b8faef4402dbe8a28','5abc1a04b7c70eb811fd9d12','5abc19d5b7c70eb811fd9d10'] })
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Process -Step2- : should identify selected subscribers and return step3 view", function(done) {
    agent
      .post("/process_invalid_emails?current_step=2")
      .send({ id: '5af300cb4de28e143db638a9'})
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Process -Step3- : should delete selected subscribers and redirect to subscribers page", function(done) {
    agent
      .post("/subscribers")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });
});
