var nodeJSX               = require('node-jsx').install({ extension: '.jsx' });
var path                  = require('path');
var express               = require('express');
var reactorCoreMiddleware = require('reactor-core/lib/middleware');
var webpack               = require('webpack');
var wpMiddleware          = require('webpack-dev-middleware');
var wpConfig              = require('./webpack.config');
var App                   = require('./app/app');
var Server                = express();

var HOST      = process.env.NODE_HOST || 'localhost';
var ENV       = process.env.NODE_ENV || 'development';
var PORT      = process.env.NODE_PORT || 3111;
var ASSET_DIR = '/assets';

var api = function(req, res) {
  try { var controller = require('./api/' + req.params.controller); }
  catch(e) { console.log('error', e); res.send(500, e); }
  var params = req.params;
  if (params.name) controller = controller[params.controller][params.name];
  res.json(controller);
};

// Serve JS bundle in dev
if (ENV == 'development')
  Server.use(wpMiddleware(webpack(wpConfig), {
    publicPath: ASSET_DIR + '/js',
    quiet: true
  }));

Server
  .get('/api/:controller/:name?/:id?', api)
  .use(ASSET_DIR, express.static(path.join(__dirname, 'build')))
  .use('/bower', express.static(path.join(__dirname, 'bower_components')))
  .use('/images', express.static(path.join(__dirname, 'app', ASSET_DIR, '/images')))
  .use(express.favicon())
  .use(reactorCoreMiddleware(App, {
    wrapper: function(markup) {
      return '<!doctype>' + markup;
    },
    props: {
      host: HOST, port: PORT, env: ENV,
      bundle: ASSET_DIR + '/js/app.js'
    }
  }))
  .listen(PORT);

console.log('ENV:', ENV, '\nServer started at http://' + HOST + ':' + PORT);