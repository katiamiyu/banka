import express from 'express';
import accountController from '../controllers/accountController';

const accountRouter = express.Router();

accountRouter.route('/accounts')
  .post(accountController.create);
accountRouter.route('/accounts/:accountNumber')
  .patch(accountController.changeStatus)
  .delete(accountController.remove);


export default accountRouter;
