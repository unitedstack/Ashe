var React = require('react');
var ShortTip = require('../short_tip/index');

class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value ? props.value : '',
      disabled: !!props.disabled,
      hide: !!props.hide,
      error: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      value: this.refs.fileUpload
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (var index in this.state) {
      if (this.state[index] !== nextState[index]) {
        return true;
      }
    }
    return false;
  }

  componentDidUpdate() {
    this.props.onAction(this.props.field, this.state);
  }

  render() {
    var props = this.props;
    var className = 'modal-row upload-row';
    if (props.is_long_label) {
      className += ' label-row long-label-row';
    } else {
      className += ' label-row';
    }
    if (this.state.hide) {
      className += ' hide';
    }

    return (
      <div className={className}>
        <div>
          {
            props.required && <strong>*</strong>
          }
          {props.label}
        </div>
        <div>
          <form ref="fileUpload" onChange={this.onChange} method="POST" action="/admin/api/media" className="upload">
            <input multiple={false} type="file" name="media" />
          </form>
          {
            props.tip_info && <ShortTip label={props.tip_info} />
          }
        </div>
      </div>
    );
  }
}

module.exports = Upload;
