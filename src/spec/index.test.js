import request from 'supertest';
import { expect } from 'chai';
import app from '../index';

describe('Test for user account endpoints', () => {
  describe('Create new user account', () => {
    it('password must be atleast 8 characters long', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'kazeem',
          lastname: 'Tiamiyu',
          email: 'amebo@gmail.com',
          password: '333tt',
          isadmin: 'true',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('password supplied is not invalid');
          done();
        });
    });
    it('email should be valid', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'kazeem',
          lastname: 'Tiamiyu',
          email: 'amebogmail.com',
          password: '333ttccfghjjkgv',
          isadmin: 'true',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('please enter a valid email');
          done();
        });
    });
    it('if confirm password is not equal password', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'kazeem',
          lastname: 'Tiamiyu',
          email: 'amebo@gmail.com',
          password: '333ttccfghjjkgv',
          confirm: '333ttccfghjjk',
          isadmin: 'true',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('Please confirm your password');
          done();
        });
    });
    it('user created succcessfully', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'kazeem',
          lastname: 'Tiamiyu',
          email: 'amebo@gmail.com',
          password: '333ttccfghjjkgv',
          confirm: '333ttccfghjjkgv',
          isadmin: 'true',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(201);
          // expect(res.body.data).to.be.
          done();
        });
    });
    it('email should be unique and not used', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'kazeem',
          lastname: 'Tiamiyu',
          email: 'amebo@gmail.com',
          password: '333ttccfghjjkgv',
          confirm: '333ttccfghjjkgv',
          isadmin: 'true',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('email is used already');
          done();
        });
    });
  });// end of signup user test
  describe('Login to user account', () => {
    it('email should be valid', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'amebogmail.com',
          password: '333ttccfghjjkgv',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('please enter a valid email');
          done();
        });
    });
    it('password must be atleast 8 characters long', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'amebo@gmail.com',
          password: '333tt',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('password supplied is not invalid');
          done();
        });
    });
    it('password should be same with database', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'amebo@gmail.com',
          password: '333ttccfghjjkgg',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.equal('incorrect password');
          done();
        });
    });
    it('user should be logged in if details are correct', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          email: 'amebo@gmail.com',
          password: '333ttccfghjjkgv',
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
          done();
        });
    });
  });
});
