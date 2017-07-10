import HttpStatus from 'http-status';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import config from '../config/config'
import APIError from '../helpers/apiError';
import User from '../models/user'

class RegistrationService {

  static register(credentials) {
    return new Promise((resolve, reject) => {
      debugger;
      const { username, password } = credentials
      if (username === undefined && password === undefined) reject(new APIError('Username or password not provided', HttpStatus.UNAUTHORIZED, true))

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new user({
  			username: name,
  			password: hash,
  			created_at: new Date()
  		});

      // newUser.save()
      // //.then((user) => resolve({ token: jwt.sign(user, config.secret) }))
      // .then((user) => resolve({supe: "ksksksk"}))
      // .catch(err => {
      //   // if(err.code === 11000) {
      //   //   reject(new APIError('User Already Registered!', 409, true))
      //   // } else {
      //   //   reject(new APIError('Database error', HttpStatus.INTERNAL_SERVER_ERROR, true))
      //   // }
      //   reject(err)
      // })

      resolve({user: newUser})

    })
  }
}

export default RegistrationService
