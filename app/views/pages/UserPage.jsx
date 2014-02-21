/**
 * @jsx React.DOM
 */

var React      = require('react');
var UserImages = require('../components/UserImages');
var PageData   = require('../mixins/PageData');

module.exports = React.createClass({

  mixins: [PageData],

  model: 'user',

  pageTitle: function(data) {
    return data.name;
  },

  getInitialPageState: function(params, cb) {
    this.fetchPageData('/api/user/' + params.username, cb);
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