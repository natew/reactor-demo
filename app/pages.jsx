/**
 * @jsx React.DOM
 */

var React        = require('react');
var Router       = require('react-router-component');
var Locations    = Router.Locations;
var Location     = Router.Location;
var HomePage     = require('./pages/home');
var TutorialPage = require('./pages/tutorial');

var Pages = React.createClass({

  render: function() {
    return (
      <Locations path={this.props.path}>
        <Location setTitle={this.props.setTitle} path="/" handler={HomePage} />
        <Location setTitle={this.props.setTitle} path="/tutorials/:name/:id" handler={TutorialPage} />
      </Locations>
    );
  }

});

module.exports = Pages;