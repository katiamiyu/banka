'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authController = require('../controllers/authController');

var _authController2 = _interopRequireDefault(_authController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = _express2.default.Router();

authRouter.route('/signup').post(_authController2.default.createUser);
authRouter.route('/signin').post(_authController2.default.loginUser);

exports.default = authRouter;