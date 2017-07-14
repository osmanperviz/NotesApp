import HttpStatus from 'http-status';
import Notes from '../models/notes'
import APIError from '../helpers/apiError';


class CreateNoteService {

  static async perform(params) {
    const { title, creator } = params
    if (title === undefined && creator === undefined) return Promise.reject(new APIError('Bad Parametars', HttpStatus.BAD_REQUEST, true));

    try {
      const newNote = await Notes.create({ title: title, _creator: creator });
      return Promise.resolve(newNote);
    } catch (error) {
      return Promise.reject(new APIError(error.message, error.status, true));
    }
  }
}

export default CreateNoteService
