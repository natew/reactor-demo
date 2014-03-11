/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactAsync = require('react-async');
var ReactMount = require('react/lib/ReactMount');
var Routes     = require('./routes');
var PushState  = require('./mixins/pushState');
var Router     = require('./mixins/router');
var Layout     = require('./components/layout');
var Page       = require('./mixins/page');
var State      = require('./state');
var Cortex     = require('cortexjs');

Router.setRoutes(Routes);
ReactMount.allowFullPageRender = true;

var App = React.createClass({

  mixins: [
    Router,
    PushState,
    ReactAsync.Mixin
  ],

  componentWillMount: function() {
    this.setRoute(this.props.path);
    if (this.props.env === 'production')
      require('react-raf-batching').inject(); // faster in prod
  },

  getInitialStateAsync: function(cb) {
    this.setRoute(this.props.path);
    this.getStateFromPage(cb);
  },

  routerPageChange: function(cb) {
    this.getStateFromPage(function(err, data) {
      cb(this.setState(err ? {error: err} : data));
    }.bind(this));
  },

  setRootUrl: function() {
    if (State.rootUrl) return;
    State.rootUrl = this.rootUrl();
    Page.init({ rootUrl: State.rootUrl });
  },

  getStateFromPage: function(cb) {
    this.setRootUrl();
    var page = this.route.page;
    if (!page.getData) cb(null, {});
    else page.getData(this.route.params, function(data) {
      cb(null, { pageData: data, title: page.title(data) });
    });
  },

  render: function() {
    var Page = this.route.page;
    var data = new Cortex(this.state.pageData, Page.updateData);

    return this.transferPropsTo(
      <Layout onClick={this.navigate} title={this.state.title}>
        <Page data={data} className="page" />
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