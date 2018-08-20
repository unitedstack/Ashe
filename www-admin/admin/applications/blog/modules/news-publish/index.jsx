require('./style/index.less');
require('simditor.css');

const React = require('react');
// const configs = require('./config.json');
const Simditor = require('simditor');
// const request = require('./request');
const editorConfig = require('admin/config/editor');

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    [].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.style.display === 'none' && this.props.style.display === 'none') {
      return false;
    }
    return true;
  }

  componentDidMount() {
    new Simditor(Object.assign({}, editorConfig, {
      textarea: document.getElementById('editor')
    }));
  }

  render() {
    return (
      <div className="ashe-module-news-publish" style={this.props.style}>
        <div id="editor"></div>
      </div>
    );
  }
}

module.exports = Model;
