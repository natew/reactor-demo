var React  = require('react');
var Stage  = require('./Stage');
var Form   = require('./Form');

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
        <Stage item={this.state.Item} />
        <Form />
      </div>
    );
  }
});