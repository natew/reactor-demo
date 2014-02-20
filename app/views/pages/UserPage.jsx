/**
 * @jsx React.DOM
 */

var React = require('react');
var UserImages = require('../components/UserImages');

Page = {

  path: '/api/user/:username',

  title: function(data) {
    return data.name;
  },

  view: React.createClass({

    getInitialState: function() {
      return { user: this.props.data };
    },

    render: function() {
      return (
        <div>
          <h2>{this.state.user.get('name').getValue()}</h2>
          <p>{this.state.user.get('bio').getValue()}</p>
          <UserImages images={this.state.user.get('pictures').getValue()} />
        </div>
      );
    }

  })

};

module.exports = Page;