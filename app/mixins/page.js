var Superagent = require('superagent');

module.exports = {

  init: function(opts) {
    // todo: invariant
    this.rootUrl = opts.rootUrl;
    this.cache = {};
  },

  get: function(url, params, cb) {
    if (typeof params == 'function')
      cb = params;
    else
      url = this.replaceParams(url, params);

    if (this.cache[url])
      cb(this.cache[url]);
    else {
      Superagent
      .get(this.rootUrl + url)
      .end(function(err, res) {
        if (!err && res) {
          this.cache[url] = res.body;
          cb(res.body);
        }
        else cb({error: err});
      }.bind(this));
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