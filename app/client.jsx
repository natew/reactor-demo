/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactMount = require('react/lib/ReactMount');
var Router     = require('react-router-component');
var ReactAsync = require('react-async');
var HTMLLayout = require('./views/layouts/HTML');
var Routes     = require('./routes');

ReactMount.allowFullPageRender = true;

var Locations = Router.Locations;
var Location = Router.Location;

var pages = {
  HomePage: require('./views/pages/HomePage'),
  OtherPage: require('./views/pages/OtherPage')
};

var App = React.createClass({

  mixins: [Routes],

  locationHandler: function(loc) {
    return <Location path={loc.path} handler={pages[loc.handler]} />
  },

  render: function() {
    return (
      <HTMLLayout path={this.props.path}>
        <Locations ref="router" onClick={this.onClick} path={this.props.path}>
          {this.locations.map(this.locationHandler)}
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
