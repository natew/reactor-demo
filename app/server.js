var express    = require('express');
var browserify = require('connect-browserify');
var nodejsx    = require('node-jsx').install({ extension: '.jsx' });
var cons       = require('consolidate');
var middleware = require('react-async-middleware');
var App        = require('./client');

var bundleUri  = '/js/bundle.js';
var port       = 3111;
var uri        = { hostname: 'localhost', port: port };
var app        = express();

app.engine('html', cons.hogan)
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

function layout(req, res) {
  if (req.url == bundleUri) return;
  res.render('index', {
    body: res.body,
    bundleUri: bundleUri
  });
}

app.get('/api/:endpoint', function(req, res) {
    var endpoint = require('../api/'+ req.params.endpoint);
    res.json(endpoint);
  })
  .get('/images/:file', function(req, res) {
    res.sendfile('./app/assets/images/' + req.params.file);
  })
  .get('/css/:file', function(req, res) {
    res.sendfile('./build/css/' + req.params.file);
  })

app.use(bundleUri, browserify.serve({
    entry: './app/client.jsx',
    extensions: ['.jsx'],
    debug: true,
    watch: true
  }))
  .use(middleware(App))
  .use(layout)
  .listen(port);