var React      = require('react');
var Superagent = require('superagent');
var State      = require('../state');

ReactPage = {
  createPage: function(spec) {
    var reactSpec = {
      statics: {
        title: spec.title,
        props: ReactPage.get(spec.fetch, spec.getInitialProps),
        update: spec.update || function() {}
      }
    };

    for (var key in spec)
      if (spec.hasOwnProperty(key))
        reactSpec[key] = spec[key];

    return React.createClass(reactSpec);
  },

  cache: {},

  get: function(path, pageCb) {
    return function(root, params, cb) {
      if (typeof params == 'object')
        path = this.replaceParams(path, params);

      if (this.cache[path])
        cb(this.cache[path]);
      else {
        Superagent
        .get(root + path)
        .end(function(err, res) {
          if (!err && res) {
            var result = res.body;
            if (pageCb) result = pageCb(result, params);
            this.cache[path] = result;
            cb(result);
          }
          else {
            cb({error: err});
          }
        }.bind(this));
      }
    }.bind(this);
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

React.createPage = ReactPage.createPage;
React.setStateFromPage = ReactPage.setStateFromPage;
React.isBrowser = (typeof window !== 'undefined');
module.exports = React;