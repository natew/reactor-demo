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
          <a href={"/user/" + user.id}>{user.name}</a>
        </li>
      );
    },

    render: function() {
      console.log(this.props)
      return (
        <div>
          <h1>Home</h1>
          <h2>Users</h2>
          <ul id="users">
            {this.props.data.users.map(this.renderUser)}
          </ul>
        </div>
      );
    }
  })

};

module.exports = Page;