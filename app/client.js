/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactMount = require('react/lib/ReactMount');
var Router     = require('react-router-component');
var HomePage   = require('./views/pages/HomePage');
var OtherPage  = require('./views/pages/OtherPage');

var Pages       = Router.Pages;
var Page        = Router.Page;

ReactMount.allowFullPageRender = true;

var App = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <script src="/js/bundle.js" />
        </head>
        <Pages ref="router" onClick={this.onClick} path={this.props.path}>
          <Page path="/" handler={HomePage} />
          <Page path="/other" handler={OtherPage} />
        </Pages>
      </html>
    );
  },

  onClick: function(e) {
    if (e.target.tagName === 'A' && e.target.attributes.href) {
      e.preventDefault();
      this.refs.router.navigate(e.target.attributes.href.value);
    }
  },

  // // application started
  // componentDidMount: function() {
  //   window.addEventListener('click', this.onClick);
  // },

  // // application will shutdown
  // componentWillUnmount: function() {
  //   window.removeEventListener('click', this.onClick);
  // }
});

module.exports = App;