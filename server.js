var path        = require('path');
var url         = require('url');
var express     = require('express');
var browserify  = require('connect-browserify');
var nodejsx     = require('node-jsx').install({ extension: '.jsx' });
var cons        = require('consolidate');
var ReactAsync  = require('react-async');
var App         = require('./app/app');

var app         = express();
var bundle      = '/assets/js/app.js';
var port        = 3111;
var host        = 'localhost';
var development = process.env.NODE_ENV !== 'production';

app.engine('html', cons.hogan);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'app', 'views'));

// Server
var renderApp = function(req, res, next) {
  var path = url.parse(req.url).pathname;
  var app = App({host: host, path: path, port: port});
  ReactAsync.renderComponentToStringWithAsyncState(app, function(err, markup, data) {
    if (err) return next(err);
    markup = ReactAsync.injectIntoMarkup(markup, data, [bundle])
    res.render('index', { html: markup });
  });
}

// API
var api = function(req, res) {
  var controller = require('./api/' + req.params.controller);
  var params = req.params;
  if (params.id) controller = controller[params.controller][params.id];
  res.json(controller);
};

if (development) {
  app.get(bundle, browserify.serve({
    entry: './app/app.jsx',
    extensions: ['.jsx'],
    debug: true,
    watch: true
  }))
}

app
  .get('/api/:controller/:id?', api)
  .use('/assets', express.static(path.join(__dirname, 'build')))
  .use('/images', express.static(path.join(__dirname, 'app/assets/images')))
  .use(express.favicon())
  .use(renderApp)
  .listen(port);