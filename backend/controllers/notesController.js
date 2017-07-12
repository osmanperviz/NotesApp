import Notes from '../models/notes'

import UpdateNoteService from '../services/updateNoteservice'
import CreateNoteService from '../services/createNoteservice'

class NotesController {

  static async all (req, res, next) {
    const notes = await Notes.find({_creator: currentUser.id});
    res.status(200).json({ notes: notes })
  }

  static async update (req, res, next) {e
    try {
      const newNotes = await CreateNoteService.perform({ title: title, creator: currentUser.id})
      res.status(200).json({ notes: newNotes })
    } catch (error) {
      res.status(error.status).json({ message: error.message })
    }
  }

  static async create (req, res, next) {
    const { title } = req.body
    try {
      const newNotes = await CreateNoteService.perform({ title: title, creator: currentUser.id})
      res.status(200).json({ notes: newNotes })
    } catch (error) {
      res.status(error.status).json({ message: error.message })
    }
  }

  static async delete (req, res, next) {
    
  }

  static async show (req, res, next) {
    const { id } = req.body
    const notes = await Notes.findOne({ _id: id})
    res.status(200).json({ notes: notes })
  }

}

export default NotesController
