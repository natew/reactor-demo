/** @jsx React.DOM */
var React      = require('react');
var Reactor    = require('reactor-core').inject(React);
var Routes     = require('./routes');
var Layout     = require('./components/layout');
var Cortex     = require('cortexjs');

// class Monster {
//   constructor(x, y) {
//     this.x = x;
//   }
// }

var App = Reactor.createClass({

  routes: Routes,

  updatePageData: function(data) {
    // TODO: POST changed back to API
  },

  render: function(Page) {
    var cortexData = new Cortex(this.state.pageData, this.updatePageData);

    return this.transferPropsTo(
      <Layout onClick={this.navigate} title={this.state.title}>
        <Page data={cortexData} className="page" />
      </Layout>
    );
  }

});

Reactor.browserStart(App);
module.exports = App;