/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactMount = require('react/lib/ReactMount');
var Routes     = require('./routes');
var es5       = require('es5-shim');
var invariant = require('react/lib/invariant');
var pattern   = require('url-pattern');

var App = React.createClass({

  mixins: [Routes],

  getInitialState: function() {
    return {
      path: this.props.path || window.location.pathname,
      title: ''
    };
  },

  navigate: function(path, cb) {
    window.history.pushState({}, '', path);
    this.setState({ path: window.location.pathname }, cb);
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

    this.locations.forEach(function(loc) {
      if (loc.path) {
        loc.pattern = loc.pattern || pattern(loc.path);
        if (!page) {
          match = loc.pattern.match(this.state.path);
          if (match) page = loc;
        }
      }

      if (!notFound && loc.path === null)
        notFound = loc;
    }.bind(this));

    return page ? page.handler(match) :
            notFound ? notFound.handler(match) :
            [];
  },

  onClick: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();
    this.navigate(e.target.attributes.href.value);
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

        <body ref="body" onClick={this.onClick} path={this.state.path}>
          {this.getActivePage()}
        </body>
      </html>
    );
  }
});

// ReactMount.allowFullPageRender = true;
module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}
