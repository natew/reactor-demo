/**
 * @jsx React.DOM
 */

var React          = require('react');
var ReactAsync     = require('react-async');
var ReactMount     = require('react/lib/ReactMount');
var Navigator      = require('./mixins/Navigator');
var PageController = require('./mixins/PageController');
var HomePage       = require('./views/pages/HomePage');
var OtherPage      = require('./views/pages/OtherPage');
var HTMLLayout     = require('./views/layouts/HTML');

var App = ReactAsync.createClass({

  mixins: [Navigator, PageController],

  routes: {
    '/':      HomePage,
    '/other': OtherPage
  },

  path: function() {
    return this.props.path || window.location.pathname;
  },

  getInitialStateAsync: function(cb) {
    this.getDataForRoute(this.path(), cb);
  },

  getDataForRoute: function(path, cb) {
    var page = this.routes[path];
    var props = { path: path };
    this.getPageData(page, props, cb);
  },

  render: function() {
    var component = this.routes[this.state.path].component;

    return (
      <HTMLLayout title={this.state.title} onClick={this._onClick}>
        {component({ data: this.state.data })}
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
