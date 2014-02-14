/**
 * @jsx React.DOM
 */

var React = require('react');

var Page = {

  title: '404 Page',

  component: React.createClass({

    render: function() {
      return (
        <div>
          <h2>Page Not Found!</h2>
          <p>404, yo</p>
        </div>
      );
    }
  })

};

module.exports = Page;