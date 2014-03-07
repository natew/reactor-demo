var Cortex      = require('cortexjs');
var superagent  = require('superagent');

module.exports = {

  cache: {},

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
    this.setState(this.pageData.data);
  },

  get: function(url, cb) {
    var cache = this.cache;
    if (cache[url]) cb(cache[url]);
    superagent.get(url).end(function(err, res) {
      if (!err && res) {
        cache[url] = res;
        cb(res.body);
      }
      else cb({error: err});
    });
  }

};