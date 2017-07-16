import { expect } from 'chai';
import request from 'supertest';
import factory from '../factory';
import sinon from 'sinon'
import app from '../../app'
import RegistrationService from '../../services/registrationService'
import APIError from '../../helpers/apiError'

describe('api/register', () => {
  describe('Success Registration', () => {
    var mockObj;

    before(() => {
      mockObj = sinon.stub(RegistrationService, 'register').callsFake(() => 'fake token');
    })

    after(function () {
        mockObj.restore();
    });

    it('should return success when registration service return success', (done) => {
       request(app)
        .post('/api/register')
        .send({username: 'somme usersnamme', password: 'test password'})
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body.token).to.equal('fake token')
          done();
      })
    })
  })
  describe('Unsuccessful Registration', () => {
    var mockObj;
    before(() => {
      mockObj = sinon.stub(RegistrationService, 'register').callsFake(() =>  Promise.reject(new APIError('some error message', 500, true)));
    })

    after(function () {
      mockObj.restore();
    });

    it('should return error when RegistationService return error', (done) => {
       request(app)
        .post('/api/register')
        .send({username: 'somme usersnamme', password: 'test password'})
        .set('Accept', 'application/json')
        .expect(500)
        .end((err, res) => {
          expect(res.status).to.eq(500)
          expect(res.body.message).to.equal("some error message")
          done();
      })
    })
  })
})
