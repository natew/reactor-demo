var path        = require('path');
var url         = require('url');
var express     = require('express');
var browserify  = require('connect-browserify');
var ReactAsync  = require('react-async');
var Server      = express();

require('node-jsx').install({
  extension: '.jsx',
  additionalTransform: function(src) {
    return '/** @jsx React.DOM */' +  src;
  }
});

var App       = require('./app/app');

var HOST      = process.env.NODE_HOST || 'localhost';
var ENV       = process.env.NODE_ENV || 'development';
var PORT      = process.env.NODE_PORT || 3111;
var ASSET_DIR = '/assets';

var props = {
  host: HOST, port: PORT, env: ENV,
  bundle: ASSET_DIR + '/js/app.js'
};

var render = function(req, res, next) {
  props.path = url.parse(req.url).pathname;
  ReactAsync.renderComponentToStringWithAsyncState(
    App(props),
    function(err, markup, data) {
      if (err) return next(err);
      markup = ReactAsync.injectIntoMarkup(markup, data, [props.bundle])
      res.send('<!doctype>' + markup);
    }
  );
}

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

// Serve JS bundle in dev
if (props.env == 'development') {
  Server.get(props.bundle, browserify.serve({
    entry: './app/app.jsx',
    extensions: ['.jsx'],
    debug: true,
    watch: true
  }))
}

Server
  .get('/api/:controller/:name?/:id?', api)
  .use(ASSET_DIR, express.static(path.join(__dirname, 'build')))
  .use('/bower', express.static(path.join(__dirname, 'bower_components')))
  .use('/images', express.static(path.join(__dirname, 'app/assets/images')))
  .use(express.favicon())
  .use(render)
  .listen(props.port);