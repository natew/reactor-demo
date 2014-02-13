/**
 * @jsx React.DOM
 */

var React      = require('react');
var Stage      = require('../components/Stage');
var Form       = require('../components/Form');

var Controller = {

  data: '/api/item',

  title: function(data) {
    return data.item.title;
  },

  component: React.createClass({

    getInitialState: function() {
      return { item: this.props.data.item };
    },

    render: function() {
      return (
        <div>
          <Stage item={this.state.item} />
          <Form />
          <a href="/other">Go to other page</a>
        </div>
      );
    }
  })

};

module.exports = Controller;