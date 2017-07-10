import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcrypt-nodejs'

 const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: 'Please Supply an email address',
  },
  username: {
    type: String,
    required: 'Please supply a name',
  },
  token: {
    type: String
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.local.password);
};

export default mongoose.model('User', UserSchema);
