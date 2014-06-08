module.exports = {
  vendor: [
    {dir: 'bower_components/react', dist: 'react.js', distMin: 'react.min.js', shim: {'react': 'React'}},
    {dir: 'bower_components/async', dist: 'lib/async.js', shim: {'async': 'async'}}
  ],
  template: {
    index: 'src/index.html',
    config: 'src/config.js'
  }
};
