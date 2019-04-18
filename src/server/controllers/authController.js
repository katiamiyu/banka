import moment from 'moment';
import jwt from 'jsonwebtoken';
import decode from '../decode';
import users from '../models/auth';

const authController = {

  createUser: (req, res) => {
    if (!decode.isValidEmail(req.body.email)) {
      return res.json({
        status: 400,
        error: 'please enter a valid email',
      });
    }
    if (req.body.password.trim().length < 8) {
      return res.json({
        status: 400,
        error: 'password supplied is not invalid',
      });
    }
    if (req.body.password !== req.body.confirm) {
      return res.json({
        status: 400,
        error: 'Please confirm your password',
      });
    }

    const createdDate = moment(new Date());
    const modifiedDate = moment(new Date());
    const {
      firstname, lastname, email, password, isadmin,
    } = req.body;

    const id = users.length + 1;

    const newUser = {
      id,
      firstname,
      lastname,
      email,
      password,
      isadmin,
      createdDate,
      modifiedDate,
    };
    const token = jwt.sign({
      userId: id,
    },
    'deliver', { expiresIn: '7d' });
    if (newUser) {
      users.push(newUser);
      return res.json({
        status: 201,
        data: {
          token,
          user: newUser,
        },
      });
    }
    return res.json({
      status: 400,
      error: 'error creating user',
    });
  }, // End of createUser function

  loginUser(req, res) {
    users.map((user) => {
      if (user.email === req.body.email) {
        if (user.password !== req.body.password) {
          return res.json({
            status: 400,
            error: 'incorrect password',
          });
        }
        const token = jwt.sign({
          userId: user.id,
        },
        'deliver', { expiresIn: '7d' });
        return res.json({
          status: 200,
          data: {
            token,
            message: 'logged in successfully',
          },
        });
      }
    });
    return res.json({
      status: 400,
      error: 'user not found',
    });
  },
};

export default authController;
