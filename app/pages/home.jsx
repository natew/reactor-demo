/** @jsx React.DOM */
var React = require('react');

module.exports = React.createPageClass({

  fetch: '/api/tutorials',

  title: 'Reactor Home',

  getInitialState: function() {
    return { tutorials: this.props.data.tutorials.val() };
  },

  jsTutorial: function(tutorial, i) {
    return (
      <li key={i}>
        <a href={"/tutorials/js/" + i}>{tutorial.title}</a>
      </li>
    );
  },

  addItem: function() {
    var js = this.state.tutorials.js;
    js.push(js.last());
    this.props.data.tutorials.js.set(js);
    this.setState({ tutorials: this.state.tutorials });
  },

  render: function() {
    return (
      <div>
        <h1>Home</h1>
        <h2>tutorials</h2>
        <ul id="tutorials">
          {this.state.tutorials.js.map(this.jsTutorial)}
        </ul>
        <button onClick={this.addItem}>Clone Tutorial</button>
      </div>
    );
  }

});