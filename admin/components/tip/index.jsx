require('./style/index.less');
var React = require('react');
var ReactDOM = require('react-dom');

function modal(props) {
  let doc;
  try {
    doc = document;
  } catch(e) {
    return;
  }

  let container = null,
    root = doc.getElementById('tip-container'),
    content = props.content,
    autoHide = props.autoHide,
    during = props.during || 4000,
    reload = props.reload,
    close = props.close,
    timer;

  if(!root) {
    root = doc.createElement('div');
    root.id = 'tip-container';

    doc.body.appendChild(root);
  }

  container = doc.createElement('div');
  root.appendChild(container);

  if(autoHide) {
    timer = setTimeout(onDestory, during);
  }

  function onDestory() {
    ReactDOM.unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
    clearTimeout(timer);
  }

  class Tip extends React.Component {
    onReload () {
      this.onClose();
      reload();
    }

    onClose() {
      onDestory();
    }

    render() {
      return (
        <div className="tip-wrapper">
          {content}
          {reload ? <a onClick={this.onReload} id="reload" href="javascript:;">重新加载</a> : null}
          {close ? <a onClick={this.onClose} id="close" href="javascript:;">关闭</a> : null}
        </div>
      );
    }
  }

  ReactDOM.render(<Tip />, container);
}

module.exports = modal;
