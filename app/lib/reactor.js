/*

  REACTOR
  A small library to help create a isomorphic app in React

*/

var React      = require('react');
var ReactAsync = require('react-async');
var ReactMount = require('react/lib/ReactMount');
var Router     = require('./mixins/router');
var PushState  = require('./mixins/pushState');
var Superagent = require('superagent');
var Cortex     = require('cortexjs');

ReactMount.allowFullPageRender = true;

var Reactor = {

  browserStart: function(App) {
    if (typeof window !== 'undefined') {
      window.React = React;
      window.onload = function() {
        React.renderComponent(App(), document);
      }
    }
  },

  createClass: function(spec) {
    Router.setRoutes(spec.routes);

    return React.createClass({
      mixins: [
        Router,
        PushState,
        ReactAsync.Mixin
      ],

      statics: spec.statics,
      routes: spec.routes,

      componentWillMount: function() {
        if (!this.props.debug && this.props.env === 'production')
          require('react-raf-batching').inject(); // faster in prod
      },

      getInitialStateAsync: function(cb) {
        this.setRoute(this.props.path);
        this.getStateFromPage(cb);
      },

      routerPageChange: function(cb) {
        this.getStateFromPage(function(err, data) {
          cb(this.setState(err ? {error: err} : data));
        }.bind(this));
      },

      getStateFromPage: function(cb) {
        var root = this.rootUrl()
        var route = this.route;
        var page = route.page;

        if (!page.props) cb(null, {});
        else page.props(root, route.params, function(data) {
          var t = page.title;
          cb(null, {
            pageData: data,
            title: typeof t == 'function' ? t(data) : t
          });
        });
      },

      render: function() {
        this.pageTitle = this.state.title;
        this.pageData = new Cortex(this.state.pageData, this.route.page.update);
        return spec.render.call(this, this.route.page);
      }

    });
  },

  inject: function(react) {
    React = react;
    react.createPageClass = ReactorCore.createPage;
    react.createAppClass = ReactorCore.createPage;
    react.getStateFromPage = ReactorCore.getStateFromPage;
    react.isBrowser = (typeof window !== 'undefined');
    return Reactor;
  }

};

module.exports = Reactor;

var ReactorCore = {

  createPage: function(spec) {
    var reactSpec = {
      statics: {
        title: spec.title,
        props: ReactorCore.get(spec.fetch, spec.getInitialProps),
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
  }
};