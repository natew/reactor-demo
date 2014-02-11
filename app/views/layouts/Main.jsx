/**
 * @jsx React.DOM
 */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    // var children = this.props.children;
    // if (!Array.isArray(children)) children = [children];

    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title></title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="stylesheet" href="/css/app.css" type="text/css" media="all" />

          <script src="/js/bundle.js"></script>
        </head>

        <body>
          <header>
            <h1 id="logo">
              <a href="/">Reactor</a>
            </h1>

            <form id="search-form">
              <input id="search-field" type="text" />
            </form>

            <nav id="nav">
              <ul id="nav-list">
                <li><a href="/">Home</a></li>
                <li><a href="/other">Other</a></li>
                <li><a href="">About</a></li>
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
        </body>
      </html>
    );
  }
});