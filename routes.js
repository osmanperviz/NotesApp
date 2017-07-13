import express from 'express';
import AuthController from './backend/controllers/authController'
import RegistrationController from './backend/controllers/registrationController'
import NotesController from './backend/controllers/NotesController'

import AuthService from './backend/services/authService'


const router = express.Router();

router.post('/login', AuthController.login)

router.post('/register', RegistrationController.register)

router
  .get('/notes', NotesController.all)
  .post('/notes', AuthService.autenticate,  NotesController.create)


export default router
