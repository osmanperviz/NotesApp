import { expect } from 'chai';
import request from 'supertest';
import factory from '../../factory';
import sinon from 'sinon'
import app from '../../../app'
import config from '../../../config/config'
import jwt from 'jsonwebtoken'
import { createDB, destroyDB } from '../../test-helper'
import CreateNoteService from '../../../services/createNoteService'
import APIError from '../../../helpers/apiError'

describe('POST api/notes', () => {
  var mockObj;
  var user;
  var note;
  var fakeResponse;

  before((done) => {
    sinon.stub(jwt, 'verify').callsFake(() => fakeResponse);
    mockObj = sinon.stub(CreateNoteService, 'perform').callsFake(() => note );
    createDB(done);
  })

  after(function() {
    mockObj.restore();
    destroyDB()
  });

  describe('success creation', () => {
    it("should return new note",  async () => {
        user = await factory.build('user')
        note = await factory.build('note')
        fakeResponse = user

        const response = await request(app).post('/api/notes')
                                .set('x-access-token', jwt.sign(user, config.secret))
                                .send({ title: note.title })
        expect(response.status).to.equal(200)
        expect(response.body.notes.title).to.equal(note.title)
     })
   })
   describe('unsuccessful creation', () => {
     it("should return error message",  async () => {
         user = await factory.build('user')
         note = await factory.build('note')
         fakeResponse = Promise.reject(new APIError("error message", 401, true));

         const response = await request(app).post('/api/notes')
                                 .set('x-access-token', jwt.sign(user, config.secret))
                                 .send({ title: note.title })

         expect(response.status).to.equal(401)
         expect(response.body.message).to.equal("error message")
      })
    })
})
