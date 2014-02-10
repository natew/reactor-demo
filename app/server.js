var express        = require('express');
var browserify     = require('browserify');
var nodejsx        = require('node-jsx').install();
var ReactMiddlware = require('react-async-middleware');
var App            = require('./client');

var app   = express();
var opts  = { debug: true, watch: true };

app.get('/api/:endpoint', function(req, res) {
  var endpoint = require('../api/'+ req.params.endpoint);
  res.json(endpoint);
});

app.get('/images/:file', function(req, res) {
  res.sendfile('./app/assets/images/' + req.params.file);
});

app.get('/css/:file', function(req, res) {
  res.sendfile('./build/css/' + req.params.file);
});

app
  .get('/js/bundle.js', browserify('./client', opts))
  .use(ReactMiddleware(App))
  .listen(3111);