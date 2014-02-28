/**
 * @jsx React.DOM
 */

var React      = require('react');
var UserImages = require('../components/user/Images');
var PageData   = require('../../mixins/PageData');
var Global     = require('../../lib/AppState');

module.exports = React.createClass({

  mixins: [PageData],

  statics: {
    head: function(data) {
      return data.name;
    },

    getInitialPageState: function(params, cb) {
      PageData.get(Global.rootUrl + '/api/user/' + params.username, cb);
    }
  },

  render: function() {
    return (
      <div>
        <h2>{this.state.data.name.val()}</h2>
        <p>{this.state.data.bio.val()}</p>
        <UserImages path="/images/" images={this.state.data.pictures} />
      </div>
    );
  }

});