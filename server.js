var express     = require('express');
var browserify  = require('browserify');
var servePage   = require('react-app-middleware');
var serveJS     = require('connect-browserify');

var app = express();
var opts = { debug: true, watch: true };

// app.get('/', function(req, res) {
//   res.sendfile('./app/assets/index.html');
// });

app.get('/api/:endpoint', function(req, res) {
  var endpoint = require('./api/'+ req.params.endpoint);
  res.json(endpoint);
});

app.get('/:file', function(req, res) {
  res.sendfile('./app/assets/' + req.params.file);
});

app.get('/js/:file', function(req, res) {
  res.sendfile('./build/js/' + req.params.file);
});

app.get('/css/:file', function(req, res) {
  res.sendfile('./public/css/' + req.params.file);
});

function createBundler() {
  return browserify()
    .require('./build/modules/client.js', {
      expose: './app'
    })
}

app.use(servePage(createBundler(), {
  debug: opts.debug,
  watch: opts.watch
}));

app.listen(3111);