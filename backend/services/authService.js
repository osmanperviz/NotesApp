import HttpStatus from 'http-status';
import jwt from 'jsonwebtoken'
import config from '../config/config'
import APIError from '../helpers/apiError';
import User from '../models/user'
import mongoose from 'mongoose'


class AuthService {

  static async login(credentials) {
    const { username, password } = credentials

    if (username === undefined && password === undefined) return Promise.reject(new APIError('Username or password not provided', HttpStatus.UNAUTHORIZED, true))

    try {
      const user = await User.findOne({ username: username }).select('+password')

      if(!user) return Promise.reject(new APIError('Authentication failed. User not found', HttpStatus.UNAUTHORIZED, true))

      if(!user.isValidPassword(password)) return Promise.reject(new APIError('Not valid password', HttpStatus.UNAUTHORIZED, true))

      const token = jwt.sign(user.username, config.secret)

      return Promise.resolve({ token: token })

    } catch (error) {

      return Promise.reject(new APIError(error.message, error.status, true))

    }
  }

  static async autenticate(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(!token) return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Not provided valid token" });

    try {
      const decodedToken = await jwt.verify(token, config.secret);
      req.currentUser = { username: decodedToken._doc.username, id:  mongoose.Types.ObjectId(decodedToken._doc._id) };
      next();
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }

  }
}

export default AuthService
