import passport from 'passport';
import HttpStatus from 'http-status';
import jwt from 'jsonwebtoken'
import config from '../config/config'
import APIError from '../helpers/apiError';
import User from '../models/user'


class AuthService {

  static autenticate(credentials) {
    return new Promise((resolve, reject) => {
      const { username, password } = credentials
      if (username === undefined && password === undefined) reject(new APIError('Username or password not provided', HttpStatus.UNAUTHORIZED, true))

      User.findOne({ username: username }, (err, user) => {
        if (err) reject(new APIError('Database error', HttpStatus.INTERNAL_SERVER_ERROR, true))

        if(!user) reject(new APIError('Authentication failed. User not found', HttpStatus.UNAUTHORIZED, true))

        if(!user.validPassword(password)) reject(new APIError('Not valid password', HttpStatus.UNAUTHORIZED, true))

        const token = jwt.sign(user, config.secret)

        resolve({ token: token })

      })
    })
  }
}

export default AuthService
