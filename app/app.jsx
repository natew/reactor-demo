/**
 * @jsx React.DOM
 */

var React       = require('react');
var ReactAsync  = require('react-async');
var ReactMount  = require('react/lib/ReactMount');
var Batch       = require('react-raf-batching').inject();
var Router      = require('./lib/Router');
var routes      = require('./routes');
var Navigator   = require('./views/mixins/Navigator');
var HTMLLayout  = require('./views/layouts/HTML');
var AppState    = require('./lib/AppState');

Router.setRoutes(routes);

var App = ReactAsync.createClass({

  mixins: [Navigator],

  componentWillMount: function() {
    this.setCurrentPage(this.props.path);
    AppState.set('rootUrl', this.rootUrl());
    // set url in store
  },

  getInitialStateAsync: function(cb) {
    this.getStateFromPage(cb);
  },

  setCurrentPage: function(path) {
    this.route = Router.getRoute(path);
    this.currentPage = this.route.to({ parent: this });
  },

  getStateFromPage: function(cb) {
    var setter = function(err, data) {
      cb(err, {
        data: data,
        path: this.props.path,
        title: this.currentPage.title(data)
      })
    }.bind(this);

    this.currentPage.getInitialPageState(this.route.params, setter);
  },

  onNavigate: function(path) {
    this.setCurrentPage(path);
    this.getStateFromPage(function(err, data) {
      if (!err) this.setState(data);
    });
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
