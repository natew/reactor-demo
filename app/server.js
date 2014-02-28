// Demonstration server...
// This basically does everything from API to assets to server

var express    = require('express');
var browserify = require('connect-browserify');
var nodejsx    = require('node-jsx').install({ extension: '.jsx' });
var cons       = require('consolidate');
var ReactAsync = require('react-async');
var App        = require('./app');
var url        = require('url');

var app = express();
var bundle = '/js/bundle.js';
var port = 3111;
var host = 'localhost';

app.engine('html', cons.hogan);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

function renderApp(req, res, next) {
  var path = url.parse(req.url).pathname;
  var app = App({host: host, path: path, port: port});
  ReactAsync.renderComponentToStringWithAsyncState(app, function(err, markup, data) {
    if (err) return next(err);
    markup = ReactAsync.injectIntoMarkup(markup, data, [bundle])
    res.render('index', { html: markup });
  });
}

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

app.use(renderApp);
app.listen(port);