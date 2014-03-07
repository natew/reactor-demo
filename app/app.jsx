/**
 * @jsx React.DOM
 */

var React         = require('react');
var ReactAsync    = require('react-async');
var ReactMount    = require('react/lib/ReactMount');
var Routes        = require('./routes');
var PushState     = require('./mixins/pushState');
var Router        = require('./mixins/router');
var Page          = Router.renderPage;
var Layout        = require('./components/layout');
var State         = require('./state');

Router.setRoutes(Routes);
ReactMount.allowFullPageRender = true;

var App = React.createClass({

  mixins: [ Router, PushState, ReactAsync.Mixin ],

  componentWillMount: function() {
    if (this.props.env === 'production')
      require('react-raf-batching').inject(); // faster in prod
  },

  getInitialStateAsync: function(cb) {
    this.setCurrentRoute(this.props.path);
    this.getStateFromPage(cb);
  },

  routerPageChange: function(cb) {
    this.getStateFromPage(function(err, data) {
      this.setState(err ? {error: err} : data);
      cb();
    }.bind(this));
  },

  getStateFromPage: function(cb) {
    State.rootUrl = State.rootUrl || this.rootUrl();
    var page = this.currentRoute.page;

    if (!page.getInitialPageState) cb(null, {});
    else page.getInitialPageState(this.currentRoute.params, function(data) {
      cb(null, { pageData: data, title: page.head(data) });
    });
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
if (typeof window !== 'undefined') {
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}