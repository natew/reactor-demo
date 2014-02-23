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

app.get('/api/:controller/:id?', function(req, res) {
    var controller = require('../api/'+ req.params.controller);
    if (req.params.id) controller = controller[req.params.controller][req.params.id];
    res.json(controller);
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
  // react async middleware
  .use(middleware(App, {
    // pass url to app.jsx
    props: { host: host, port: port },
    // continue to next .use
    sendResponse: false
  }))
  .use(function(req, res) {
    // if not serving .js render with layout
    if (req.url !== bundle) {
      res.render('index', { body: res.body });
    }
  })
  .listen(port);