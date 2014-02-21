var Router     = require('../../lib/Router');
var Cortex     = require('../../lib/cortex/cortex');
var superagent = require('superagent');
var AppState   = require('../../lib/AppState');

module.exports = {

  componentWillMount: function() {
    this.setPageState(this.props.parent.state.data);
  },

  fetchPageData: function(path, cb) {
    console.log(AppState.get('rootUrl') + path);
    superagent
      .get(AppState.get('rootUrl') + path)
      .end(function(err, res) {
        cb(err, res ? res.body : {});
      });
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
    var state = {};
    console.log('page model is', this.model)
    state[this.model] = this.pageData.get('data');
    this.setState(state);
  }

};