import HttpStatus from 'http-status';
import Notes from '../models/notes'
import mongoose from 'mongoose'

class UpdateNoteService {

  static async perform(params) {
    try {
      const { id, attributes } = params
      const updatedNote = await Notes.findOneAndUpdate( { _id: mongoose.Types.ObjectId(id) },  { "$set": attributes } , { new: true })
      return Promise.resolve(updatedNote)
    } catch (error) {
      return Promise.reject(new APIError(error.message, error.status, true))
    }
  }
}

export default UpdateNoteService
