/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactMount = require('react/lib/ReactMount');
var ReactAsync = require('react-async');
var HTMLLayout = require('./views/layouts/HTML');
var Routes     = require('./routes');
var Router     = require('react-router-component');

ReactMount.allowFullPageRender = true;

var App = React.createClass({

  mixins: [Routes],

  render: function() {
    return (
      <HTMLLayout>
        <Router ref="router" onClick={this.onClick} path={this.props.path}>
          {this.locations}
        </Router>
      </HTMLLayout>
    );
  },

  onClick: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();
    this.refs.router.navigate(e.target.attributes.href.value);
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    ReactAsync.renderComponent(App(), document);
  }
}
