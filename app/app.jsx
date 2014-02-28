/**
 * @jsx React.DOM
 */

var React       = require('react');
var Transition  = require('react/lib/ReactWithAddons');
var ReactAsync  = require('react-async');
var routes      = require('./routes');
var Navigator   = require('./mixins/Navigator');
var Router      = require('./mixins/Router');
var HTMLLayout  = require('./views/layouts/HTML');
var Global      = require('./lib/AppState');

// Sync updates to refresh rate
require('react-raf-batching').inject();

// Allow server initial render
require('react/lib/ReactMount').allowFullPageRender = true;

var App = ReactAsync.createClass({

  mixins: [Router, Navigator],

  routes: routes,

  componentWillMount: function() {
    Global.rootUrl = this.rootUrl();
  },

  getInitialStateAsync: function(cb) {
    this.getStateFromPage(cb);
  },

  routerPageChange: function() {
    this.getStateFromPage(function(err, data) {
      if (!err) this.setState(data);
      this.shouldUpdate = true;
    }.bind(this));
  },

  currentPage: function(path) {
    this.route = this.getRoute(path);
    this.currentPage = this.route.to;
  },

  getStateFromPage: function(cb) {
    if (!this.currentPage.type.getInitialPageState)
      return cb(null, {});

    // Get state from page, set data and head content
    this.currentPage.type.getInitialPageState(this.route.params, function(err, data) {
      cb(err, {
        data: data,
        path: this.props.path,
        head: this.currentPage.type.getHead(data)
      })
    }.bind(this));
  },

  render: function() {
    return (
      <HTMLLayout head={this.state.head} onClick={this.navigate}>
        <Transition transitionName="flick">
          {this.currentPage({ parent: this }}
        </Transition>
      </HTMLLayout>
    );
  }

});

module.exports = App;

// Browser initial render
if (typeof window !== 'undefined') {
  window.onload = function() {
    ReactAsync.renderComponent(App(), document);
  }
}