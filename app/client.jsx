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

  isNavigating: false,

  getInitialStateAsync: function(cb) {
    this.getDataForRoute(this.navigatorGetPath(), cb);
  },

  getDataForRoute: function(path, cb) {
    var page = this.routes[path];
    var props = { path: path };
    this.pageControllerGetData(page, props, cb);
  },

  shouldComponentUpdate: function() {
    return !this.isNavigating;
  },

  onNavigate: function(path) {
    this.isNavigating = true;
    this.setState({ data: null, title: null });
    this.getDataForRoute(path, function(err, data) {
      this.isNavigating = false;
      this.setState(data);
    }.bind(this));
  },

  render: function() {
    var component = this.routes[this.state.path].component;

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
