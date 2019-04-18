import moment from 'moment';
import accounts from '../models/accounts';

const accountController = {
  create: (req, res) => {
    const id = accounts.length + 1;
    const createdOn = moment(new Date());
    const accountNumber = parseInt(req.body.accountNumber, 10);
    const balance = parseFloat(req.body.balance);
    const owner = parseInt(req.body.owner, 10);
    const {
      firstname, lastname, email, type,
      status,
    } = req.body;
    const newAccount = {
      id,
      accountNumber,
      createdOn,
      owner,
      type,
      status,
      balance,
    };
    if (newAccount) {
      accounts.push(newAccount);
      return res.json({
        status: 201,
        data: {
          accountNumber,
          firstname,
          lastname,
          email,
          type,
          openingBalance: balance,
        },
      });
    }
    return res.json({
      status: 400,
      error: 'error creating Account',
    });
  },
  changeStatus: (req, res) => {
    const newAccount = {};
    const accountNumber = parseInt(req.params.accountNumber, 10);
    accounts.map((account, index, data) => {
      if (account.accountNumber === accountNumber) {
        newAccount.id = account.id;
        newAccount.accountNumber = account.accountNumber;
        newAccount.createdOn = account.createdOn;
        newAccount.owner = account.owner;
        newAccount.type = account.type;
        newAccount.status = req.body.status || account.status;
        newAccount.balance = account.balance;

        data.splice(index, 1, newAccount);
        return res.json({
          status: 200,
          data: {
            accountNumber: newAccount.accountNumber,
            status: newAccount.status,
          },
        });
      }
    });

    return res.json({
      status: 404,
      message: 'account not found',
    });
  },
  remove: (req, res) => {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    accounts.map((account, index, data) => {
      if (account.accountNumber === accountNumber) {
        data.splice(index, 1);
        return res.json({
          status: 200,
          message: 'account deleted successfully',
        });
      }
    });
  },
};
export default accountController;
