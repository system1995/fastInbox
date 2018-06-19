/*
var request = require('supertest');
var assert = require('assert');
var should = require('should');

describe('EmailTemplateController', function(done) {
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
  it("Index : should be redirect to the emails template page", function(done) {
    agent
      .get("/emailsTemplate")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
        done();
      });
  });

  it("Add : should be redirect to the new email template page", function(done) {
    agent
      .get("/emailsTemplate/new")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        assert(res.text!="undefined");
        assert(res.text.match(/html/));
        done();
      });
  });

  it("Create : should create a new email template", function(done) {
    agent
      .post("/emailsTemplate/create")
      .attach("ImportFile","C:\\Users\\HANNS\\Desktop\\test.html")
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });


  it("Edit : should redirect to the edit page of an existing email template", function(done) {
    agent
      .get("/emailsTemplate/edit?id=5ae0a6ae975eec4c31dbe05d")
      .expect(200)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Update : should update an existing email template", function(done) {
    agent
      .post("/emailsTemplate/create")
      .attach("ImportFile","C:\\Users\\HANNS\\Desktop\\test.html")
      .expect(302)
      //.expect('location','/my/page')
      .end(function (err, res) {
        if (err) throw err;
        //assert(res.text!="undefined");
        //assert(res.text.match(/html/));
        done();
      });
  });

  it("Destroy : should destroy an existing email template", function(done) {
    agent
      .post("/subscribers/destroy?id=5b16aff57d283c983b515ab2")
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
*/
