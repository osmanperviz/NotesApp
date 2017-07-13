import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs'
const Schema = mongoose.Schema


const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    select: false,
    required: 'Please Supply an email address',
  },
  username: {
    type: String,
    required: 'Please supply a name',
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Notes',
  }]
});

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
