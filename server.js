var nodeJSX       = require('node-jsx');
    nodeJSX.install({ extension: '.jsx', additionalTransform: addPragma });
var path          = require('path');
var url           = require('url');
var express       = require('express');
var browserify    = require('connect-browserify');
var ReactAsync    = require('react-async');
var Server        = express();
var webpack       = require('webpack');
var wpMiddleware  = require('webpack-dev-middleware');
var wpConfig      = require('./webpack.config');
var App           = require('./app/app');

function addPragma(src) {
  return '/** @jsx React.DOM */' +  src;
}

var HOST      = process.env.NODE_HOST || 'localhost';
var ENV       = process.env.NODE_ENV || 'development';
var PORT      = process.env.NODE_PORT || 3111;
var ASSET_DIR = '/assets';

console.log('ENV:', ENV);

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
  Server.use(wpMiddleware(webpack(wpConfig), { publicPath: ASSET_DIR+'/js' }));
}

Server
  .use(ASSET_DIR, express.static(path.join(__dirname, 'build')))
  .get('/api/:controller/:name?/:id?', api)
  .use('/bower', express.static(path.join(__dirname, 'bower_components')))
  .use('/images', express.static(path.join(__dirname, 'app'+ASSET_DIR+'/images')))
  .use(express.favicon())
  .use(render)
  .listen(props.port);

console.log('Server started at http://' + HOST + ':' + PORT);