import passport from '../config/passport'
import AuthService from '../services/authService'

class AuthController {

 static async login (req, res, next) {
   const { username, password } = req.body
    try {
      const token = await AuthService.login({ username: username, password: password })
      res.status(200).json({ token: token })
    } catch (error) {
      res.status(error.status).json({ message: error.message })
    }
  }


  static async logout (req, res, next) {

   }

}


export default AuthController
