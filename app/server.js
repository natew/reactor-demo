var express         = require('express');
var browserify      = require('connect-browserify');
var nodejsx         = require('node-jsx').install({ extension: '.jsx' });
var ReactMiddleware = require('react-async-middleware');
var App             = require('./client');
var fs              = require('fs');

var bundleUri = '/js/bundle.js';
var port      = 3111;
var uri       = { hostname: 'localhost', port: port };
var layout    = fs.readFileSync(__dirname + '/assets/index.html', 'utf8');

function wrapLayout(req, res, next) {
  if (req.url == bundleUri) return;
  var response = layout.replace('</head>', '</head>' + res.body);
  res.send(response);
}

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
  .use(bundleUri, browserify.serve({
    entry: './app/client.jsx',
    extensions: ['.jsx'],
    debug: true,
    watch: true
  }))
  .use(ReactMiddleware(App))
  .use(wrapLayout)
  .listen(port);