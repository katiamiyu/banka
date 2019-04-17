"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../controllers/authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authRouter = _express["default"].Router();

authRouter.route('/signup').post(_authController["default"].createUser);
authRouter.route('/signin').post(_authController["default"].loginUser);
var _default = authRouter;
exports["default"] = _default;