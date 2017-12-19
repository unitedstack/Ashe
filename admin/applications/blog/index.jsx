require('./style/index.less');
const ReactDOM = require('react-dom');
const React = require('react');
const Model = require('./model');

let blogModel = React.createFactory(Model);

ReactDOM.render(
  blogModel(),
  document.getElementById('container')
);
