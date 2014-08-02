/** @jsx React.DOM */

var React = require('react');
var async = require('async');

require('./app.less');

var catIcon = require('./cat.svg');
var kittenSmallImage = require('./kitten-70x70.jpg');
var kittenLargeImage = require('./kitten-600x400.jpg');

var pkg = require('../package.json');

console.log('test source map');

var env = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL
};

var App = React.createClass({
  render: function() {
    var coll = ['one', 'two'].map(function(item) {
      return <li>{item}</li>;
    });
    var nodeEnv = process.env.NODE_ENV;

    return (
      <div className="app">
        <p>{'Vendor libs as npm modules'}</p>
        <pre>{'typeof require(\'react\') === \'' + typeof React + '\''}</pre>
        <pre>{'typeof require(\'async\') === \'' + typeof async + '\''}</pre>
        <p>{'Read JSON files like "package.json"'}</p>
        <pre>{'require(\'../package.json\').version === \'' + pkg.version + '\''}</pre>
        <p>{'Replace "process.env.ENV_VAR" with its value'}</p>
        <pre>{'process.env.API_URL === \'' + env.API_URL + '\''}</pre>
        <p>
          {'Small image '}
          <strong>{'src/kitten-70x70.jpg'}</strong>
          {' converted to a data-url'}
        </p>
        <img src={kittenSmallImage}/>
        <p>
          {'Large image '}
          <strong>{'src/kitten-600x400.jpg'}</strong>
          {' copied to output folder at url '}
          <strong>{kittenLargeImage}</strong>
        </p>
        <img src={kittenLargeImage}/>
        <p>
          {'Icon '}
          <strong>{'cat.svg'}</strong>
          {' converted to a data-url'}
        </p>
        <div className={'icon-cat'}></div>
        <object type="image/svg+xml" data={catIcon} className="icon-object"></object>
        <p>
          {'Icon fonts work too'}
        </p>
        <p><span className="flaticon-cat3"></span></p>
        <p>{'These list items have no "key" attribute defined and React produces a warning when "NODE_ENV" is not set to "production"'}</p>
        <pre>{'NODE_ENV === "' + nodeEnv + '"'}</pre>
        <ul>
          {coll}
        </ul>
      </div>
    );
  }
});

module.exports = App;
