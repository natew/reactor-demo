/**
 * @jsx React.DOM
 */

var React      = require('react');
var UserImages = require('../components/UserImages');
var PageData   = require('../mixins/PageData');
var superagent = require('superagent');

Page = {

  mixins: [PageData],

  title: function(data) {
    return data.name;
  },

  getInitialPageState: function(matches, cb) {
    console.log('Router.rootUrl() + path', Router.rootUrl() + path)
    var path = Router.replaceParams('/api/user/:username', matches);

    superagent
      .get(Router.rootUrl() + path)
      .end(function(err, res) {
        cb(err, res ? res.body : {});
      });
  },

  render: function() {
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