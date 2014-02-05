var React             = require('react');
var createController  = require('react-app-controller');
var HomePage          = require('./HomePage');

var controller = createController({

  // provide route table, route syntax is similar to express
  routes: {
    '/': HomePage,
    '/about': HomePage,
    '/user/:username': HomePage
  },

  render: function() {
    return (
      <html>
        <head>
          <script src="/js/app.js"></script>
        </head>
        <body>
          <h1>Some common markup</h1>
          {this.state.page}
        </body>
      </html>
    );
  },

  onClick: function(e) {
    if (e.target.tagName === 'A' && e.target.attributes.href) {
      e.preventDefault();
      this.navigate(e.target.attributes.href.value);
    }
  },

  // application started
  componentDidMount: function() {
    window.addEventListener('click', this.onClick);
  },

  // application will shutdown
  componentWillUnmount: function() {
    window.removeEventListener('click', this.onClick);
  }
});

module.exports = controller;