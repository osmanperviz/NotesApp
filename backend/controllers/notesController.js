import Notes from '../models/notes'

import UpdateNoteService from '../services/updateNoteService'
import CreateNoteService from '../services/createNoteService'

class NotesController {

  static async all (req, res, next) {
    const { currentUser } = req
    const notes = await Notes.find({ _creator: currentUser.id });
    res.status(200).json({ notes: notes })
  }

  static async update (req, res, next) {
    const { notes_id } = req.params
    try {
      const newNotes = await UpdateNoteService.perform({id: notes_id, attributes: req.body})
      res.status(200).json({ notes: newNotes })
    } catch (error) {
      res.status(error.status).json({ message: error.message })
    }
  }

  static async create (req, res, next) {
    try {
      const newNote = await CreateNoteService.perform({ title: req.body.title, creator: req.currentUser.id })
      res.status(200).json({ notes: newNote })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async delete (req, res, next) {

  }

  static async show (req, res, next) {
    const { notes_id } = req.params
    const notes = await Notes.findOne({ _id: notes_id, _creator: req.currentUser.id })
    res.status(200).json({ notes: notes })
  }

}

export default NotesController
