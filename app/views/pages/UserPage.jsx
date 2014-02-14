/**
 * @jsx React.DOM
 */

var React = require('react');
var UserImages = require('../components/UserImages');

var Page = {

  data: '/api/user',

  title: function(data) {
    return data.name;
  },

  component: React.createClass({

    getInitialState: function() {
      return { user: this.props.data.users[this.props.params.username] };
    },

    render: function() {
      return (
        <div>
          <h2>{this.state.user.name}</h2>
          <p>{this.state.user.bio}</p>
          <UserImages images={this.state.user.pictures} />
        </div>
      );
    }
  })

};

module.exports = Page;