require('./style/index.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Base = require('./base');

function modal(props) {

  let container = null;

  (function() {
    let mask = null,
      doc = document,
      root = doc.getElementById('modal-container');

    if (!root) {
      root = doc.createElement('div');
      root.id = 'modal-container';

      mask = doc.createElement('div');
      mask.classList.add('modal-mask');
      root.appendChild(mask);

      doc.body.appendChild(root);
    }
    container = doc.createElement('div');
    root.appendChild(container);
  })();

  function destory() {
    ReactDOM.unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
  }

  function onAfterClose() {
    destory();
  }

  let _props = Object.assign({}, props, {
    onAfterClose: onAfterClose
  });

  ReactDOM.render(<Base {..._props}/>, container);
}

module.exports = modal;
