/**
 * @jsx React.DOM
 */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <div id="body">
        <header>
          <h1 id="logo">
            <a href="/">Reactor</a>
          </h1>

          <nav id="nav">
            <ul id="nav-list">
              <li><a href="/">Home</a></li>
              <li><a href="/other">Other</a></li>
              <li><a href="">About</a></li>
            </ul>
          </nav>

          <form id="search-form">
            <input id="search-field" type="text" />
          </form>

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