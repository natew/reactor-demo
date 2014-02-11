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
          <title>{this.props.title}</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="stylesheet" href="/css/app.css" type="text/css" media="all" />

          <script src="/js/bundle.js"></script>
        </head>

        {this.props.children}
      </html>
    );
  }
});