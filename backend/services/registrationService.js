import HttpStatus from 'http-status';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import config from '../config/config'
import APIError from '../helpers/apiError';
import User from '../models/user'

class RegistrationService {

  static async register(credentials) {
    const { username, password } = credentials

    if (username === undefined && password === undefined) return Promise.reject(new APIError('Username or password not provided', HttpStatus.UNAUTHORIZED, true))

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
			username: username,
			password: hash,
			created_at: new Date()
		});

    try {
      const savedUser = await newUser.save()
      const token = jwt.sign(savedUser, config.secret)

      return Promise.resolve({token: token})
    } catch (error) {
      return Promise.reject(new APIError(error.message, error.status, true))
    }

  }
}

export default RegistrationService
