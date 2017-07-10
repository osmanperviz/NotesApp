import express from 'express';
import AuthController from './backend/controllers/authController'
import RegistrationController from './backend/controllers/registrationController'
import passport from './backend/config/passport'

const router = express.Router();

router.post('/login', AuthController.login)

router.post('/register', RegistrationController.register)


export default router
