/**
 * @jsx React.DOM
 */

var React      = require('react');
var jsPane     = require('../components/jsPane');
var Page       = require('../mixins/page');
var State      = require('../state');
var TouchArea  = require('react-touch/lib/primitives/TouchableArea');

module.exports = React.createClass({

  statics: {
    title: function(data) {
      return data.tutorial.title;
    },

    getData: function(params, cb) {
      Page.get('/api/tutorials/:name/:id', params, function(data) {
        cb({
          tutorial: data[params.id],
          step: params.id,
          width: 300,
          height: 500
        });
      });
    },

    updateData: function(data) {
      // POST updated data to model
    }
  },

  getInitialState: function() {
    return { step: this.props.step, left: 0 };
  },

  componentWillMount: function() {
    if (State.isBrowser) {
      this.scroller = new Scroller(this.handleScroll, {
        snapping: true
      });
    }
  },

  componentDidMount: function() {
    Page.setProps(this.props.parent);

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