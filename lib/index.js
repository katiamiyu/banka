"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
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
app.listen('3000', function () {
  console.log('app listening at port 3000');
}); // export app object for testing

var _default = app;
exports["default"] = _default;