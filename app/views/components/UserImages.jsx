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

  render: function() {
    var images = this.props.images;
    // if (!) return <div></div>;

    var fullImage = images[this.state.activeImage].full;

    return (
      <section id="imagery">
        <img src={this.imagePath + fullImage} />

        <ul className="thumbs">
          {images.map(function(image, i) {
            return (
              <li key={i}>
                <a href="#" onMouseEnter={this.changeImage.bind(this, i)}>
                  <img src={this.imagePath + image.thumb} />
                </a>
              </li>
            );
          }.bind(this))}
        </ul>
      </section>
    );
  }

});