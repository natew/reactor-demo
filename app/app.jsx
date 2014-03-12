var React      = require('./lib/page');
var ReactAsync = require('react-async');
var ReactMount = require('react/lib/ReactMount');
var Routes     = require('./routes');
var PushState  = require('./lib/mixins/pushState');
var Router     = require('./lib/mixins/router');
var Layout     = require('./components/layout');
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

  getStateFromPage: function(cb) {
    React.setStateFromPage(this.rootUrl(), this.route, cb);
  },

  render: function() {
    var ActivePage = this.route.page;
    var pageData = new Cortex(this.state.pageData, ActivePage.updateData);

    return this.transferPropsTo(
      <Layout onClick={this.navigate} title={this.state.title}>
        <ActivePage data={pageData} className="page" />
      </Layout>
    );
  }

});

module.exports = App;

// Browser initial render
if (typeof window !== 'undefined') {
  window.React = React;
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}