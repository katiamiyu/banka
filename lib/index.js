"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

require("babel-polyfill");

var _authRouter = _interopRequireDefault(require("./dataFile/routes/authRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 13384;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
var middleware = {
  logger: function logger(req, res, next) {
    console.log("Request: ".concat(req.url, "  Time: ").concat(new Date().toString(), "  Method: ").concat(req.method));
    next();
  }
};
app.use(middleware.logger);
app.use('/api/v1/auth', _authRouter["default"]);
app.use('*', function (req, res) {
  res.status(404).send({
    status: 'bad request'
  });
});
app.listen(PORT, function () {
  console.log("app listening at PORT: ".concat(PORT));
}); // export app object for testing

var _default = app;
exports["default"] = _default;