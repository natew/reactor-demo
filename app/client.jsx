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

  getInitialStateAsync: function(cb) {
    this.pageControllerGetData(this.props.path, cb);
  },

  onNavigate: function(path) {
    this.pageControllerGetData(path, function(err, data) {
      this.setState(data);
    }.bind(this));
  },

  render: function() {
    var component = this.routerGetPage(this.state.path).component;

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
