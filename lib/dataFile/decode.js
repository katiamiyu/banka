'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decode = {
  hashPassword: function hashPassword(password) {
    return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(8));
  },
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcryptNodejs2.default.compareSync(password, hashPassword);
  },
  isValidEmail: function isValidEmail(email) {
    return (/\S+@\S+\.\S+/.test(email)
    );
  },
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken2.default.sign({
      userId: id
    }, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }
};

exports.default = decode;