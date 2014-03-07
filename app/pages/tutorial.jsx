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
      return data.title;
    },

    getInitialPageState: function(params, cb) {
      var url = State.rootUrl + '/api/tutorials/' + params.name;
      if (params.id) url += '/' + params.id;
      Page.get(url, function(data) {
        cb({ tutorial: data, step: params.id });
      });
    }
  },

  render: function() {
    var tutorial = this.state.tutorial[this.state.step.val()];

    return (
      <div>
        <h2>{tutorial.title.val()}</h2>
        <p>{tutorial.description.val()}</p>
      </div>
    );
  }

});