var request = require('supertest');
var assert = require('assert');
var should = require('should');

describe('ImportController', function(done) {
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
  it("Index : should be redirect to the imports page", function(done) {
    agent
      .get("/imports")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
        done();
      });
  });

  it("Add : should be redirect to the new import page -step1-", function(done) {
    agent
      .get("/imports/new")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
        done();
      });
  });

  it("Create -Step1- : should create a new import, identify the first two line and return step2 page", function(done) {
    agent
      .post("/imports/create?step=1")
      .attach('ImportFile','C:\\Users\\HANNS\\Downloads\\advisto.com.csv')
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Create -Step2- : should make the mapping and return step3 page", function(done) {
    agent
      .post("/imports/create?step=2")
      .send({idImport:"5af2ffe5a79398bc448209fd"})
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Create -Step3- : should validate the creation of the import and redirect to the imports list", function(done) {
    agent
      .post("/imports")
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
