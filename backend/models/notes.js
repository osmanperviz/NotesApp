import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs'
const ObjectId = mongoose.Schema.ObjectId

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please Supply an title',
  },
  _creator: {
    type: ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['UNFINISHED', 'FINISHED'],
    default: 'UNFINISHED'
  }
});

export default mongoose.model('Notes', NotesSchema);
