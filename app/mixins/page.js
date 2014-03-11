var Superagent  = require('superagent');
var State       = require('../state');

module.exports = {

  cache: {},

  get: function(url, params, cb) {
    // params argument is optional
    if (typeof params == 'function') cb = params;
    else url = this.replaceParams(url, params);

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
  },

  replaceParams: function(url, params) {
    var paramKeys = Object.keys(params);

    paramKeys.map(function(param) {
      url = url.replace(':' + param, params[param]);
    });

    if (paramKeys.length)
      url = url.replace(/(\/:[^\/]+)+/, '');

    return url;
  }

};