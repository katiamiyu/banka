'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Test for user account endpoints', function () {
  describe('Create new user account', function () {
    it('password must be atleast 8 characters long', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'kazeem',
        lastname: 'Tiamiyu',
        email: 'amebo@gmail.com',
        password: '333tt',
        isadmin: 'true'
      }).expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.equal('password supplied is not invalid');
        done();
      });
    });
    it('email should be valid', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'kazeem',
        lastname: 'Tiamiyu',
        email: 'amebogmail.com',
        password: '333ttccfghjjkgv',
        isadmin: 'true'
      }).expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.equal('please enter a valid email');
        done();
      });
    });
    it('if confirm password is not equal password', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'kazeem',
        lastname: 'Tiamiyu',
        email: 'amebo@gmail.com',
        password: '333ttccfghjjkgv',
        confirm: '333ttccfghjjk',
        isadmin: 'true'
      }).expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.equal('Please confirm your password');
        done();
      });
    });
    it('user created succcessfully', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'kazeem',
        lastname: 'Tiamiyu',
        email: 'amebo@gmail.com',
        password: '333ttccfghjjkgv',
        confirm: '333ttccfghjjkgv',
        isadmin: 'true'
      }).expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(201);
        // expect(res.body.data).to.be.
        done();
      });
    });
    it('email should be unique and not used', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signup').send({
        firstname: 'kazeem',
        lastname: 'Tiamiyu',
        email: 'amebo@gmail.com',
        password: '333ttccfghjjkgv',
        confirm: '333ttccfghjjkgv',
        isadmin: 'true'
      }).expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.equal('email is used already');
        done();
      });
    });
  }); // end of signup user test
  describe('Login to user account', function () {
    it('email should be valid', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signin').send({
        email: 'amebogmail.com',
        password: '333ttccfghjjkgv'
      }).expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.equal('please enter a valid email');
        done();
      });
    });
    it('password must be atleast 8 characters long', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signin').send({
        email: 'amebo@gmail.com',
        password: '333tt'
      }).expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.equal('password supplied is not invalid');
        done();
      });
    });
    it('password should be same with database', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signin').send({
        email: 'amebo@gmail.com',
        password: '333ttccfghjjkgg'
      }).expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(400);
        (0, _chai.expect)(res.body.error).to.equal('incorrect password');
        done();
      });
    });
    it('user should be logged in if details are correct', function (done) {
      (0, _supertest2.default)(_index2.default).post('/api/v1/auth/signin').send({
        email: 'amebo@gmail.com',
        password: '333ttccfghjjkgv'
      }).expect(200).end(function (err, res) {
        (0, _chai.expect)(res.body.status).to.equal(200);
        done();
      });
    });
  });
});