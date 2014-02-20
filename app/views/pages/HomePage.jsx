/**
 * @jsx React.DOM
 */

var React = require('react');

var Page = {

  path: '/api/users',

  title: 'Reactor Home',

  view: React.createClass({

    renderUser: function(user, i) {
      return (
        <li key={i}>
          <a href={"/user/" + user.get('id').getValue()}>{user.get('name').getValue()}</a>
        </li>
      );
    },

    render: function() {
      return (
        <div>
          <h1>Home</h1>
          <h2>Users</h2>
          <ul id="users">
            {this.props.data.get('users').map(this.renderUser)}
          </ul>
        </div>
      );
    }
  })

};

module.exports = Page;