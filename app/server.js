var express    = require('express');
var browserify = require('connect-browserify');
var nodejsx    = require('node-jsx').install({ extension: '.jsx' });
var cons       = require('consolidate');
var middleware = require('react-async-middleware');
var App        = require('./app');

var app    = express();

app.engine('html', cons.hogan);
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
  .get('/favicon.ico', function(req, res) {
    res.send('');
  })

var port = 3111;
var host = 'localhost'
var bundle = '/js/bundle.js';

app.use(bundle, browserify.serve({
    entry: './app/app.jsx',
    extensions: ['.jsx'],
    debug: true,
    watch: true
  }))
  .use(middleware(App, {
    // pass params to app.js component
    props: { host: host, port: port },
    sendResponse: false
  }))
  .use(function(req, res) {
    // if not serving js render with layout
    if (req.url !== bundle) {
      res.render('index', { body: res.body });
    }
  })
  .listen(port);