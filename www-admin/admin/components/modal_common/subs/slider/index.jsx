const React = require('react');
const Slider = require('uskin').Slider;

class Slide extends React.Component {
  constructor(props) {
    super(props);

    let initValue = props.value ? props.value : props.min;
    this.state = {
      value: initValue,
      inputValue: initValue,
      min: props.min,
      max: props.max,
      hide: !!props.hide,
      disabled: props.disabled ? props.disabled : false,
      error: false,
      eventType: null,
      text: props.text
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (let index in this.state) {
      if (this.state[index] !== nextState[index]) {
        return true;
      }
    }
    return false;
  }

  componentDidUpdate() {
    this.props.onAction(this.props.field, this.state);
  }

  onInputChange(e) {
    let state = this.state,
      min = state.min,
      max = state.max;

    let val = e.target.value;
    let floatVal = parseFloat(val);

    if (floatVal >= min && floatVal <= max) {
      this.setState({
        eventType: 'change',
        value: floatVal,
        inputValue: floatVal,
        error: false
      });
    } else {
      this.setState({
        eventType: 'change',
        inputValue: val,
        error: true
      });
    }
  }

  onSliderChange(e, value) {
    this.setState({
      eventType: e.type,
      value: value,
      inputValue: value,
      error: false
    });
  }

  render() {
    let props = this.props,
      state = this.state,
      min = state.min,
      max = state.max,
      disabled = state.disabled;

    let className = 'modal-row slider-row';
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
          <div className="slidearea">
            <Slider min={min} max={max} step={props.step} disabled={disabled} value={state.value} onChange={this.onSliderChange} width={280} />
            <div className="range">{state.text ? state.text : (min + '-' + max + props.unit)}</div>
          </div>
          <div className="inputarea">
            {
              !props.isHideInput ?
                <input type="text" className={state.error ? 'error' : ''} value={state.inputValue}
                  onChange={this.onInputChange}
                  disabled={disabled} />
                : null
            }
            {
              !props.isHideInput ?
                <label className="unit">{props.unit}</label>
                : null
            }
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Slide;
