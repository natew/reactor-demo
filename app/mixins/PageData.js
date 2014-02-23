var Cortex     = require('../lib/cortex/cortex');
var superagent = require('superagent');

module.exports = {

  componentWillMount: function() {
    this.setPageState(this.props.parent.state.data);
  },

  setPageData: function(data, cb) {
    cb(null, data);
  },

  setPageState: function(data) {
    // Set up page data structure from parent
    this.pageData = new Cortex({data: data}, this.updatePageData);
    this.updatePageState();
  },

  updatePageData: function() {
    this.updatePageState();
    // TODO: send updated data to model
  },

  updatePageState: function() {
    this.setState({ data: this.pageData.get('data') });
  }

};