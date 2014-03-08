/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync = require('react-async');
var Page = require('../mixins/page');
var Transition = require('react/lib/ReactWithAddons').addons.CSSTransitionGroup;
var ReactAsync = require('react-async');

module.exports = React.createClass({

  mixins: [ ReactAsync.Mixin ],

  getInitialStateAsync: function(cb) {
    Page.get('/api/tutorials', function(err, data) {
      this.props.setTitle('Test Title');
      cb(err, data);
    }.bind(this));
  },

  jsTutorial: function(tutorial, i) {
    return (
      <li key={i}>
        <a href={"/tutorials/js/" + i}>{tutorial.title}</a>
      </li>
    );
  },

  render: function() {
    return (
      <div>
        <h1>Home</h1>
        <h2>tutorials</h2>
        <ul id="tutorials">
          {this.state.tutorials.js.map(this.jsTutorial)}
        </ul>
      </div>
    );
  }

});