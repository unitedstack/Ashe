require('./style/index.less');
const React = require('react');
const Pagination = require('../pagination');
const Loading = require('admin/applications/blog/components/loading');
const detailPopup = require('./pop/detail');

class List extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      checkedKey: {},
      rows: []
    });
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.getData().then((data) => {
      this.initData(data);
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.style.display !== 'none') {
      this.loading();
      this.refresh();
      this.clearStete();
    }
  }
  
  clearStete() {
    this.setState({
      checkedKey: {},
      rows: []
    });
  }

  loading() {
    this.setState({
      loading: true
    });
  }

  initData(data) {
    let config = this.state.config;
    config.table.data = data;

    this.setState({
      config: config,
      loading: false
    });
  }

  onClickButton(btnKey) {}

  onClickCheckbox(isChecked, checkedItem, arr) {}

  detailPop(details) {
    detailPopup(details);
  }

  onClickTableCheckbox(e) {
    let key = e.target.value;
    let isChecked = e.target.checked;
    let checkedKeys = this.state.checkedKey;
    let newCheckedKeys = checkedKeys;
    let table = this.state.config.table;

    if (key === 'all') {
      newCheckedKeys = {};
      if (isChecked) {
        let dataKey = table.key;
        table.data.forEach((item) => {
          newCheckedKeys[item[dataKey]] = true;
        });
      }
    } else if (isChecked) {
      newCheckedKeys[key] = true;
    } else {
      delete newCheckedKeys[key];
    }

    //deliver selected data to outside table
    let checkedItem;
    let dataKey = table.key;
    let arr = [];

    table.data.forEach((item) => {
      if ('' + key === '' + item[dataKey]) {
        checkedItem = item;
      }
      if (newCheckedKeys[item[dataKey]]) {
        arr.push(item);
      }
    });

    //set state
    this.setState({
      checkedKey: newCheckedKeys,
      rows: arr
    });

    this.onClickCheckbox(isChecked, checkedItem, arr);
  }

  render() {
    const state = this.state;
    let { buttons, name, pagination, table } = state.config;
    let { style } = this.props;
    let { loading } = state;
    let tableKey = table.key;
    let checkedAll = table.data.length > 0 && !table.data.some((item) => !state.checkedKey[item[tableKey]]);

    return (
      <div className="blog-module" data-module={name} style={style}>
        {
          buttons && buttons.length > 0 ?
            <div className="button-group">
              {
                buttons.map((btn) =>
                  <div key={btn.key}
                    className="button-group-btn"
                    onClick={this.onClickButton.bind(this, btn.key)}
                  >
                    {btn.title}
                  </div>
                )
              }
            </div>
            : null
        }
        <div className="content">
          {
            loading ?
              <Loading />
              : <table>
                <thead>
                  <tr>
                    {
                      table.checkbox ?
                        <th className="checkbox">
                          <input type="checkbox" value="all" onChange={this.onClickTableCheckbox.bind(this)}
                            checked={checkedAll} />
                        </th>
                        : null
                    }
                    {
                      table.column.map((col, colIndex) =>
                        <th key={col.key || colIndex}>{col.title}</th>
                      )
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    table.data.map((row, rIndex) => {
                      let key = row[table.key];
                      let checked = !!state.checkedKey[key];

                      return (
                        <tr key={row[table.key] || rIndex} className={rIndex % 2 ? 'stripped' : null}>
                          {
                            table.checkbox ?
                              <td className="checkbox">
                                <input type="checkbox" value={row[table.key]} onChange={this.onClickTableCheckbox.bind(this)} checked={checked} />
                              </td>
                              : null
                          }
                          {
                            table.column.map((col, colIndex) =>
                              <td key={col.key || colIndex}>{col.render ? col.render(col, row, rIndex) : row[col.index]}</td>
                            )
                          }
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
          }
          {
            !loading && pagination ?
              <div className="pagi-box">
                <Pagination onClick={() => {}} total={10} current={1} />
              </div>
              : null
          }
        </div>
      </div>
    );
  }

}

module.exports = List;
