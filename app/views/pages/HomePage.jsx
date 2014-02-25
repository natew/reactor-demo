/**
 * @jsx React.DOM
 */

var React      = require('react');
var PageData   = require('../../mixins/PageData');
var Global     = require('../../lib/AppState');

module.exports = React.createClass({

  mixins: [PageData],

  statics: {
    pageTitle: function() {
      return 'Reactor Home';
    },

    getInitialPageState: function(params, cb) {
      PageData.get(Global.rootUrl + '/api/users', cb);
    }
  },

  renderUser: function(user, i) {
    return (
      <li key={i}>
        <a href={"/user/" + user.id.val()}>{user.name.val()}</a>
      </li>
    );
  },

  render: function() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Users</h2>
        <ul id="users">
          {this.state.data.users.map(this.renderUser)}
        </ul>
      </div>
    );
  }

});