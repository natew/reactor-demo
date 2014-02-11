var express    = require('express');
var browserify = require('connect-browserify');
var nodejsx    = require('node-jsx').install({ extension: '.jsx' });
var cons       = require('consolidate');
var middleware = require('react-async-middleware');
var App        = require('./client');

var bundle = '/js/bundle.js';
var port   = 3111;
var app    = express();

app.engine('html', cons.hogan)
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

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

app.use(bundle, browserify.serve({
    entry: './app/client.jsx',
    extensions: ['.jsx'],
    debug: true,
    watch: true
  }))
  .use(middleware(App))
  .use(function(req, res) {
    if (req.url == bundle) return;
    res.render('index', { body: res.body });
  })
  .listen(port);