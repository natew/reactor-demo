var React      = require('react');
var ReactAsync = require('react-async');
var Stage      = require('../components/Stage');
var Form       = require('../components/Form');
var superagent = require('superagent');

module.exports = ReactAsync.createClass({

  getInitialStateAsync: function(cb) {
    superagent.get('/api/item', function(err, res) {
      cb(err, res ? res.body : null);
    });
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