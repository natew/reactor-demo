var Superagent  = require('superagent');
var State       = require('../state');

module.exports = {

  cache: {},

  get: function(url, cb) {
    var cache = this.cache;
    if (cache[url]) cb(cache[url]);
    else {
      Superagent
      .get(State.rootUrl + url)
      .end(function(err, res) {
        if (!err && res) {
          cache[url] = res.body;
          cb(res.body);
        }
        else cb({error: err});
      });
    }
  }

};