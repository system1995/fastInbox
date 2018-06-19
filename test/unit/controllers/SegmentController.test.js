var request = require('supertest');
var assert = require('assert');
var should = require('should');

describe('SegmentController', function(done) {
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

  it("Index : should be redirect to the segments page", function(done) {
    agent
      .get("/segments")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
      if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
      done();
    });
  });

  it("Add : should be redirect to the new segment page -step1-", function(done) {
    agent
      .get("/segments/new")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
        done();
      });
  });

  it("Create -Step1- : should create a new segment and return step2 view", function(done) {
    agent
      .post("/segments/create")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Create -Step2- : should generate subscribers of the segment and return step3 view", function(done) {
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

  it("Create -Step3- : should validate the creation of the segment and redirect to the segments list", function(done) {
    agent
      .post("/segments/create")
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
