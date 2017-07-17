import { expect } from 'chai';
import request from 'supertest';
import factory from '../factory';
import { createDB, destroyDB } from '../test-helper'
import sinon from 'sinon'
import app from '../../app'
import AuthService from '../../services/authService.js'
import APIError from '../../helpers/apiError'

describe('api/login', () => {
  var mockObj;
  var fakeResponse;

  beforeEach((done) => {
    createDB(done);
    mockObj = sinon.stub(AuthService, 'login').callsFake(() => fakeResponse);
  })

  afterEach(function () {
     mockObj.restore();
     destroyDB();

  });

  describe('Success Login', () => {
    it('should return token on success login', (done) => {
       fakeResponse = 'Success token'
       request(app)
        .post('/api/login')
        .send({username: 'somme usersnamme', password: 'test password'})
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.token).to.equal('Success token')
          done();
      })
    })
  })

  describe('Unsuccessful Login', () => {
    it('should return error unsuccessful login', (done) => {
       fakeResponse = Promise.reject(new APIError('some error message', 401, true));
       request(app)
        .post('/api/login')
        .send({username: 'somme usersnamme', password: 'test password'})
        .set('Accept', 'application/json')
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).to.equal("some error message")
          done();
      })
    })
  })
})
