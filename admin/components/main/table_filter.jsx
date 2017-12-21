require('./style/index.less');

const React = require('react');

class TableFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    // set defalut selected
    let filters = this.props.filters;
    let selected = {};
    for(let f in filters) {
      selected[f] = filters[f].value[0].key;
    }
    this.setState({
      selected: selected
    });
  }

  onClick(category, value, e) {
    let state = this.state;
    let selected = state.selected;
    if(selected[category] === value) {
      return;
    }
    selected[category] = value;
    this.setState({
      selected: selected
    }, () => {
      this.props.onAction('table_filter', 'click', {
        category: category,
        value: value
      });
    });
  }

  renderList(list, index) {
    const state = this.state;
    const selected = state.selected;
    return <div className="row" key={index}>
      <div className="label">{`${list.title}：`}</div>
      <ul className="content">
        {
          list.value.map(v => {
            return <li key={v.key} value={v.key}><span className={v.key === selected[list.key] ? 'selected' : ''} onClick={this.onClick.bind(this, list.key, v.key)}>{v.title}</span></li>;
          })
        }
      </ul>
    </div>;
  }

  render() {
    let filters = this.props.filters;

    return (
      <div className="table-filter">
        <div className="inner">
          {
            Object.keys(filters).map((list, index) => this.renderList(filters[list], index))
          }
        </div>
      </div>
    );
  }
}

module.exports = TableFilter;
