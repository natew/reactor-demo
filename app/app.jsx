/**
 * @jsx React.DOM
 */

var React       = require('react');
var ReactAsync  = require('react-async');
var ReactMount  = require('react/lib/ReactMount');
var Batch       = require('react-raf-batching').inject();
var routes      = require('./routes');
var Navigator   = require('./mixins/Navigator');
var Router      = require('./mixins/Router');
var HTMLLayout  = require('./views/layouts/HTML');
var Global      = require('./lib/AppState');

var App = ReactAsync.createClass({

  mixins: [Router, Navigator],

  routes: routes,

  componentWillMount: function() {
    Global.rootUrl = this.rootUrl();
  },

  routerPageChange: function() {
    this.getStateFromPage(function(err, data) {
      if (!err) this.setState(data);
      this.shouldUpdate = true;
    }.bind(this));
  },

  getInitialStateAsync: function(cb) {
    this.getStateFromPage(cb);
  },

  getStateFromPage: function(cb) {
    if (!this.currentPage.type.getInitialPageState)
      return cb(null, {});

    var setter = function(err, data) {
      cb(err, {
        data: data,
        path: this.props.path,
        title: this.currentPage.type.pageTitle(data)
      })
    }.bind(this);

    this.currentPage.type.getInitialPageState(this.route.params, setter);
  },

  render: function() {
    return (
      <HTMLLayout title={this.state.title} onClick={this.navigate}>
        {this.currentPage}
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
