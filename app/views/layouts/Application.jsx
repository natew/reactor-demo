var React  = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title></title>
          <link rel="stylesheet" href="/css/app.css" type="text/css" media="all" />
        </head>
        <body>
          {this.props.page}
          <script src="/js/app.js"></script>
        </body>
      </html>
    );
  }
});

//       <doctype html />
// <meta charset="utf-8" />
// <meta http-equiv="X-UA-Compatible" content="IE=edge" />
// <meta name="description" content="" />
// <meta name="viewport" content="width=device-width, initial-scale=1" />