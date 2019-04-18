import express from 'express';
import authController from '../controllers/authController';

const authRouter = express.Router();


authRouter.route('/auth/signup')
  .post(authController.createUser);
authRouter.route('/auth/signin')
  .post(authController.loginUser);


export default authRouter;
