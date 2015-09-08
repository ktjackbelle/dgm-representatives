'use strict';

var Promise = require('bluebird');
var objectPath = require('object-path');

module.exports = function promiseware(reqKey, fn) {
  if (typeof reqKey === 'function') {
    fn = reqKey;
    reqKey = 'value';
  }
  return function (req, res, next) {
    Promise.resolve()
      .then(function () {
        return fn(req, res);
      })
      .then(function (value) {
        objectPath.set(req, reqKey, value);
      })
      .then(next, next);
  };
};
