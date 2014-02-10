var React      = require('react');
var ReactAsync = require('react-async');
var Stage      = require('../components/Stage');
var Form       = require('../components/Form');
// var http   = require('requ');

module.exports = ReactAsync.createClass({
  getInitialStateAsync: function(cb) {
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
        <Stage item={this.state.data.Item} />
        <Form />

        <a href="/other">Go to other page</a>
      </div>
    );
  }
});