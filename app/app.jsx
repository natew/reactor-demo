/**
 * @jsx React.DOM
 */

var React       = require('react');
var ReactAsync  = require('react-async');
var ReactMount  = require('react/lib/ReactMount');
var Batch       = require('react-raf-batching').inject();
var Router      = require('./lib/Router');
var routes      = require('./routes');
var Navigator   = require('./mixins/Navigator');
var HTMLLayout  = require('./views/layouts/HTML');
var superagent  = require('superagent');
var Cortex      = require('./lib/cortex/cortex');

var App = ReactAsync.createClass({

  mixins: [Navigator],

  componentWillMount: function() {
    Router.setRoutes(routes);
  },

  getInitialStateAsync: function(cb) {
    var route = Router.getRoute(this.props.path);

    this.setStateFromRoute(route, function(err, data) {
      // Return initial state
      cb(err, {
        data: data,
        path: this.props.path,
        title: this.getTitleFromPage(route.page, data)
      });
    }.bind(this));
  },

  updatePageData: function() {
    Router.currentPage.setProps({ data: this.pageCortex });
    // TODO: send updated data to model
  },

  setStateFromRoute: function(route, cb) {
    if (!route.page.path) cb(null, page.data || {});
    var page = route.page;
    var path = Router.replacePathWithParams(page.path, route.matches);

    superagent
      .get(this.rootUrl + path)
      .end(function(err, res) {
        cb(err, res ? res.body : {});
      });
  },

  getTitleFromPage: function(page, data) {
    return typeof page.title == 'function' ? page.title(data) : page.title || '';
  },

  render: function() {
    // Set up page data structure
    var pageData = new Cortex(this.state.data, this.updatePageData);

    return (
      <HTMLLayout title={this.state.title} onClick={this.navigate}>
        {Router.renderPage(this.state.path, { data: pageData })}
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
