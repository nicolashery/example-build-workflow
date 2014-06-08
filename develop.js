var http = require('http');
var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var connect = require('connect');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var serveStatic = require('serve-static');

var pkg = require('./package.json');
var webpackConfig = require('./webpack.config.js');
webpackConfig = _.assign(webpackConfig, {
  devtool: 'inline-source-map'
});
var webpackCompiler = webpack(webpackConfig);
var files = require('./files');

var app = connect();

app.use(webpackDevMiddleware(webpackCompiler, {
  stats: {colors: true}}
));

app.use('/bower_components', serveStatic(path.join(__dirname, 'bower_components')));

var configJs = fs.readFileSync(files.template.config);
configJs = _.template(configJs, {
  pkg: pkg,
  process: {env: process.env}
});

app.use('/config.js', function(req, res) {
  res.setHeader('Content-Type', 'text/javascript');
  res.end(configJs);
});

var vendors = _.map(files.vendor, function(vendor) {
  return vendor.dir + '/' + vendor.dist;
});

var indexHtml = fs.readFileSync(files.template.index);
indexHtml = _.template(indexHtml, {
  production: false,
  pkg: pkg,
  vendors: vendors
});

app.use('/', function(req, res, next) {
  if (!(req.url === '/' || req.url.match(/^\/\?/))) {
    return next();
  }

  res.setHeader('Content-Type', 'text/html');
  res.end(indexHtml);
});

app.use(function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Not found');
});

app.use(connect.errorHandler());

var port = process.env.PORT || 3000;
http.createServer(app).listen(port);
console.log('Development server started on port', port);
