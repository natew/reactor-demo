var pattern = require('url-pattern');

module.exports = {

  componentWillMount: function() {
    this.rootUrl = this.getRootUrl();
  },

  componentDidMount: function() {
    window.addEventListener('popstate', this._onPopState);
  },

  componentWillUnmount: function() {
    window.removeEventListener('popstate', this._onPopState);
  },

  navigate: function(e) {
    if (e.target.tagName !== 'A' || !e.target.attributes.href) return;
    e.preventDefault();

    var path = e.target.attributes.href.value;
    window.history.pushState({}, '', path);
    this.callback(path);
  },

  getRootUrl: function() {
    try {      var protocol = (this.props.protocol || window.location.protocol) + '//' }
    catch(e) { var protocol = 'http://' };
    var port = this.props.port ? ':' + this.props.port : '';
    var host = this.props.host || window.location.host;
    return protocol + host + port;
  },

  _onPopState: function(e) {
    var path = window.location.pathname;

    if (this.state.path !== path) {
      this.setState({path: path});
      this.callback(path);
    }
  },

  callback: function(path) {
    if (typeof this.onNavigate === 'function')
      this.onNavigate(path);
  }

};