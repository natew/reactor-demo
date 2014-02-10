/**
 * @jsx React.DOM
 */

 var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <section id="item">
        <form>
          <select>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </select>

          <input className="btn-positive" type="submit" value="Submit" />
          <input className="btn-neutral" type="submit" value="Cancel" />
        </form>
      </section>
    );
  }
});