require('./style/index.less');
const React = require('react');

class Carousel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      selected: this.props.selected
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      selected: nextProps.selected,
      currentBanner: nextProps.banner
    });
  }

  onClick() {
    let position = this.props.position;
    this.props.onClick && this.props.onClick(position, this.state.selected);
  }

  render() {
    let state = this.state,
      data = state.data;
    return (
      <div onClick={this.onClick.bind(this)} className={'blog-module-articles-carousel' + (state.currentBanner ? '-current' : '') + (state.selected ? ' selected' : '')}>
        <div className="content">
          {data.title}
          <div className="replace">替换</div>
          <div className="current">当前</div>
        </div>
      </div>
    );
  }

}

module.exports = Carousel;
