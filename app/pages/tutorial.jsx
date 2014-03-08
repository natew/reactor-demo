/**
 * @jsx React.DOM
 */

var React      = require('react');
var jsPane     = require('../components/jsPane');
var Page       = require('../mixins/page');
var State      = require('../state');
var TouchArea  = require('react-touch/lib/primitives/TouchableArea');

module.exports = React.createClass({

  mixins: [Page],

  statics: {
    head: function(data) {
      console.log(data)
      return data.tutorial.title;
    },

    getPageProps: function(params, setProps) {
      var url = '/api/tutorials/' + params.name
        + (params.id ? '/' + params.id : '');

      Page.get(url, function(data) {
        setProps({
          tutorial: data[params.id],
          step: params.id,
          width: 300,
          height: 500
        });
      });
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
    console.log('got', this.props.data)
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