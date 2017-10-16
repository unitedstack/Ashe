require('normalize.css');
require('./style/index.less');
const ReactDOM = require('react-dom');
const React = require('react');
const Model = require('./model');

let loginModel = React.createFactory(Model);

ReactDOM.render(
  loginModel(),
  document.getElementById('container')
);
