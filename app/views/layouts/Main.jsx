/**
 * @jsx React.DOM
 */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    var children = this.props.children;
    if (!Array.isArray(children)) children = [children];

    return (
      <div className="container">
        <header>
          <h1 id="logo">
            <a href="">Reactor</a>
          </h1>

          <form id="search-form">
            <input id="search-field" type="text" />
          </form>

          <nav id="nav">
            <ul id="nav-list">
              <li><a href="#">Home</a></li>
              <li><a href="#">Other</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </nav>

          <h2 id="callout">React example app</h2>

          <ul id="user-nav" className="secondary">
            <li><a href="">Login</a></li>
            <li><a href="">Signup</a></li>
          </ul>
        </header>

        <div id="theater">
          {this.props.children}
        </div>
      </div>
    );
  }
});