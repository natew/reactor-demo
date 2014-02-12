/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactMount = require('react/lib/ReactMount');
var Router     = require('./mixins/Router');
var es5        = require('es5-shim');
var HomePage   = require('./views/pages/HomePage');
var OtherPage  = require('./views/pages/OtherPage');

var App = React.createClass({

  mixins: [Router],

  routes: {
    '/':      HomePage,
    '/other': OtherPage
  },

  getInitialState: function() {
    return { path: this.props.path || window.location.pathname };
  },

  render: function() {
    return this.transferPropsTo(this.routes[this.state.path]({
      onClick: this._onClick
    }));
  }

});

ReactMount.allowFullPageRender = true;
module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}
