import { expect } from 'chai';
import request from 'supertest';
import factory from '../../factory';
import sinon from 'sinon'
import app from '../../../app'
import jwt from 'jsonwebtoken'
import config from '../../../config/config'
  import { createDB, destroyDB } from '../../test-helper'

describe('GET api/notes', function() {
  var user;
  var Jwtmock;

  before((done) => {
    createDB(done);
    Jwtmock = sinon.stub(jwt, 'verify').callsFake(() => user);
  })

  after(function () {
    Jwtmock.restore()
     destroyDB();
  });

  describe('When authorized', () => {
    it("should return all user related notes", async () => {
        user = await factory.create('user')
        const notRelatedNote = await factory.create('note')
        const note = await factory.create('note', { _creator:  user._id })

        const response = await request(app).get('/api/notes').set('x-access-token', jwt.sign(user, config.secret))
        expect(response.status).to.equal(200)
        expect(response.body.notes.length).to.equal(1)
        expect(response.body.notes[0]._id).to.equal(note.id)
     })
   })

   describe('When Unauthorized', () => {
     it("should return status Unauthorized with error message", async () => {
         const response = await request(app).get('/api/notes')
         expect(response.status).to.equal(401)
         expect(response.body.message).to.equal('Not provided valid token')
      })
    })

})
