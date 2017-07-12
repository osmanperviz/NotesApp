import HttpStatus from 'http-status';
import Notes from '../models/notes'

class UpdateNoteService {

  static async perform(params) {
    try {
      const updatedNote = await Notes.findOneAndUpdate(_id: params.id, { params})
      return Promise.resolve(newNote)
    } catch (error) {
      return Promise.reject(new APIError(error.message, error.status, true))
    }
  }
}

export default UpdateNoteService
