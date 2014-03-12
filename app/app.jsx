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

// Browser initial render
if (typeof window !== 'undefined') {
  window.React = React;
  window.onload = function() {
    React.renderComponent(App(), document);
  }
}

module.exports = App;