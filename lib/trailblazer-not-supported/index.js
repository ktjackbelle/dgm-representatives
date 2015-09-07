'use strict';

var methods = require('methods');

module.exports = function (router, resources, config) {
  resources.forEach(function (resource) {
    if (resource.supportedMethods === false) { return; }
    var usedMethods = Array.isArray(resource.supportedMethods)
      ? resource.supportedMethods.map(toUpperCase)
      : allowedMethods(resource.middleware);
    router.all(resource.uri, createMiddleware(usedMethods, config));
  });
  return router;
};

function createMiddleware(usedMethods, config) {
  var usedHash = usedMethods.reduce(function (hash, method) {
    return (hash[method] = true && hash);
  }, {});
  var ALLOW = usedMethods.join(',');

  return function (req, res, next) {
    if (usedHash[req.method]) { return next(); }
    res.set('Allow', ALLOW);
    var error = new Error('Method not allowed');
    error.status = 405;
    error.name = 'NotSupportedError';
    next(error);
  };
}

function allowedMethods(middlewareArr) {
  var usedMethods = middlewareArr.reduce(function (hash, middleware) {
    return (hash[middleware.method] = true && hash);
  }, {});
  usedMethods.options = true;
  return methods.reduce(function (allow, method) {
    if (usedMethods[method]) { allow.push(method.toUpperCase()); }
    return allow;
  }, []);
}

function toUpperCase(str) {
  return str.toUpperCase();
}
