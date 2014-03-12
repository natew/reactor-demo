var React      = require('react');
var Reactor    = require('./lib/reactor').inject(React);
var Routes     = require('./routes');
var Layout     = require('./components/layout');

var App = Reactor.createClass({

  routes: Routes,

  render: function(Page) {
    return this.transferPropsTo(
      <Layout onClick={this.navigate} title={this.pageTitle}>
        <Page data={this.pageData} className="page" />
      </Layout>
    );
  }

});

Reactor.browserStart(App)
module.exports = App;