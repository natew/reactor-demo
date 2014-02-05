var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return { activeImage: 0 };
  },

  changeImage: function(i, e) {
    e.preventDefault();
    this.setState({ activeImage: i });
  },

  createThumb: function(image, i) {
    return (
      <li>
        <a href="#" onMouseEnter={this.changeImage.bind(this, i)}>
          <img src={image.path} />
        </a>
      </li>
    );
  },

  render: function() {
    if (!this.props.product) return <div></div>;

    var product = this.props.product,
        shownStyle = product.shownStyle,
        images = product.images[shownStyle];

    var createThumb = this.createThumb.bind(this);

    return (
      <section id="imagery">
        <img className="actor" src={images[this.state.activeImage].link} />

        <ul className="thumbs">
          {images.map(createThumb)}
        </ul>
      </section>
    );
  }
});