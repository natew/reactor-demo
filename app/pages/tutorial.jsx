/** @jsx React.DOM */
var React      = require('react');
var jsPane     = require('../components/jsPane');
// var TouchArea  = require('react-touch/lib/primitives/TouchableArea');

module.exports = React.createPageClass({

  fetch: '/api/tutorials/:name/:id',

  getInitialProps: function(data, params) {
    return {
      tutorial: data[params.id],
      step: params.id,
      width: 300,
      height: 500
    }
  },

  title: function(data) {
    return data.tutorial.title;
  },

  update: function(data) {
  },

  getInitialState: function() {
    return { step: this.props.step, left: 0 };
  },

  componentWillMount: function() {
    if (React.isBrowser) {
      this.scroller = new Scroller(this.handleScroll, {
        snapping: true
      });
    }
  },

  componentDidMount: function() {
    // Page.setProps(this.props.parent);

    this.scroller.setDimensions(
      this.props.data.width,
      this.props.data.height,
      this.props.data.width * this.props.data.tutorial.images.length,
      this.props.data.height
    );
    this.scroller.setSnapSize(this.props.data.width, this.props.data.height);
  },

  handleScroll: function() {

  },

  render: function() {
    var tutorial = this.props.data.tutorial;

    return (
      <div>
        <h2>{tutorial.title.val()}</h2>
        <p>{tutorial.description.val()}</p>
      </div>
    );
  }

});