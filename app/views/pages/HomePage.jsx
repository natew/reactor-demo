/**
 * @jsx React.DOM
 */

var React    = require('react');
var PageData = require('../mixins/PageData');

module.exports = React.createClass({

  mixins: [PageData],

  title: function() {
    return 'Reactor Home';
  },

  getInitialPageState: function(params, cb) {
    this.fetchPageData('/api/users', 'users', cb);
  },

  renderUser: function(user, i) {
    return (
      <li key={i}>
        <a href={"/user/" + user.val('id')}>{user.val('name')}</a>
      </li>
    );
  },

  render: function() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Users</h2>
        <ul id="users">
          {this.state.users.map(this.renderUser)}
        </ul>
      </div>
    );
  }

});