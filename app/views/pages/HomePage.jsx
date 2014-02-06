var React  = require('react');
var Stage  = require('../components/Stage');
var Form   = require('../components/Form');

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },

  fetchData: function(req, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var data = JSON.parse(xhr.responseText);
      cb(null, data);
    };
    xhr.open('get', '/api/item', true);
    xhr.send();
  },

  render: function() {
    return (
      <div>
        <h2>Home Page</h2>
        <Stage item={this.props.request.data.Item} />
        <Form />

        <a href="/other">Go to other page</a>
      </div>
    );
  }
});