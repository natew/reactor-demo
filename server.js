var path        = require('path');
var url         = require('url');
var express     = require('express');
var nodejsx     = require('node-jsx').install({ extension: '.jsx' });
var browserify  = require('connect-browserify');
var ReactAsync  = require('react-async');
var App         = require('./app/app');

var app = express();
var props = {
  host: 'localhost',
  port: 3111,
  env: process.env.NODE_ENV || 'development',
  bundle: '/assets/js/app.js'
};

// Server
var renderApp = function(req, res, next) {
  props.path = url.parse(req.url).pathname;
  var app = App(props);
  ReactAsync.renderComponentToStringWithAsyncState(app, function(err, markup, data) {
    if (err) return next(err);
    markup = ReactAsync.injectIntoMarkup(markup, data, [props.bundle])
    res.send('<!doctype>' + markup);
  });
}

// API
var api = function(req, res) {
  try { var controller = require('./api/' + req.params.controller); }
  catch(e) {
    console.log('error', e);
    res.send(500, e);
  }
  var params = req.params;
  if (params.name) controller = controller[params.controller][params.name];
  res.json(controller);
};

// Bundle
if (props.env == 'development') {
  app.get(props.bundle, browserify.serve({
    entry: './app/app.jsx',
    extensions: ['.jsx'],
    debug: true,
    watch: true
  }))
}

app
  .get('/api/:controller/:name?/:id?', api)
  .use('/assets', express.static(path.join(__dirname, 'build')))
  .use('/images', express.static(path.join(__dirname, 'app/assets/images')))
  .use(express.favicon())
  .use(renderApp)
  .listen(props.port);