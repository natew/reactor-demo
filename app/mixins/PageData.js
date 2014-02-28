var Cortex      = require('cortexjs');
var superagent  = require('superagent');

module.exports = {

  componentWillMount: function() {
    this.setPageState(this.props.parent.state.pageData);
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
    this.setState({ data: this.pageData.data });
  },

  get: function(url, cb) {
    superagent.get(url).end(function(err, res) {
      cb(err, res ? res.body : {});
    });
  }

};