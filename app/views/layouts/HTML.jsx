/**
 * @jsx React.DOM
 */

var React     = require('react');
var es5       = require('es5-shim');
var invariant = require('react/lib/invariant');
var pattern   = require('url-pattern');

module.exports = React.createClass({

  navigate: function(path, cb) {
    window.history.pushState({}, '', path);
    this.setState({path: window.location.pathname}, cb);
  },

  componentDidMount: function() {
    window.addEventListener('popstate', this.onPopState);
  },

  componentWillUnmount: function() {
    window.removeEventListener('popstate', this.onPopState);
  },

  onPopState: function(e) {
    var path = window.location.pathname;

    if (this.state.path !== path) {
      this.setState({path: path});
    }
  },

  getActivePage: function() {
    var match, page, notFound;
    var children = this.props.children;

    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach(function(child) {

      if (child.path) {
        child.pattern = child.pattern || pattern(child.path);
        if (!page) {
          match = child.pattern.match(this.props.path);
          if (match) {
            page = child;
          }
        }
      }

      if (!notFound && child.path === null) {
        notFound = child;
      }

    }.bind(this));

    return page ? page.handler(match) :
            notFound ? notFound.handler(match) :
            [];
  },

  onClick: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();
    this.refs.router.navigate(e.target.attributes.href.value);
  },

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

        <body ref="body" onClick={this.onClick}>
          {this.getActivePage()}
        </body>
      </html>
    );
  }
});