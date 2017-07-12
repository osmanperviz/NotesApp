import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs'

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Please Supply an title',
  },
  _creator: {
    type: Number,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['UNFINISHED', 'FINISHED']
    default: 'UNFINISHED'
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

UserSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
