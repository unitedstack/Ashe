import React, {PropTypes} from 'react';
import Button from '../button/index';
import Dropdown from '../dropdown/index';

function noop() {}

class DropdownButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      toggle: false
    };

    ['buttonOnClick', 'closeToggle'].forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  buttonOnClick(e, key) {
    let toggle = this.state.toggle;

    if (toggle) {
      e.stopPropagation();
      this.closeToggle(e);
    } else {
      this.setState({
        toggle: true
      });

      document.addEventListener('click', this.closeToggle);
    }
  }

  closeToggle(e) {
    this.setState({
      toggle: false
    });

    document.removeEventListener('click', this.closeToggle);
  }

  render() {
    const props = this.props;
    const btn = props.buttonData;
    const dropdownItems = props.dropdownItems;
    let dropdownStyle = props.dropdownStyle ?
      Object.assign({}, props.dropdownStyle) : {width: 100};
    dropdownStyle.display = this.state.toggle ? 'block' : 'none';

    return (
      <div ref="dropdownBtn" className="dropdown-btn">
        <Button value={btn.value}
          iconClass={btn.iconClass}
          onClick={this.buttonOnClick}
          dropdown={true}
          initial={true}
          disabled={props.disabled} />
        <Dropdown items={dropdownItems}
          style={dropdownStyle}
          onClick={props.dropdownOnClick} />
      </div>
    );
  }

}

DropdownButton.propTypes = {
  dropdownOnClick: PropTypes.func,
  buttonData: PropTypes.shape({
    value: PropTypes.string,
    iconClass: PropTypes.string
  }),
  dropdownItems: PropTypes.arrayOf(PropTypes.object),
  dropdownStyle: PropTypes.shape({
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }),
  disabled: PropTypes.bool
};

DropdownButton.defaultProps = {
  dropdownOnClick: noop,
  dropdownItems: [],
  disabled: false
};

export default DropdownButton;
