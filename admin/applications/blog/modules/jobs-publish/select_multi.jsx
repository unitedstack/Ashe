const React = require('react');

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: {},
      toggle: false
    };

    ['toggle'].forEach(func => {
      this[func] = this[func].bind(this);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected
    });
  }

  toggle() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  onSelect(key) {
    const state = this.state;
    const props = this.props;
    if(state.selected[key]) {
      delete state.selected[key];
    } else {
      state.selected[key] = key;
    }
    this.setState({
      selected: state.selected
    });

    props.onAction && props.onAction(props.type, 'select_multi');
  }

  render() {
    const props = this.props;
    const state = this.state;
    const detail = Object.keys(state.selected).join(', ') || '没有选中的' + props.holder;
    return(
      <div className="select_multi">
        <div className="holder" onClick={this.toggle}>
          {detail}
          <div className="triangle" />
        </div>
        <ul className={'wrapper' + (state.toggle ? '' : ' hide')}>
          {
            props.data.map(d => {
              return <li className={state.selected[d.key] ? 'selected' : ''} key={d.key} onClick={this.onSelect.bind(this, d.key)}>{d.key}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = Model;
