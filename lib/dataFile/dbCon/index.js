'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pg2.default.defaults.ssl = true;

_dotenv2.default.config();
var pool = new _pg2.default.Pool({
  connectionString: process.env.ONLINE_URL
});

var query = function query(text, params) {
  return new Promise(function (resolve, reject) {
    pool.query(text, params).then(function (res) {
      resolve(res);
    }).catch(function (err) {
      reject(err);
    });
  });
};

exports.default = { query: query };