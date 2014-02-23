/**
 * @jsx React.DOM
 */

var React      = require('react');
var PageData   = require('../../mixins/PageData');
var superagent = require('superagent');
var Global     = require('../../lib/AppState');

module.exports = React.createClass({

  mixins: [PageData],

  statics: {
    pageTitle: function() {
      return 'Reactor Home';
    },

    getInitialPageState: function(params, cb) {
      superagent
        .get(Global.rootUrl + '/api/users')
        .end(function(err, res) {
          cb(err, res ? res.body : {});
        });
    }
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
          {this.state.data.get('users').map(this.renderUser)}
        </ul>
      </div>
    );
  }

});