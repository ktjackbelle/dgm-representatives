'use strict';

// load .env environment variables
require('dotenv').load({
  silent: true,
  path: process.env.DOTENV || require('path').join(__dirname, '.env')
});
require('babel/register');

var app = require('./app');
module.exports = app.default || app;
