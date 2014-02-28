/**
 * @jsx React.DOM
 */

var React       = require('react');
var Transition  = require('react/lib/ReactWithAddons').addons.CSSTransitionGroup;
var ReactAsync  = require('react-async');
var routes      = require('./routes');
var Navigator   = require('./mixins/Navigator');
var Router      = require('./mixins/Router');
var HTMLLayout  = require('./views/layouts/HTML');
var Global      = require('./lib/AppState');

Router.setRoutes(routes);

// Sync updates to refresh rate
// require('react-raf-batching').inject();

// Allow server initial render
require('react/lib/ReactMount').allowFullPageRender = true;

var App = React.createClass({

  mixins: [
    Router,
    Navigator,
    ReactAsync.Mixin
  ],

  getInitialStateAsync: function(cb) {
    this.getStateFromPage(cb);
  },

  routerPageChange: function() {
    console.log('routerpagechange')
    this.getStateFromPage(function(err, data) {
      console.log('got', err, data)
      if (!err) {
        this.setState(data);
        this.shouldUpdate = true;
      }
    }.bind(this));
  },

  getStateFromPage: function(cb) {
    Global.rootUrl = this.rootUrl();
    var route = Router.getRoute(this.props.path);
    var page = route.page;

    if (!page.getInitialPageState)
      return cb(null, {});

    // Get state from page, set data and head content
    page.getInitialPageState(route.params, function(err, data) {
      cb(err, {
        pageData: data,
        head: page.head(data)
      })
    }.bind(this));
  },

  render: function() {
    console.log('page', Router.renderPage({ path: this.props.path, className: "flick", parent: this }))
    console.log('state', this.state)
    return this.transferPropsTo(
      <HTMLLayout onClick={this.navigate}>
        <Transition transitionName="flick">
          {Router.renderPage({ path: this.props.path, className: "flick", parent: this })}
        </Transition>
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