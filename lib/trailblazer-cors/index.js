'use strict';

var assign = require('object-assign');
var cors = require('cors');
var methods = require('methods');

module.exports = function (router, resources, config) {
  resources.forEach(function (resource) {
    if (resource.cors === false) { return; }
    var corsMiddleware = cors(assign(
      {methods: allowedMethods(resource.middleware)},
      config,
      resource.cors
    ));
    resource.middleware.unshift({
      method: 'options',
      middleware: corsMiddleware
    });
    router.all(resource.uri, corsMiddleware);
  });
  return router;
};

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
