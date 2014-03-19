/** @jsx React.DOM */
var React    = require('react');
var Reactor  = require('reactor-core').inject(React);
var Routes   = require('./routes');
var Layout   = require('./components/layout');
var Sugar    = require('./vendor/sugar.js');
var Pages    = require('./pages/' + /^\.\/.*\.js$/ + '.js');

var App = Reactor.createClass({

  pages: Pages,

  statics: {
    gss_worker: "/bower/gss/dist/worker.js"
  },

  updatePageData: function(data) {
    console.log('got new stuff', data);
    // TODO: POST changed back to API
  },

  render: function(Page, data) {
    return this.transferPropsTo(
      <Layout onClick={this.navigate} title={this.state.title}>
        <Page data={data} className="page" />
      </Layout>
    );
  }

});

Reactor.browserStart(App);
module.exports = App;