var React  = require('react');
var Images = require('./Images');

var Stage = React.createClass({
  render: function() {
    if (!this.props.product) return <div></div>;
    var product = this.props.product;

    return (
      <section id="stage">
        <div id="title">
          <h1>
            <a className="name" href="#">{product.title}</a>
          </h1>

          <span className="rating five-stars">10 reviews</span>
        </div>

        <Images product={product} />
      </section>
    );
  }
});

module.exports = Stage;