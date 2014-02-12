/**
 * @jsx React.DOM
 */

var React  = require('react');
var HTMLLayout = require('../layouts/HTML');
var Routes     = require('../../routes');
var Router     = require('../../mixins/Router');

module.exports = React.createClass({

  getInitialState: function() {
    return { title: 'Other Page' };
  },

  render: function() {
    return this.transferPropsTo(
      <HTMLLayout title={this.state.title}>
        <h2>Other Page</h2>
        <p>
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <a href="/">Go to home page</a>
      </HTMLLayout>
    );
  }
});