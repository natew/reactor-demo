/**
 * @jsx React.DOM
 */

var React = require('react');
var Page  = require('../mixins/page');

module.exports = React.createClass({

  statics: {
    title: 'Reactor Home',
    state: Page.get('/api/tutorials')
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
          {this.props.data.tutorials.js.map(this.jsTutorial)}
        </ul>
      </div>
    );
  }

});