"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _index = _interopRequireDefault(require("../dbCon/index"));

var _decode = _interopRequireDefault(require("../decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authController = {
  createUser: function () {
    var _createUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(req, res) {
      var hashedPassword, createQuery, values, _ref, rows, token, user;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_decode["default"].isValidEmail(req.body.email)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: 'please enter a valid email'
              }));

            case 2:
              if (!(req.body.password.trim().length < 8)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: 'password supplied is not invalid'
              }));

            case 4:
              if (!(req.body.password !== req.body.confirm)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: 'Please confirm your password'
              }));

            case 6:
              hashedPassword = _decode["default"].hashPassword(req.body.password);

              if (!req.body.isadmin) {
                createQuery = "insert into\n      users(firstname, lastname, email, password, created_date, modified_date)\n      values($1, $2, $3, $4, $5, $6)\n      returning *";
              } else {
                createQuery = "insert into\n        users(firstname, lastname, email, password, isadmin, created_date, modified_date)\n        values($1, $2, $3, $4, $5, $6, $7)\n        returning *";
              }

              values = [req.body.firstname, req.body.lastname, req.body.email, hashedPassword, req.body.isadmin, (0, _moment["default"])(new Date()), (0, _moment["default"])(new Date())];
              _context.prev = 9;
              _context.next = 12;
              return _index["default"].query(createQuery, values);

            case 12:
              _ref = _context.sent;
              rows = _ref.rows;
              token = _decode["default"].generateToken(rows[0].id);
              user = {
                id: rows[0].id,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                email: rows[0].email,
                isadmin: rows[0].isadmin,
                created_date: rows[0].created_date,
                modified_date: rows[0].modified_date
              };
              return _context.abrupt("return", res.json({
                status: 201,
                data: {
                  token: token,
                  user: user
                }
              }));

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](9);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 23;
                break;
              }

              return _context.abrupt("return", res.json({
                status: 400,
                error: 'email is used already'
              }));

            case 23:
              return _context.abrupt("return", res.json({
                status: 400,
                error: 'error creating user'
              }));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[9, 19]]);
    }));

    function createUser(_x, _x2) {
      return _createUser.apply(this, arguments);
    }

    return createUser;
  }(),
  // End of createUser function
  loginUser: function () {
    var _loginUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(req, res) {
      var queryText, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (_decode["default"].isValidEmail(req.body.email)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 400,
                error: 'please enter a valid email'
              }));

            case 2:
              if (!(req.body.password.trim().length < 8)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 400,
                error: 'password supplied is not invalid'
              }));

            case 4:
              queryText = 'select * from users where email = $1';
              _context2.prev = 5;
              _context2.next = 8;
              return _index["default"].query(queryText, [req.body.email]);

            case 8:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (rows[0]) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 404,
                error: 'user not found'
              }));

            case 12:
              if (_decode["default"].comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: 400,
                error: 'incorrect password'
              }));

            case 14:
              token = _decode["default"].generateToken(rows[0].id);
              return _context2.abrupt("return", res.json({
                status: 200,
                data: {
                  token: token,
                  message: 'logged in successfully'
                }
              }));

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](5);
              return _context2.abrupt("return", res.json({
                status: 400,
                error: 'error accessing banka'
              }));

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[5, 18]]);
    }));

    function loginUser(_x3, _x4) {
      return _loginUser.apply(this, arguments);
    }

    return loginUser;
  }()
};
var _default = authController;
exports["default"] = _default;