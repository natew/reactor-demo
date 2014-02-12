/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactMount = require('react/lib/ReactMount');
var HTMLLayout = require('./views/layouts/HTML');
var Routes     = require('./routes');

ReactMount.allowFullPageRender = true;

var App = React.createClass({

  mixins: [Routes],

  render: function() {
    return (
      <HTMLLayout path={this.props.path}>
        {this.locations}
      </HTMLLayout>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    // React.renderComponent(App(), document);
  }
}
