/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactMount = require('react/lib/ReactMount');
var Routes     = require('./routes');
var Router     = require('./mixins/Router');
var es5        = require('es5-shim');

var App = React.createClass({

  mixins: [Router, Routes],

  getInitialState: function() {
    return { path: this.getPath(), title: this.getTitle() };
  },

  getTitle: function() {
    return this.matchedPage().handler.originalSpec.title;
  },

  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>{this.state.title}</title>
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <link rel="stylesheet" href="/css/app.css" type="text/css" media="all" />

          <script src="/js/bundle.js"></script>
        </head>

        <body onClick={this.onClickLink}>
          {this.activePage()}
        </body>
      </html>
    );
  }
});

ReactMount.allowFullPageRender = true;
module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}
