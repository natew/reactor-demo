/**
 * @jsx React.DOM
 */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>{this.props.title}</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="stylesheet" href="/css/app.css" type="text/css" media="all" />

          <script src="/js/bundle.js"></script>
        </head>

        <body onClick={this.props.onClick}>
          <div id="body">
            <header>
              <h1 id="logo">
                <a href="/">reactor</a>
              </h1>

              <nav id="nav">
                <ul id="nav-list">
                  <li><a href="/">home</a></li>
                </ul>
              </nav>

              <form id="search-form">
                <input id="search-field" type="text" />
              </form>

              <ul id="user-nav" className="secondary">
                <li><a href="http://github.com/natew/reactor">github</a></li>
              </ul>
            </header>

            <div id="theater">
              {this.props.children}
            </div>
          </div>
        </body>
      </html>
    );
  }
});