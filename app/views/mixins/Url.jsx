module.exports = {

  baseUrl: function() {
    console.log('mixin props:', this.props);
    var port = this.props.port ? ':' + this.props.port : '';
    return 'http://' + this.props.host + port;
  }

}