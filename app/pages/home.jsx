/**
 * @jsx React.DOM
 */

var React = require('react');
var Page = require('../mixins/page');
var State = require('../state');
var Transition = require('react/lib/ReactWithAddons').addons.CSSTransitionGroup;

module.exports = React.createClass({

  mixins: [Page],

  statics: {
    head: function() {
      return 'Reactor Home';
    },

    getInitialPageState: function(params, cb) {
      Page.get(State.rootUrl + '/api/tutorials', cb);
    }
  },

  jsTutorial: function(tutorial, i) {
    return (
      <li key={i}>
        <a href={"/tutorials/js/" + i}>{tutorial.title.val()}</a>
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