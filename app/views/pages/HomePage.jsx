var React  = require('react');
var Stage  = require('../components/Stage');
var Form   = require('../components/Form');
var $      = require('jquery');

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    $.get('/api/item', function(data) {
      this.setState(data);
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <h2>Home Page</h2>
        <Stage item={this.state.Item} />
        <Form />
      </div>
    );
  }
});