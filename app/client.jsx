/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactAsync = require('react-async');
var ReactMount = require('react/lib/ReactMount');
var Navigator  = require('./mixins/Navigator');
var es5        = require('es5-shim');
var HomePage   = require('./views/pages/HomePage');
var OtherPage  = require('./views/pages/OtherPage');
var HTMLLayout = require('./views/layouts/HTML');
var http       = require('superagent');

var App = ReactAsync.createClass({

  mixins: [Navigator],

  routes: {
    '/':      HomePage,
    '/other': OtherPage
  },

  getInitialStateAsync: function(cb) {
    this.getDataForRoute(this.props.path, cb);
  },

  getDataForRoute: function(path, cb) {
    var controller = this.routes[path];

    if (!controller.dataSource) {
      cb(null, {
        path: this._path(),
        title: controller.title
      });
    }
    else {
      http
        .get(this._rootUrl() + controller.dataSource)
        .end(function(err, res) {
          var data = res ? res.body : null;
          cb(err, {
            path: this._path(),
            data: data,
            title: data.item.title || controller.title
          });
        }.bind(this));
    }
  },

  render: function() {
    var component = this.routes[this.state.path].component;

    return (
      <HTMLLayout title={this.state.title} onClick={this._onClick}>
        {component({ data: this.state.data })}
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
