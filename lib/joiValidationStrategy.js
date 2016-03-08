'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _lodashSet = require('lodash.set');

var _lodashSet2 = _interopRequireDefault(_lodashSet);

var _lodashGet = require('lodash.get');

var _lodashGet2 = _interopRequireDefault(_lodashGet);

var _lodashIsempty = require('lodash.isempty');

var _lodashIsempty2 = _interopRequireDefault(_lodashIsempty);

var _utils = require('./utils');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

exports['default'] = function (joiOptions) {
  return {
    validate: function validate(data, joiSchema, options, callback) {
      if (data === undefined) data = {};
      if (joiSchema === undefined) joiSchema = {};

      var _this = this;

      if (options === undefined) options = {};

      _invariant2['default'](typeof callback === 'function', 'joi-validation-strategy is asynchronous, a callback is expected: validate(data, schema, options, callback)');
      var key = options.key;
      var _options$prevErrors = options.prevErrors;
      var prevErrors = _options$prevErrors === undefined ? {} : _options$prevErrors;

      var validationOptions = _extends({
        abortEarly: false,
        allowUnknown: true
      }, joiOptions);
      _joi2['default'].validate(data, joiSchema, validationOptions, function (error) {
        var errors = _this.collectErrors(error);
        if (key === undefined || key === null || _lodashIsempty2['default'](errors)) {
          return callback(_utils.hydrate(errors));
        }
        return callback(_lodashSet2['default'](prevErrors, key, _lodashGet2['default'](_utils.hydrate(errors), key)));
      });
    },
    collectErrors: function collectErrors(error) {
      if (error !== null) {
        return error.details.reduce(function (errors, _ref) {
          var path = _ref.path;
          var message = _ref.message;

          errors[path] = errors[path] || [];
          errors[path].push(message);
          return errors;
        }, {});
      }
      return {};
    }
  };
};

module.exports = exports['default'];