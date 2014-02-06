var express     = require('express');
var browserify  = require('browserify');
var reactify    = require('reactify');
var servePage   = require('react-app-middleware');
var serveJS     = require('connect-browserify');

var app = express();
var opts = { debug: true, watch: true };

app.get('/api/:endpoint', function(req, res) {
  var endpoint = require('../api/'+ req.params.endpoint);
  res.json(endpoint);
});

app.get('/images/:file', function(req, res) {
  res.sendfile('./app/assets/images/' + req.params.file);
});

app.get('/css/:file', function(req, res) {
  res.sendfile('./build/css/' + req.params.file);
});

function createBundler() {
  return browserify({ extensions:['.jsx'] })
    .require('./app/client.jsx', {expose: './app'})
    .transform(reactify);
}

app.get('/js/app.js', serveJS(createBundler(), opts));
app.use(servePage(createBundler(), opts));

app.listen(3111);