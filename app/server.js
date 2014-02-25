// Demonstration server...
// This basically does everything from API to assets to server

var express    = require('express');
var browserify = require('connect-browserify');
var nodejsx    = require('node-jsx').install({ extension: '.jsx' });
var cons       = require('consolidate');
var middleware = require('react-async-middleware');
var Client     = require('./app');

var app = express();
var bundle = '/js/bundle.js';
var port = 3111;
var host = 'localhost';

// API
app.get('/api/:controller/:id?', function(req, res) {
  var controller = require('../api/'+ req.params.controller);
  if (req.params.id) controller = controller[req.params.controller][req.params.id];
  res.json(controller);
})

// Assets
app.get('/images/:file', function(req, res) {
  res.sendfile('./app/assets/images/' + req.params.file);
})
app.get('/css/:file', function(req, res) {
  res.sendfile('./build/css/' + req.params.file);
})
app.get('/favicon.ico', function(req, res) { res.send(''); })


// Client
app.use(bundle, browserify.serve({
  entry: './app/app.jsx',
  extensions: ['.jsx'],
  debug: true,
  watch: true
}))

// Server

// Templating
app.engine('html', cons.hogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Server middleware
app.use(middleware(Client, {
  props: { host: host, port: port },
  sendResponse: false
}))

app.use(function(req, res) {
  if (req.url !== bundle) res.render('index', { body: res.body });
})

app.listen(port);