import { expect } from 'chai';
import request from 'supertest';
import factory from '../../factory';
import app from '../../../app'
import config from '../../../config/config'
import sinon from 'sinon'
import jwt from 'jsonwebtoken'
import { createDB, destroyDB } from '../../test-helper'
import CreateNoteService from '../../../services/createNoteService'
import APIError from '../../../helpers/apiError'

describe('POST api/notes', function () {
  var user;
  var note;
  var Jwtmock;

  before(function (done) {
    Jwtmock = sinon.stub(jwt, 'verify').callsFake(() => user);
    createDB(done);
  })

  after(function(done) {
    Jwtmock.restore()
    destroyDB()
    done()
  });

  describe('success creation', () => {
    it("should return new note",  async () => {
        user = await factory.build('user')
        note = await factory.build('note')

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

         const response = await request(app).post('/api/notes')
                                 .set('x-access-token', jwt.sign(user, config.secret))
         expect(response.status).to.equal(500)
         expect(response.body.message).to.equal("Notes validation failed: title: Please Supply an title")
      })
    })
})
