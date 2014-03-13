module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname + '/build/js/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.css/, loader: "style-loader!css-loader" },
      { test: /\.gif/, loader: "url-loader?limit=10000&minetype=image/gif" },
      { test: /\.jpg/, loader: "url-loader?limit=10000&minetype=image/jpg" },
      { test: /\.png/, loader: "url-loader?limit=10000&minetype=image/png" },
      { test: /\.jsx$/, loader: "jsx-loader" }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ['node_modules', 'bower_components']
  }
};