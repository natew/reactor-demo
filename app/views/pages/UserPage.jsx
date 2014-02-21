/**
 * @jsx React.DOM
 */

var React      = require('react');
var UserImages = require('../components/UserImages');
var PageData   = require('../mixins/PageData');
var AppState   = require('../../lib/AppState');
var superagent = require('superagent');

module.exports = React.createClass({

  mixins: [PageData],

  componentWillMount: function() {
    this.setPageState('user', this.props.parent.state.data);
  },

  title: function(data) {
    return data.name;
  },

  getInitialPageState: function(params, cb) {
    superagent
      .get(AppState.get('rootUrl') + '/api/user/' + params.username)
      .end(function(err, res) {
        cb(err, res ? res.body : {});
      });
  },

  render: function() {
    console.log(this.state)
    return (
      <div>
        <h2>{this.state.user.val('name')}</h2>
        <p>{this.state.user.val('bio')}</p>
        <UserImages path="/images/" images={this.state.user.val('pictures')} />
      </div>
    );
  }

});