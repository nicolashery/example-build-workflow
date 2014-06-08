/* global rm, mkdir, cp, exec, cat */
require('shelljs/global');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var pkg = require('./package.json');
var files = require('./files');

console.log('Cleaning output directory...');
rm('-rf', 'dist');
mkdir('-p', 'dist');

console.log('Creating "index.html"...');
var indexHtml = fs.readFileSync(files.template.index);
indexHtml = _.template(indexHtml, {
  production: true,
  pkg: pkg
});
indexHtml.to('dist/index.html');

console.log('Creating "config.js"...');
var configJs = fs.readFileSync(files.template.config);
configJs = _.template(configJs, {
  pkg: pkg,
  process: {env: process.env}
});
configJs.to('dist/config-' + pkg.version + '.js');

var scriptsToConcatenate = [];
var tmpFiles = [];

_.forEach(files.vendor, function(vendor) {
  var filePath;

  if (vendor.distMin) {
    filePath = vendor.dir + '/' + vendor.distMin;
    scriptsToConcatenate.push(filePath);
  }
  else {
    var src = vendor.dir + '/' + vendor.dist;
    console.log('Minifying "' + src + '"...');
    filePath = path.basename(src);
    filePath = filePath.replace('.js', '.min.js');
    filePath = 'dist/' + filePath;
    cp(src, filePath);
    exec('./node_modules/.bin/uglifyjs ' + filePath, {silent:true}).output.to(filePath);
    scriptsToConcatenate.push(filePath);
    tmpFiles.push(filePath);
  }

  console.log('Added vendor file "' + filePath + '"...');
});

var bundlePath = 'dist/bundle.js';
console.log('Running webpack bundler with minimize option...');
exec('./node_modules/.bin/webpack --progress --colors --optimize-minimize');
scriptsToConcatenate.push(bundlePath);
tmpFiles.push(bundlePath);

console.log('Concatenating minified scripts...');
cat(scriptsToConcatenate).to('dist/all-' + pkg.version + '.js');

console.log('Cleaning temporary files...');
rm(tmpFiles);

console.log('Build successfull');
