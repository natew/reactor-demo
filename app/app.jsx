/**
 * @jsx React.DOM
 */

var React         = require('react');
var ReactAsync    = require('react-async');
var ReactMount    = require('react/lib/ReactMount');
var routes        = require('./routes');
var pushState     = require('./mixins/pushState');
var Router        = require('./mixins/router');
var Page          = Router.renderPage;
var Layout        = require('./components/layout');
var State         = require('./state');

Router.setRoutes(routes);
ReactMount.allowFullPageRender = true;

var App = React.createClass({

  mixins: [
    Router,
    pushState,
    ReactAsync.Mixin
  ],

  componentWillMount: function() {
    // Sync updates to refresh rate
    if (!this.props.development)
      require('react-raf-batching').inject();
  },

  getInitialStateAsync: function(cb) {
    this.setCurrentRoute(this.props.path);
    this.getStateFromPage(cb);
  },

  routerPageChange: function(cb) {
    this.getStateFromPage(function(err, data) {
      if (!err) this.setState(data);
      cb();
    }.bind(this));
  },

  getStateFromPage: function(cb) {
    State.rootUrl = State.rootUrl || this.rootUrl();
    var route = this.currentRoute;
    var page = route.page;

    if (!page.getInitialPageState) return cb(null, {});

    // Get state from page, set data and head content
    page.getInitialPageState(route.params, function(err, data) {
      cb(err, {
        pageData: data,
        title: page.head(data)
      })
    }.bind(this));
  },

  render: function() {
    return this.transferPropsTo(
      <Layout onClick={this.navigate} title={this.state.title}>
        <Page path={this.props.path} className="page" parent={this} />
      </Layout>
    );
  }

});

module.exports = App;

// Browser initial render
if (typeof window !== 'undefined')
  window.onload = React.renderComponent.bind(App(), document);
