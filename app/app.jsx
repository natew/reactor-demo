/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactAsync = require('react-async');
var ReactMount = require('react/lib/ReactMount');
var Layout     = require('./components/layout');
var Pages      = require('./pages');
var State      = require('./state');

ReactMount.allowFullPageRender = true;

var App = React.createClass({

  getInitialState: function() {
    State.rootUrl = this.rootUrl();
    return { title: '' };
  },

  rootUrl: function() {
    try {      var protocol = (this.props.protocol || window.location.protocol) + '//' }
    catch(e) { var protocol = 'http://' };
    var port = this.props.port ? ':' + this.props.port : '';
    var host = this.props.host || window.location.host;
    var url = protocol + host + port;
    return url;
  },

  componentWillMount: function() {
    State.rootUrl = this.rootUrl();
    if (this.props.env === 'production')
      require('react-raf-batching').inject(); // faster in prod
  },

  setTitle: function(title) {
    if (this.props.title !== title)
      this.setProps({ title: title });
  },

  render: function() {
    return this.transferPropsTo(
      <Layout onClick={this.navigate}>
        <Pages setTitle={this.setTitle} path={this.props.path} />
      </Layout>
    );
  }

});

module.exports = App;

// Browser initial render
if (typeof window !== 'undefined') {
  State.isBrowser = true;
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}