var Superagent  = require('superagent');
var State      = require('../state');
var Cortex       = require('cortexjs');

module.exports = {

  cache: {},

  setData: function() {
    var data = new Cortex(this.state.pageData, this.updatePageData);
  },

  get: function(url, cb) {
    var cache = this.cache;
    if (cache[url]) cb(cache[url]);
    else {
      Superagent
      .get(State.rootUrl + url)
      .end(function(err, res) {
        if (!err && res) {
          cache[url] = res.body;
          cb(null, res.body);
        }
        else cb(err, {});
      });
    }
  }

};