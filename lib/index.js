'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

require('babel-polyfill');

var _authRouter = require('./dataFile/routes/authRouter');

var _authRouter2 = _interopRequireDefault(_authRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 13384;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

var middleware = {
  logger: function logger(req, res, next) {
    console.log('Request: ' + req.url + '  Time: ' + new Date().toString() + '  Method: ' + req.method);
    next();
  }
};

app.use(middleware.logger);
app.use('/api/v1/auth', _authRouter2.default);
app.use('*', function (req, res) {
  res.status(404).send({
    status: 'bad request'
  });
});

app.listen(PORT, function () {
  console.log('app listening at PORT: ' + PORT);
});

// export app object for testing
exports.default = app;