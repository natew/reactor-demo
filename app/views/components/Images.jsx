/**
 * @jsx React.DOM
 */

 var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return { activeImage: 0 };
  },

  imagePath: '/images/',

  changeImage: function(i, e) {
    e.preventDefault();
    this.setState({ activeImage: i });
  },

  createThumb: function(image, i) {
    return (
      <li>
        <a href="#" onMouseEnter={this.changeImage.bind(this, i)}>
          <img src={this.imagePath + image.thumb} />
        </a>
      </li>
    );
  },

  render: function() {
    if (!this.props.item) return <div></div>;

    var item = this.props.item,
        images = item.images,
        fullImage = images[this.state.activeImage].full;

    return (
      <section id="imagery">
        <img src={this.imagePath + fullImage} />

        <ul className="thumbs">
          {images.map(this.createThumb)}
        </ul>
      </section>
    );
  }
});