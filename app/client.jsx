/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactMount = require('react/lib/ReactMount');
var ReactAsync = require('react-async');
var HTMLLayout = require('./views/layouts/HTML');
var Routes     = require('./routes');
var Router     = require('react-router-component');
var Locations  = Router.Locations;
var Location   = Router.Location;

ReactMount.allowFullPageRender = true;

var App = React.createClass({

  mixins: [Routes],

  pages: {
    HomePage: require('./views/pages/HomePage'),
    OtherPage: require('./views/pages/OtherPage')
  },

  mapLocation: function(loc) {
    return <Location path={loc.path} handler={this.pages[loc.handler]} />
  },

  render: function() {
    return (
      <HTMLLayout>
        <Locations ref="router" onClick={this.onClick} path={this.props.path}>
          {this.locations.map(this.mapLocation)}
        </Locations>
        {this.props.path}
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
