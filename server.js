var path        = require('path');
var url         = require('url');
var express     = require('express');
var browserify  = require('connect-browserify');
var nodejsx     = require('node-jsx').install({ extension: '.jsx' });
var cons        = require('consolidate');
var ReactAsync  = require('react-async');
var App         = require('./app/app');

var app = express();
var props = {
  host: 'localhost',
  port: 3111,
  development: process.env.NODE_ENV !== 'production',
  bundle: '/assets/js/app.js'
};

app.engine('html', cons.hogan);
app.set('view engine', 'html');
app.set('views', './app/assets');

// Server
var renderApp = function(req, res, next) {
  props.path = url.parse(req.url).pathname;
  var app = App(props);
  ReactAsync.renderComponentToStringWithAsyncState(app, function(err, markup, data) {
    if (err) return next(err);
    markup = ReactAsync.injectIntoMarkup(markup, data, [props.bundle])
    res.render('index', { html: markup });
  });
}

// API
var api = function(req, res) {
  try { var controller = require('./api/' + req.params.controller); }
  catch(e) { res.send(500, e) }
  var params = req.params;
  if (params.id) controller = controller[params.controller][params.id];
  res.json(controller);
};

if (props.development) {
  app.get(props.bundle, browserify.serve({
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
  .listen(props.port);