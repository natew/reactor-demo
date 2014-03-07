/**
 * @jsx React.DOM
 */

 var React = require('react');

 module.exports = React.createClass({

   statics: {
     head: function() {
       return '404';
     }
   },

   render: function() {
     return (
       <div>
         <h2>Page Not Found!</h2>
         <p>404, yo</p>
       </div>
     );
   }

 });