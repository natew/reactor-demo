/**
 * @jsx React.DOM
 */

var React          = require('react');
var ReactAsync     = require('react-async');
var ReactMount     = require('react/lib/ReactMount');
var Routes         = require('./mixins/Routes');
var Router         = require('./mixins/Router');
var Navigator      = require('./mixins/Navigator');
var PageController = require('./mixins/PageController');
var HTMLLayout     = require('./views/layouts/HTML');

var App = ReactAsync.createClass({

  mixins: [Routes, Router, Navigator, PageController],

  isNavigating: false,

  // Only called from server
  getInitialStateAsync: function(cb) {
    console.log('get state')
    this.getDataForRoute(this.props.path, cb);
  },

  getDataForRoute: function(path, cb) {
    console.log('get data for route')
    this.activePage = this.routerGetPage(path);
    this.pageControllerGetData(this.activePage, { path: path }, cb);
  },

  shouldComponentUpdate: function() {
    return !this.isNavigating;
  },

  onNavigate: function(path) {
    this.isNavigating = true;
    this.setState({ path: path, data: null, title: null });
    this.getDataForRoute(path, function(err, data) {
      this.isNavigating = false;
      this.setState(data);
    }.bind(this));
  },

  render: function() {
    console.log('render');
    // if (!this.activePage) return <html></html>;
    var component = this.activePage.component;

    return (
      <HTMLLayout title={this.state.title} onClick={this.navigatorOnClick}>
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
