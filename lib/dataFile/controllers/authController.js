'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('../dbCon/index');

var _index2 = _interopRequireDefault(_index);

var _decode = require('../decode');

var _decode2 = _interopRequireDefault(_decode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var authController = {
  createUser: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var hashedPassword, createQuery, values, _ref2, rows, token, user;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_decode2.default.isValidEmail(req.body.email)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', res.json({
                status: 400,
                error: 'please enter a valid email'
              }));

            case 2:
              if (!(req.body.password.trim().length < 8)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', res.json({
                status: 400,
                error: 'password supplied is not invalid'
              }));

            case 4:
              if (!(req.body.password !== req.body.confirm)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', res.json({
                status: 400,
                error: 'Please confirm your password'
              }));

            case 6:
              hashedPassword = _decode2.default.hashPassword(req.body.password);
              createQuery = void 0;


              if (!req.body.isadmin) {
                createQuery = 'insert into\n      users(firstname, lastname, email, password, created_date, modified_date)\n      values($1, $2, $3, $4, $5, $6)\n      returning *';
              } else {
                createQuery = 'insert into\n        users(firstname, lastname, email, password, isadmin, created_date, modified_date)\n        values($1, $2, $3, $4, $5, $6, $7)\n        returning *';
              }

              values = [req.body.firstname, req.body.lastname, req.body.email, hashedPassword, req.body.isadmin, (0, _moment2.default)(new Date()), (0, _moment2.default)(new Date())];
              _context.prev = 10;
              _context.next = 13;
              return _index2.default.query(createQuery, values);

            case 13:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              token = _decode2.default.generateToken(rows[0].id);
              user = {
                id: rows[0].id,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                email: rows[0].email,
                isadmin: rows[0].isadmin,
                created_date: rows[0].created_date,
                modified_date: rows[0].modified_date
              };
              return _context.abrupt('return', res.json({
                status: 201,
                data: {
                  token: token,
                  user: user
                }
              }));

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](10);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 24;
                break;
              }

              return _context.abrupt('return', res.json({
                status: 400,
                error: 'email is used already'
              }));

            case 24:
              return _context.abrupt('return', res.json({
                status: 400,
                error: 'error creating user'
              }));

            case 25:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[10, 20]]);
    }));

    function createUser(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return createUser;
  }(),
  // End of createUser function

  loginUser: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var queryText, _ref4, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_decode2.default.isValidEmail(req.body.email)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt('return', res.json({
                status: 400,
                error: 'please enter a valid email'
              }));

            case 2:
              if (!(req.body.password.trim().length < 8)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt('return', res.json({
                status: 400,
                error: 'password supplied is not invalid'
              }));

            case 4:
              queryText = 'select * from users where email = $1';
              _context2.prev = 5;
              _context2.next = 8;
              return _index2.default.query(queryText, [req.body.email]);

            case 8:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt('return', res.json({
                status: 404,
                error: 'user not found'
              }));

            case 12:
              if (_decode2.default.comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt('return', res.json({
                status: 400,
                error: 'incorrect password'
              }));

            case 14:
              token = _decode2.default.generateToken(rows[0].id);
              return _context2.abrupt('return', res.json({
                status: 200,
                data: {
                  token: token,
                  message: 'logged in successfully'
                }
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](5);
              return _context2.abrupt('return', res.json({
                status: 400,
                error: 'error accessing banka'
              }));

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[5, 18]]);
    }));

    function loginUser(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return loginUser;
  }()
};

exports.default = authController;