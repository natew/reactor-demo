/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactMount = require('react/lib/ReactMount');
var Router     = require('react-router-component');
var ReactAsync = require('react-async');
var HomePage   = require('./views/pages/HomePage');
var OtherPage  = require('./views/pages/OtherPage');
var HTMLLayout = require('./views/layouts/HTML');

ReactMount.allowFullPageRender = true;

var Locations  = Router.Locations;
var Location   = Router.Location;

var App = React.createClass({

  render: function() {
    return (
      <HTMLLayout>
        <Locations ref="router" onClick={this.onClick} path={this.props.path}>
          <Location path="/" handler={HomePage} />
          <Location path="/other" handler={OtherPage} />
        </Locations>
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
