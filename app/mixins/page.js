var Superagent = require('superagent');

var Page = {

  init: function(opts) {
    // todo: invariant
    this.rootUrl = opts.rootUrl;
    this.cache = {};
  },

  get: function(path, pageCb) {
    return function(params, cb) {
      if (typeof params == 'object')
        path = Page.replaceParams(path, params);

      if (Page.cache[path])
        cb(Page.cache[path]);
      else {
        Superagent
        .get(Page.rootUrl + path)
        .end(function(err, res) {
          if (!err && res) {
            var result = res.body;
            if (pageCb) result = pageCb(result, params);
            Page.cache[path] = result;
            cb(result);
          }
          else cb({error: err});
        });
      }
    }
  },

  getBound: function(url, params, cb) {
    return Page.get.bind(Page, url, params, cb);
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

module.exports = Page;