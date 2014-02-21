var Router = require('../../lib/Router');

module.exports = {

  componentWillMount: function() {
    // Set up page data structure
    // this.pageData = new Cortex(this.params.data, this.updatePageData);
  },

  updatePageData: function() {
    Router.currentPage.setProps({ data: this.pageData });
    // TODO: send updated data to model
  }

};