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
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {this.props.head}
          <link rel="stylesheet" href="/css/app.css" type="text/css" media="all" />
          <script src="/js/bundle.js"></script>
        </head>
        <body onClick={this.props.onClick}>
          <a href="/">Home</a>
          {this.props.children}
        </body>
      </html>
    );
  }

});