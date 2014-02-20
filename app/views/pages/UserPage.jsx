/**
 * @jsx React.DOM
 */

var React = require('react');
var UserImages = require('../components/UserImages');
var Router = require('./lib/Router');
var superagent = require('superagent');

Page = {

  title: function(data) {
    return data.name;
  },

  getInitialState: function() {
    return { user: null };
  },

  getInitialPageState: function(matches, cb) {
    var path = Router.replaceParams('/api/user/:username', matches);

    superagent
      .get(Router.rootUrl() + path)
      .end(function(err, res) {
        cb(err, res ? res.body : {});
      });
  },

  render: function() {
    // Set up page data structure
    var pageData = new Cortex(this.state.data, this.updatePageData);

    return (
      <div>
        <h2>{this.state.user.val('name')}</h2>
        <p>{this.state.user.val('bio')}</p>
        <UserImages path="/images/" images={this.state.user.val('pictures')} />
      </div>
    );
  }

};

module.exports.page = Page;
module.exports.view = React.createClass(Page);