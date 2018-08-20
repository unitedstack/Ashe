const React = require('react');

const copyObj = function(obj) {
  let newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== 'object') {
    return newobj;
  } else {
    newobj = JSON.parse(JSON.stringify(obj));
  }
  return newobj;
};

class GroupSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? props.value : '',
      disabled: !!props.disabled,
      hide: !!props.hide,
      data: props.data ? copyObj(props.data) : [],
      checkedField: props.checkedField ? props.checkedField : false,
      clicked: false
    };

    this.onChange = this.onChange.bind(this);
    this.renderData = this.renderData.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);
  }

  onChange(e) {
    if (e.target.value === 'on') {
      this.setState({
        checkedField: this.props.field
      });
    } else {
      this.setState({
        checkedField: this.props.field,
        value: e.target.value
      });
    }
  }

  onLinkClick() {
    this.setState({
      clicked: true
    });
    this.props.onAction(this.props.field, this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (let index in this.state) {
      if (typeof this.state[index] !== 'object') {
        if (this.state[index] !== nextState[index]) {
          return true;
        }
      } else {
        if (JSON.stringify(this.state[index]) !== JSON.stringify(nextState[index])) {
          return true;
        }
      }
    }
    return false;
  }

  componentDidUpdate() {
    this.props.onAction(this.props.field, this.state);
  }

  renderData() {
    let props = this.props,
      state = this.state;

    if (state.data && state.data.length > 0) {
      return (
        <select value={state.value} disabled={state.disabled || state.checkedField && state.checkedField !== props.field} onChange={this.onChange}>
          {
            state.data.map(function(group) {
              return (
                <optgroup key={group.id} label={group.name}>
                  {
                    group.data.map(function(item) {
                      return <option key={item.id} disabled={item.disabled} value={item.id}>{item.name || '(' + item.id.substr(0, 8) + ')'}</option>;
                    })
                  }
                </optgroup>
              );
            })
          }
        </select>
      );
    } else if (props.empty_text) {
      if (props.empty_text.link_info) {
        return (
          <span className={'empty-text-label'}>
            {props.empty_text.info}
            <a onClick={this.onLinkClick}>
              {
                props.empty_text.link_info.join('')
              }
            </a>
          </span>
        );
      } else {
        return (
          <span className="empty-text-label">{props.empty_text.info}</span>
        );
      }
    }
  }

  render() {
    let props = this.props,
      state = this.state;
    let className = 'modal-row select-row';
    if (props.is_long_label) {
      className += ' label-row long-label-row';
    } else {
      className += ' label-row';
    }
    if (state.hide) {
      className += ' hide';
    }

    return (
      <div className={className}>
        <div>
          {props.label}
        </div>
        <div>
          {props.checkedField && <input type="radio" checked={state.checkedField === props.field} onChange={this.onChange} />}
          {this.renderData()}
        </div>
      </div>
    );
  }
}

module.exports = GroupSelect;
