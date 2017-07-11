import RegistrationService from '../services/registrationService'

class RegistrationController {

  static async register (req, res, next) {
    const { username, password } = req.body
    try {
      const token = await RegistrationService.register({ username: username, password: password })
      res.status(200).json({ token: token })
    } catch (error) {
      res.status(error.status).json({ message: error.message })
    }
  }

}

export default RegistrationController
