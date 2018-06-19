var request = require('supertest');
var assert = require('assert');
var should = require('should');

describe('UserController', function(done) {
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

  it("Index : should be redirect to the lists page", function(done) {
    agent
      .get("/lists")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
      if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
      done();
    });
  });

  it("Add : should be redirect to the new user page", function(done) {
    agent
      .get("/lists/new")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
        done();
      });
  });

  it("Create : should create a new user", function(done) {
    agent
      .post("/lists/create")
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });


  it("Edit : should redirect to the edit page of an existing user", function(done) {
    agent
      .get("/subscribers/edit?id=5b16ba0fa7fad68c1dcf0cba")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Update : should update an existing user", function(done) {
    agent
      .post("/subscribers/update?id=5b16ba0fa7fad68c1dcf0cba")
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Update : should change the statut of an marketer", function(done) {
    agent
      .post("/subscribers/update?id=5b16ba0fa7fad68c1dcf0cba")
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

});
