var request = require('supertest');
var assert = require('assert');
var should = require('should');

describe('SubscriberController', function(done) {
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
  it("Index : should be redirect to the subscribers page", function(done) {
    agent
      .get("/subscribers")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
      if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
      done();
    });
  });

  it("Add : should be redirect to the new subscriber page", function(done) {
    agent
      .get("/subscribers/new")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
        done();
      });
  });

  it("Create : should create a new subscriber", function(done) {
    agent
      .post("/subscribers/create")
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Show : should redirect to the detail page of an existing subscriber", function(done) {
    agent
      .post("/subscribers/create")
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Edit : should redirect to the edit page of an existing subscriber", function(done) {
    agent
      .get("/subscribers/edit?id=5b16ba0fa7fad68c1dcf0cc0")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Update : should update an existing subscriber", function(done) {
    agent
      .post("/subscribers/update?id=5b16ba0fa7fad68c1dcf0cc0")
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Destroy : should destroy an existing subscriber", function(done) {
    agent
      .post("/subscribers/destroy?id=5b16a4d240f12bac40d2c819")
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
