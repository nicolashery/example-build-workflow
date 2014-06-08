module.exports = {
  vendor: [
    {dir: 'bower_components/react', dist: 'react.js', distMin: 'react.min.js'},
    {dir: 'bower_components/async', dist: 'lib/async.js'}
  ],
  template: {
    index: 'src/index.html',
    config: 'src/config.js'
  }
};
