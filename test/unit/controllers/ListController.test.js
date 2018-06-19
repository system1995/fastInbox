var request = require('supertest');
var assert = require('assert');
var should = require('should');

describe('ListController', function(done) {
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

  it("Add : should be redirect to the new list page", function(done) {
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

  it("Create : should create a new list", function(done) {
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

  it("Edit : should redirect to the edit page of an existing list", function(done) {
    agent
      .get("/lists/edit?id=5b171faae23b5cfc5168f6ef")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Update : should update an existing list", function(done) {
    agent
      .post("/lists/update?id=5af300cb4de28e143db638a5")
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Destroy : should destroy an existing list", function(done) {
    agent
      .post("/lists/destroy?id=5af301b04de28e143db63919")
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
