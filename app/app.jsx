/** @jsx React.DOM */
var React      = require('react');
var Reactor    = require('reactor-core').inject(React);
var Routes     = require('./routes');
var Layout     = require('./components/layout');
var Sugar      = require('./vendor/sugar.js');
var Cortex     = require('cortexjs');
// var ReactBatch = require('react-raf-batching');

var App = Reactor.createClass({

  routes: Routes,

  componentWillMount: function() {
    // Batch UI updates to framerate in production
    // if (!this.props.debug && this.props.env === 'production')
    //   ReactBatch.inject();
  },

  updatePageData: function(data) {
    console.log('got new stuff', data);
    // TODO: POST changed back to API
    // re-render?
  },

  render: function(Page, data) {
    var cortexData = new Cortex(data, this.updatePageData);

    return this.transferPropsTo(
      <Layout onClick={this.navigate} title={this.state.title}>
        <Page data={cortexData} className="page" />
      </Layout>
    );
  }

});

Reactor.browserStart(App);
module.exports = App;