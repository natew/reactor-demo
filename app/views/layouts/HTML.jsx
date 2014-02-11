/**
 * @jsx React.DOM
 */

var React = require('react');
var es5   = require('es5-shim');

module.exports = React.createClass({

  getInitialState: function() {
    return { title: '' };
  },

  componentDidMount: function() {
    var pages = this.props.children.props.children;
    var activePage = pages.filter(this.findActiveChild)[0];
    this.setState({ title: activePage.title });
  },

  findActiveChild: function(child) {
    return child.path === this.props.children.state.path;
  },

  render: function() {
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>{this.state.title}</title>
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