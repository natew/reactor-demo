var React = require('../lib/page');

module.exports = React.createPage({

   title: function() {
     return '404';
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