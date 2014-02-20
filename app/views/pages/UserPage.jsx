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
          <h2>{this.state.user.val('name')}</h2>
          <p>{this.state.user.val('bio')}</p>
          <UserImages path="/images/" images={this.state.user.val('pictures')} />
        </div>
      );
    }

  })

};

module.exports = Page;