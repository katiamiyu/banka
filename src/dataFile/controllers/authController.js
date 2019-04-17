import moment from 'moment';
import db from '../dbCon/index';
import decode from '../decode';

const authController = {
  async createUser(req, res) {
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
    const hashedPassword = decode.hashPassword(req.body.password);

    let createQuery;

    if (!req.body.isadmin) {
      createQuery = `insert into
      users(firstname, lastname, email, password, created_date, modified_date)
      values($1, $2, $3, $4, $5, $6)
      returning *`;
    } else {
      createQuery = `insert into
        users(firstname, lastname, email, password, isadmin, created_date, modified_date)
        values($1, $2, $3, $4, $5, $6, $7)
        returning *`;
    }

    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hashedPassword,
      req.body.isadmin,
      moment(new Date()),
      moment(new Date()),
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = decode.generateToken(rows[0].id);
      const user = {
        id: rows[0].id,
        firstname: rows[0].firstname,
        lastname: rows[0].lastname,
        email: rows[0].email,
        isadmin: rows[0].isadmin,
        created_date: rows[0].created_date,
        modified_date: rows[0].modified_date,
      };
      return res.json({
        status: 201,
        data: {
          token,
          user,
        },
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.json({
          status: 400,
          error: 'email is used already',
        });
      }
    }
    return res.json({
      status: 400,
      error: 'error creating user',
    });
  }, // End of createUser function

  async loginUser(req, res) {
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
    const queryText = 'select * from users where email = $1';
    try {
      const { rows } = await db.query(queryText, [req.body.email]);
      if (!rows[0]) {
        return res.json({
          status: 404,
          error: 'user not found',
        });
      }
      if (!decode.comparePassword(rows[0].password, req.body.password)) {
        return res.json({
          status: 400,
          error: 'incorrect password',
        });
      }
      const token = decode.generateToken(rows[0].id);
      return res.json({
        status: 200,
        data: {
          token,
          message: 'logged in successfully',
        },
      });
    } catch (error) {
      return res.json({
        status: 400,
        error: 'error accessing banka',
      });
    }
  }, // End of loginUser function

};

export default authController;
