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
      console.log(data);
      return data.title;
    },

    getInitialPageState: function(params, cb) {
      var url = State.rootUrl + '/api/tutorials/' + params.name;
      if (params.step) url += '/' + params.step + '/' + params.num;
      Page.get(url, cb);
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