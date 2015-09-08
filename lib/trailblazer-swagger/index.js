'use strict';

var assign = require('object-assign');
var swaggerizeUi = require('swaggerize-ui');

var PARAM_PATTERN = /\/:([^\/]*)/g;
var PARAM_REPLACE = '/{$1}';

var DEFAULT_DOCS = {
  swagger: '2.0',
  info: {},
  paths: {}
};

module.exports = function (router, resources, config) {
  config.uri = config.uri || '/api-docs';
  config.docsUri = config.docsUri || '/docs';
  var docs = assign({}, DEFAULT_DOCS, config.docs);
  resources.forEach(function (resource) {
    if (!resource.module.docs) { return; }
    var swaggerUri = resource.uri.replace(PARAM_PATTERN, PARAM_REPLACE);
    docs.paths[swaggerUri] = resource.module.docs;
  });
  router.get(config.uri, function (req, res) {
    res.json(docs);
  });
  router.use(config.docsUri, swaggerizeUi({docs: config.uri}));
  return router;
};
