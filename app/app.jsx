/**
 * @jsx React.DOM
 */

var React       = require('react');
var Transition  = require('react/lib/ReactWithAddons').addons.CSSTransitionGroup;
var ReactAsync  = require('react-async');
var ReactMount  = require('react/lib/ReactMount');
var routes      = require('./routes');
var Navigator   = require('./mixins/Navigator');
var Router      = require('./mixins/Router');
var HTMLLayout  = require('./views/layouts/HTML');
var Global      = require('./lib/AppState');

Router.setRoutes(routes);

// Sync updates to refresh rate
// require('react-raf-batching').inject();

// Allow server initial render
ReactMount.allowFullPageRender = true;

var App = React.createClass({

  mixins: [
    Router,
    Navigator,
    ReactAsync.Mixin
  ],

  getInitialStateAsync: function(cb) {
    this.setCurrentRoute(this.props.path);
    this.getStateFromPage(cb);
  },

  routerPageChange: function(cb) {
    this.getStateFromPage(function(err, data) {
      if (!err) this.setState(data);
      cb();
    }.bind(this));
  },

  getStateFromPage: function(cb) {
    Global.rootUrl = this.rootUrl();
    var route = this.currentRoute;
    var page = route.page;

    if (!page.getInitialPageState)
      return cb(null, {});

    // Get state from page, set data and head content
    page.getInitialPageState(route.params, function(err, data) {
      cb(err, {
        pageData: data,
        pageHead: page.head(data)
      })
    }.bind(this));
  },

  render: function() {
    var Page = Router.renderPage;

    console.log('head', this.state.pageHead)
    return this.transferPropsTo(
      <HTMLLayout onClick={this.navigate} pageHead={this.state.pageHead}>
        <Page path={this.props.path} className="page" parent={this} />
      </HTMLLayout>
    );
  }

});

module.exports = App;

// Browser initial render
if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}