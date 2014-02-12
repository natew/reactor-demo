/**
 * @jsx React.DOM
 */

var React      = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');
var Stage      = require('../components/Stage');
var Form       = require('../components/Form');
var BodyLayout = require('../layouts/Body');
var UrlMixin   = require('../mixins/Url');
var State      = require('../mixins/State');

module.exports = ReactAsync.createClass({

  mixins: [UrlMixin, State],

  title: 'Home Page',

  getInitialStateAsync: function(cb) {
    superagent
      .get('http://localhost:3111/api/item')
      .end(function(err, res) {
        cb(err, res ? res.body : null);
      }.bind(this));
  },

  render: function() {
    return (
      <BodyLayout>
        <h2>Item Page</h2>
        <p>{this.props.path} hello</p>
        <Stage item={this.state.item} />
        <Form />

        <a href="/other">Go to other page</a>
      </BodyLayout>
    );
  }
});