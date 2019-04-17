"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var decode = {
  hashPassword: function hashPassword(password) {
    return _bcryptNodejs["default"].hashSync(password, _bcryptNodejs["default"].genSaltSync(8));
  },
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcryptNodejs["default"].compareSync(password, hashPassword);
  },
  isValidEmail: function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken["default"].sign({
      userId: id
    }, process.env.SECRET, {
      expiresIn: '7d'
    });

    return token;
  }
};
var _default = decode;
exports["default"] = _default;