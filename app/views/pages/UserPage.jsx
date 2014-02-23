/**
 * @jsx React.DOM
 */

var React      = require('react');
var UserImages = require('../components/user/Images');
var PageData   = require('../../mixins/PageData');
var superagent = require('superagent');
var Global     = require('../../lib/AppState');

module.exports = React.createClass({

  mixins: [PageData],

  statics: {
    pageTitle: function(data) {
      return data.name;
    },

    getInitialPageState: function(params, cb) {
      PageData.get(Global.rootUrl + '/api/user/' + params.username, cb);
    }
  },

  render: function() {
    return (
      <div>
        <h2>{this.state.data.name.getValue()}</h2>
        <p>{this.state.data.bio.getValue()}</p>
        <UserImages path="/images/" images={this.state.data.pictures} />
      </div>
    );
  }

});