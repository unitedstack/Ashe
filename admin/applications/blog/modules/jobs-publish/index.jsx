require('./style/index.less');

const React = require('react');
const {Tab} = require('uskin');
// const request = require('./request');
// const router = require('admin/utils/router');

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    [].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  componentWillMount() {

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.style.display === 'none' && this.props.style.display !== 'none') {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.style.display !== 'none' && this.props.style.display === 'none') {
      this.onInitialize();
    }
  }

  render() {
    const tabs = [{
      name: '发布招聘',
      key: 'jobs-publish',
      default: true
    }];
    return (
      <div className="ashe-module-jobs-publish" style={this.props.style}>
        <div className="submenu-tabs">
          <Tab items={tabs} />
        </div>
        <div className="operation-list">
          
        </div>
        <div className="main-wrapper">

        </div>
      </div>
    );
  }
}

module.exports = Model;
