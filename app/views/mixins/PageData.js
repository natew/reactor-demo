module.exports = {

  componentWillMount: function() {
    // Set up page data structure
    var pageData = new Cortex(this.params.data, this.updatePageData);
  },

  updatePageData: function() {
    Router.currentPage.setProps({ data: this.pageCortex });
    // TODO: send updated data to model
  }

};