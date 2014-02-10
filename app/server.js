var express         = require('express');
var browserify      = require('connect-browserify');
var nodejsx         = require('node-jsx').install({ extension: '.jsx' });
var ReactMiddleware = require('react-async-middleware');
var App             = require('./client');

var port = 3111,
    domain = 'http://localhost:' + port;

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
  .use('/js/bundle.js', browserify.serve({
    entry: './app/client.jsx',
    extensions: ['.jsx'],
    debug: true,
    watch: true
  }))
  .use(ReactMiddleware(App))
  .listen(port);