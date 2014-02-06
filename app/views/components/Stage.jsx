var React  = require('react');
var Images = require('./Images.jsx');

var Stage = React.createClass({
  render: function() {
    if (!this.props.item) return <div></div>;
    var item = this.props.item;

    return (
      <section id="stage">
        <div id="title">
          <h1>
            <a className="name" href="#">{item.title}</a>
          </h1>
        </div>

        <Images item={item} />
      </section>
    );
  }
});

module.exports = Stage;