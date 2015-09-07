'use strict';

var STATUS_CODES = require('http').STATUS_CODES;

module.exports = function (router, resources, config) {
  return [
    function (req, res, next) {
      var error = new Error('Resource not found');
      error.status = 404;
      error.name = 'NotFoundError';
      next(error);
    },
    function (err, req, res, next) {
      err.status = err.status || 500;

      res.status(err.status).json({
        code: err.status,
        error: STATUS_CODES[err.status],
        message: err.message
      });
    }
  ];
};
