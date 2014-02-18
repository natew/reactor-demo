/**
 * @jsx React.DOM
 */

var React       = require('react');
var ReactAsync  = require('react-async');
var ReactMount  = require('react/lib/ReactMount');
var Batch       = require('react-raf-batching').inject();
var Router      = require('./mixins/Router');
var routes      = require('./routes');
var Navigator   = require('./mixins/Navigator');
var HTMLLayout  = require('./views/layouts/HTML');
var superagent  = require('superagent');

var App = ReactAsync.createClass({

  mixins: [Navigator],

  componentWillMount: function() {
    Router.setRoutes(routes);
  },

  getInitialStateAsync: function(cb) {
    var page = Router.getPage(this.props.path);

    this.setStateFromPage(page, function(err, data) {
      cb(err, {
        data: data,
        path: this.props.path,
        title: this.getTitleFromPage(page, data)
      });
    }.bind(this));
  },

  onNavigate: function(path) {
    this.props.path = path;
    this.componentDidMount(); // to react-async
  },

  setStateFromPage: function(page, cb) {
    if (!page.path) cb();

    superagent
      .get(this.rootUrl + page.path) // + this.url.params
      .end(function(err, res) {
        page.data = res ? res.body : {};
        cb(err, page.data);
      }.bind(this));
  },

  getTitleFromPage: function(page, data) {
    return page.getTitle ? page.getTitle(data) : page.title || '';
  },

  renderPage: function(path) {
    var route = Router.getRoute(path);
    return route.page.view({
      params: route.match,
      data: this.state.data
    });
  },

  render: function() {
    return (
      <HTMLLayout title={this.state.title} onClick={this.navigate}>
        {this.renderPage(this.state.path)}
      </HTMLLayout>
    );
  }

});

ReactMount.allowFullPageRender = true;
module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    ReactAsync.renderComponent(App(), document);
  }
}
