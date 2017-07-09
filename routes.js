import express from 'express';
import  AuthController from './backend/controllers/authController.js'

const router = express.Router();

//router.route('/login')
/** GET /api/login - User login*/
  //.get(AuthController.login)

router.get('/login',AuthController.login)


export default router
