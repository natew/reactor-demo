var express         = require('express');
var browserify      = require('browserify');
var nodejsx         = require('node-jsx').install({ extension: '.jsx' });
var ReactMiddleware = require('react-async-middleware');
var App             = require('./client');

express()
  .get('/api/:endpoint', function(req, res) {
    var endpoint = require('../api/'+ req.params.endpoint);
    res.json(endpoint);
  })
  .get('/images/:file', function(req, res) {
    res.sendfile('./app/assets/images/' + req.params.file);
  })
  .get('/css/:file', function(req, res) {
    res.sendfile('./build/css/' + req.params.file);
  })
  .get('/js/bundle.js', function() {
    browserify({ extension: ['.jsx'] })
      .require('./client', { debug: true, watch: true });
  })
  .use(ReactMiddleware(App))
  .listen(3111);