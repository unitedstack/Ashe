require('./style/index.less');

const React = require('react');
const {Tab, Button, Modal} = require('uskin');
const Select_multi = require('./select_multi');
const configs = require('./config.json');
const request = require('./request');

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      disabled: true
    };

    ['onPublish', 'onAction'].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  componentWillMount() {
    this.initState();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.style.display === 'none' && this.props.style.display === 'none') {
      return false;
    }
    return true;
  }

  initState() {
    let newState = this.state;
    configs.forEach(config => {
      if(config.type === 'select') {
        newState[config.key] = config.data[0].value;
      } else if(config.type === 'select_multi') {
        newState[config.key] = {};
      } else {
        newState[config.key] = '';
      }
    });
    // 发布按钮置灰
    newState.disabled = true;
    this.setState(newState);
  }

  onPublish() {
    const refs = this.refs;
    const state = this.state;
    let data = {
      status: 'public'
    };
    for(let key in refs) {
      if(key === 'location') {
        data[key] = Object.keys(state[key]);
      } else {
        data[key] = state[key];
      }
    }
    request.createJob(data).then(res => {
      this.clearValues();
      Modal.info({
        title: '创建成功',
        content: '创建职位 ' + data.title + ' 成功！',
        okText: '确定'
      });
    });
  }

  onAction(key, type, e) {
    const refs = this.refs;
    let value;
    if(type && type === 'select_multi') {
      value = refs[key].state.selected;
    } else {
      value = e.target.value;
    }
    this.setState({
      [key]: value
    }, () => {
      let count = 0;
      let disabled = false;
      for(let key in refs) {
        if(key === 'location') {
          if(Object.keys(this.state[key]).length === 0) {
            count++;
          }
        } else {
          // 非必填项目不用来做判断
          if(!this.state[key] && configs.find(c => c.key === key).required) {
            count++;
          }
        }
      }
      if(count > 0) {
        disabled = true;
      }
      this.setState({
        disabled: disabled
      });
    });
  }

  // clear state
  clearValues() {
    this.initState();
  }

  renderContent() {
    const state = this.state;
    return <div className="main-wrapper">
      {
        configs.map(config => {
          switch(config.type) {
            case 'input':
              return <div className="row" key={config.key}>
                <div className="label">
                  {config.required ? <span>*</span> : null}
                  {config.label}
                </div>
                <input ref={config.key} placeholder={`请输入${config.label}`} type="text" onChange={this.onAction.bind(this, config.key, config.type)} value={state[config.key]} />
              </div>;
            case 'textarea':
              return <div className="row" key={config.key}>
                <div className="label">
                  {config.required ? <span>*</span> : null}
                  {config.label}
                </div>
                <textarea ref={config.key} placeholder={`请输入${config.label}`} onChange={this.onAction.bind(this, config.key, config.type)} value={state[config.key]} />
              </div>;
            case 'select':
              return <div className="row" key={config.key}>
                <div className="label">
                  {config.required ? <span>*</span> : null}
                  {config.label}
                </div>
                <select ref={config.key} onChange={this.onAction.bind(this, config.key, config.type)} value={state[config.key]}>
                  {
                    config.data.map(d => <option key={d.key} value={d.key}>{d.value}</option>)
                  }
                </select>
              </div>;
            case 'select_multi':
              return <div className="row" key={config.key}>
                <div className="label">
                  {config.required ? <span>*</span> : null}
                  {config.label}
                </div>
                <Select_multi
                  ref={config.key}
                  type={config.key}
                  holder={config.label}
                  data={config.data}
                  selected={state[config.key]}
                  onAction={this.onAction} />
              </div>;
            default:
              return null;
          }
        })
      }
    </div>;
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
          <Button 
            value="发布"
            disabled={this.state.disabled}
            iconClass="create"
            initial={true}
            onClick={this.onPublish.bind(this)} />
        </div>
        {
          this.renderContent()
        }
      </div>
    );
  }
}

module.exports = Model;
