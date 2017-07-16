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

describe('PUT api/notes', () => {
  var user;
  var note;
  var Jwtmock

  before((done) => {
    Jwtmock = sinon.stub(jwt, 'verify').callsFake(() => user);
    createDB(done);
  })

  after(function(done) {
    Jwtmock.restore();
    destroyDB()
    done()
  });

  describe('success update', () => {
    it("should return updated note",  async () => {
        user = await factory.build('user')
        note = await factory.create('note')

        const response = await request(app).put(`/api/notes/${note.id}`)
                                .set('x-access-token', jwt.sign(user, config.secret))
                                .send({ status: "FINISHED" })

        expect(response.status).to.equal(200)
        expect(response.body.notes.status).to.equal("FINISHED")
     })
   })
})
