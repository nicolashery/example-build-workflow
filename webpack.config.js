var _ = require('lodash');

var files = require('./files');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif'},
      {test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg'},
      {test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png'},
      {test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.eot/, loader: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject'},
      {test: /\.woff/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf/, loader: 'url-loader?limit=10000&mimetype=application/x-font-ttf'},
      {test: /\.js$/, loader: 'jsx-loader'},
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  externals: _.reduce(files.vendor, function(acc, vendor) {
    return _.assign(acc, vendor.shim);
  }, {})
};
