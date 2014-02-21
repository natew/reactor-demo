var Router = require('../../lib/Router');
var Cortex = require('../../lib/cortex/cortex');

module.exports = {

  setPageState: function(key, data) {
    // Set up page data structure from parent
    this.pageDataKey = key;
    this.pageData = new Cortex(data, this.updatePageData);
    this.updatePageState();
  },

  updatePageData: function() {
    this.updatePageState();
    // TODO: send updated data to model
  },

  updatePageState: function() {
    var state = {};
    state[this.pageDataKey] = this.pageData.get(this.pageDataKey);
    this.setState(state);
  }

};