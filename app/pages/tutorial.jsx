/**
 * @jsx React.DOM
 */

var React      = require('react');
var jsPane     = require('../components/jsPane');
var Page       = require('../mixins/page');
var State      = require('../state');

module.exports = React.createClass({

  mixins: [Page],

  statics: {
    head: function(data) {
      return data.name;
    },

    getInitialPageState: function(params, cb) {
      Page.get(State.rootUrl + '/api/user/' + params.username, cb);
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