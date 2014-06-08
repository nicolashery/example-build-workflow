/** @jsx React.DOM */

var React = require('react');

require('./app.less');

var catIcon = require('./cat.svg');
var kittenSmallImage = require('./kitten-70x70.jpg');
var kittenLargeImage = require('./kitten-600x400.jpg');

var App = React.createClass({
  render: function() {
    return (
      <div className={'app'}>
        <p>{'Vendor libs on the window object'}</p>
        <pre>{'typeof window.React === \'' + typeof window.React + '\''}</pre>
        <pre>{'typeof window.async === \'' + typeof window.async + '\''}</pre>
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
        <object type={'image/svg+xml'} data={catIcon} className={'icon-object'}></object>
        <p>
          {'Icon fonts work too'}
        </p>
        <p><span className={'flaticon-cat3'}></span></p>
      </div>
    );
  }
});

module.exports = App;
