module.exports = {

  _root: function() {
    var port = this.props.port ? ':' + this.props.port : '';
    return 'http://' + this.props.host + port;
  }

}