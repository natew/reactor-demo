var Superagent = require('superagent');

var Page = {

  cache: {},

  get: function(path, pageCb) {
    return function(root, params, cb) {
      if (typeof params == 'object')
        path = Page.replaceParams(path, params);

      if (Page.cache[path])
        cb(Page.cache[path]);
      else {
        Superagent
        .get(root + path)
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

  replaceParams: function(url, params) {
    var paramKeys = Object.keys(params);

    paramKeys.map(function(param) {
      url = url.replace(':' + param, params[param]);
    });

    if (paramKeys.length)
      url = url.replace(/(\/:[^\/]+)+/, '');

    return url;
  },

  setStateFromPage: function(root, route, cb) {
    console.log('setStateFromPage', root)
    var page = route.page;
    if (!page.props) cb(null, {});
    else page.props(root, route.params, function(data) {
      var t = page.title;
      cb(null, {
        pageData: data,
        title: typeof t == 'function' ? t(data) : t
      });
    });
  }

};

module.exports = Page;