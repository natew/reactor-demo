/**
 * @jsx React.DOM
 */

var React      = require('react');
var UserImages = require('../components/UserImages');
var PageData   = require('../mixins/PageData');

module.exports = React.createClass({

  mixins: [PageData],

  pageTitle: function(data) {
    return data.name;
  },

  getInitialPageState: function(params, cb) {
    this.fetchPageData('/api/user/' + params.username, cb);
  },

  render: function() {
    return (
      <div>
        <h2>{this.state.data.val('name')}</h2>
        <p>{this.state.data.val('bio')}</p>
        <UserImages path="/images/" images={this.state.data.val('pictures')} />
      </div>
    );
  }

});