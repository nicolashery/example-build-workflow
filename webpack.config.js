module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.gif/, loader: 'url-loader?limit=10000&minetype=image/gif'},
      {test: /\.jpg/, loader: 'url-loader?limit=10000&minetype=image/jpg'},
      {test: /\.png/, loader: 'url-loader?limit=10000&minetype=image/png'},
      {test: /\.svg/, loader: 'url-loader?limit=10000&minetype=image/svg+xml'},
      {test: /\.eot/, loader: 'url-loader?limit=10000&minetype=application/vnd.ms-fontobject'},
      {test: /\.woff/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
      {test: /\.ttf/, loader: 'url-loader?limit=10000&minetype=application/x-font-ttf'},
      {test: /\.js$/, loader: 'jsx-loader'},
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  externals: {
    'react': 'React',
    'async': 'async'
  }
};
