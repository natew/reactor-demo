/**
 * @jsx React.DOM
 */

var React       = require('react');
var ReactAsync  = require('react-async');
var ReactMount  = require('react/lib/ReactMount');
var Batch       = require('react-raf-batching').inject();
var Router      = require('./mixins/Router');
var routes      = require('./routes');
var Navigator   = require('./mixins/Navigator');
var HTMLLayout  = require('./views/layouts/HTML');
var superagent  = require('superagent');

var App = ReactAsync.createClass({

  mixins: [Navigator],

  componentWillMount: function() {
    Router.setRoutes(routes);
  },

  getInitialStateAsync: function(cb) {
    var route = Router.getRoute(this.props.path);

    this.setStateFromRoute(route, function(err, data) {
      cb(err, {
        data: data,
        path: this.props.path,
        title: this.getTitleFromPage(route.page, data)
      });
    }.bind(this));
  },

  setStateFromRoute: function(route, cb) {
    if (!route.page.path) cb(null, page.data || {});
    var page = route.page;
    var path = this.getPathWithParams(page.path, route.matches);

    superagent
      .get(this.rootUrl + path)
      .end(function(err, res) {
        cb(err, res ? res.body : {});
      });
  },

  getPathWithParams: function(path, matches) {
    if (path.indexOf(':') !== -1)
      for (var key in matches)
        path = path.replace(':' + key, matches[key]);

    return path;
  },

  getTitleFromPage: function(page, data) {
    return typeof page.title == 'function' ? page.title(data) : page.title || '';
  },

  render: function() {
    return (
      <HTMLLayout title={this.state.title} onClick={this.navigate}>
        {Router.renderPage({ path: this.state.path, data: this.state.data })}
      </HTMLLayout>
    );
  }

});

ReactMount.allowFullPageRender = true;
module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    ReactAsync.renderComponent(App(), document);
  }
}
