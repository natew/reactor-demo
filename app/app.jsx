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
var Cortex      = require('./lib/cortex/cortex');

Router.setRoutes(routes);

var App = ReactAsync.createClass({

  mixins: [Navigator],

  componentWillMount: function() {
    this.setCurrentPage(this.props.path);
  },

  getInitialStateAsync: function(cb) {
    this.setStateFromPage();
  },

  setCurrentPage: function(path) {
    this.route = Router.getRoute(path);
    this.currentPage = route.page();
  },

  setStateFromPage: function(cb, err, data) {
    this.currentPage.getInitialPageState(
      this.route.matches,
      cb(err, {
        data: data,
        path: this.props.path,
        title: this.route.page.title(data)
      })
    );
  },

  onNavigate: function(path) {
    this.setCurrentPage(path);
    this.setStateFromPage();
  },

  updatePageData: function() {
    Router.currentPage.setProps({ data: this.pageCortex });
    // TODO: send updated data to model
  },

  render: function() {
    return (
      <HTMLLayout title={this.state.title} onClick={this.navigate}>
        {Router.renderPage(this.state.path, { data: this.state.data })}
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
