import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import styles from '../../mixins/styles';
import createClassName from '../../mixins/createClassName';

const DOC = document;
const FILTER_ID = 'uskin-filter-container';

function noop() {}

class Table extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      loading: this.props.loading,
      checkedKey: {},
      sortCol: undefined,
      sortDirection: undefined,
      filterColKey: {},
      filterBy: undefined,
      colWidth: new Array(props.column.length)
    };

    ['resizeScrollCol', 'onCheck', 'check', 'filter', 'sort', 'onResizeColumn'].forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  componentWillMount() {
    const props = this.props;
    let initChecked = this.props.checkboxInitialize;

    if (props.checkbox && initChecked) {
      let key = props.dataKey;
      let checkedKey = {};

      props.data.forEach((item) => {
        if (initChecked(item)) {
          checkedKey[item[key]] = true;
        }
      });

      this.setState({
        checkedKey: checkedKey
      });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeScrollCol);
    this.resizeScrollCol();
  }

  componentDidUpdate() {
    this.resizeScrollCol();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeScrollCol);
  }

  componentWillReceiveProps(nextProps) {
    let data = this.getProcessedData(nextProps.data, nextProps.dataKey);
    this.setState({
      data: data,
      loading: nextProps.loading
    });
  }

  resizeScrollCol() {
    const theadDOM = this.refs.thead;
    const tbodyDOM = this.refs.tbody;

    let colLength = this.props.column.length + (this.props.checkbox ? 1 : 0);

    if (tbodyDOM.scrollHeight > tbodyDOM.clientHeight) {
      if (colLength === theadDOM.childNodes.length) {
        let scrollCol = DOC.createElement('div');
        let width = (tbodyDOM.offsetWidth - tbodyDOM.clientWidth) + 'px';
        let colStyle = scrollCol.style;

        colStyle.flex = 1;
        colStyle.width = width;
        colStyle.maxWidth = width;
        colStyle.minWidth = width;
        colStyle.padding = 0;

        theadDOM.appendChild(scrollCol);
      }
    } else if (colLength < this.refs.thead.childNodes.length) {
      theadDOM.removeChild(theadDOM.lastChild);
    }
  }

  //checkbox onChange
  onCheck(e) {
    let key = e.target.value;
    let isChecked = e.target.checked;
    let checkedKeys = this.state.checkedKey;
    let newCheckedKeys = checkedKeys;

    if (key === 'null') {
      newCheckedKeys = {};
      if (isChecked) {
        let dataKey = this.props.dataKey;
        this.state.data.forEach((item) => {
          newCheckedKeys[item[dataKey]] = true;
        });
      }
    } else if (isChecked) {
      newCheckedKeys[key] = true;
    } else {
      delete newCheckedKeys[key];
    }

    //set state
    this.check(newCheckedKeys);

    //deliver selected data to outside table
    let checkedItem;
    let dataKey = this.props.dataKey;
    let arr = [];

    this.state.data.forEach((item) => {
      if ('' + key === '' + item[dataKey]) {
        checkedItem = item;
      }
      if (newCheckedKeys[item[dataKey]]) {
        arr.push(item);
      }
    });

    this.props.checkboxOnChange(isChecked, checkedItem, arr);

    //deliver data when all checkbox is clicked
    if (key === 'null') {
      this.props.checkboxOnChangeAll(isChecked, isChecked ? this.state.data : []);
    }
  }

  //filter onClick
  onFilter(column, e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    //create a filter, if it exists, destroy it
    const prevFilter = DOC.getElementById(FILTER_ID);
    if (prevFilter) {
      this.destroyFilter();
    }
    this.createFilter(column, e);

    //destroy filter listener
    DOC.addEventListener('click', this.destroyFilter, false);
  }

  destroyFilter() {
    const filter = DOC.getElementById(FILTER_ID);
    if (filter) {
      let root = filter.parentNode;
      ReactDOM.unmountComponentAtNode(filter);
      root.removeChild(filter);
    }

    DOC.removeEventListener('click', this.destroyFilter, false);
  }

  createFilter(column, e) {
    let root = e.target.parentNode;
    const state = this.state;
    let filterColKey = state.filterColKey;
    let filterBy = state.filterBy;

    const filter = (
      <div className="filter" data-key={column.key}>
        <div className={!filterBy ? 'selected' : null} key="null"
          onClick={this.filter.bind(this, {}, undefined)}>
          <span>{column.filterAll ? column.filterAll : 'All'}</span>
          {
            !filterBy ?
              <i className="glyphicon icon-active-yes" />
            : null
          }
        </div>
        {
          column.filter.map((item) => {
            var selected = filterColKey[column.key] && (filterBy === item.filterBy),
              newFilterCol = {};
            newFilterCol[column.key] = true;

            return (
              <div className={selected ? 'selected' : null} key={item.key}
                onClick={this.filter.bind(this, newFilterCol, item.filterBy)}>
                <span>{item.name}</span>
                {
                  selected ?
                    <i className="glyphicon icon-active-yes" data-value={item.key} />
                  : null
                }
              </div>
            );
          })
        }
      </div>
    );

    let container = document.createElement('div');
    container.id = FILTER_ID;

    root.appendChild(container);
    ReactDOM.render(filter, container);
  }

  getFilteredData(columnKeys, filterBy, data) {
    let newData = data;

    if (filterBy) {
      const props = this.props;
      let columns = props.column.filter((column) => columnKeys[column.key]);

      //filterBy can be function or string
      if (typeof filterBy === 'function') {
        newData = data.filter((item) => filterBy(item, columns));
      } else if (typeof filterBy === 'string') {
        newData = data.filter((item) =>
          columns.some((column) => item[column.dataIndex] === filterBy)
        );
      }
    }

    return newData;
  }

  //sort onClick
  onSort(column, direction, e) {
    e.stopPropagation();

    let filterNode = e.target.parentNode.parentNode;
    if (filterNode.parentNode.getAttribute('id') !== FILTER_ID && filterNode.getAttribute('id') !== FILTER_ID) {
      if (this.shouldClearSort(column, direction)) {
        this.state.data = null;
        let state = this.state;
        let data = this.getFilteredData(state.filterColKey, state.filterBy, this.props.data);

        this.setState({
          sortCol: undefined,
          sortDirection: direction,
          data: data
        });
      } else {
        this.sort(column, direction);
      }
    }
  }

  //sort helper
  shouldClearSort(column, direction) {
    const state = this.state;
    let prevCol = state.sortCol;
    let prevDir = state.sortDirection;

    return (column === prevCol && direction === prevDir);
  }

  getSortedData(column, direction, data) {
    const props = this.props;
    let propsData = props.data;
    let dataKey = props.dataKey;

    if (data === propsData) {
      data = Object.assign([], propsData);
    }

    data.sort((item1, item2) => {
      let ret = this.sortData(item1, item2, column.sortBy, column.dataIndex);
      return ret !== 0 ? ret * direction : this.sortByKey(item1, item2, dataKey);
    });

    return data;
  }

  sortData(item1, item2, sortBy, key) {
    if (typeof sortBy === 'function') {
      return sortBy(item1, item2);
    } else {
      return this.sortByDefaultType(item1[key], item2[key], sortBy);
    }
  }

  sortByDefaultType(a, b, sortType) {
    if (typeof a === 'undefined') {
      return 1;
    } else if (typeof b === 'undefined') {
      return -1;
    }
    switch (sortType) {
      case 'number':
        return a - b;
      case 'boolean':
        return (a === b) ? 0 : a;
      case 'date':
        return new Date(a) - new Date(b);
      default:
        return a.localeCompare(b);
    }
  }

  sortByKey(a, b, key) {
    return a[key] > b[key] ? 1 : -1;
  }

  //resizable column
  onResizeColumn(colIndex, e) {
    let getCol = (i) => (this.refs['col-' + i]);

    let table = this.refs.table;
    let thead = this.refs.thead;
    let tbody = this.refs.tbody;
    let line = document.createElement('div');

    let col = getCol(colIndex);
    let nextCol = getCol(colIndex + 1);

    let startX = col.getBoundingClientRect().left + col.offsetWidth;
    let startXMouse = e.clientX;
    let startY = col.getBoundingClientRect().top;
    let minWidth = 32;
    let minX = col.getBoundingClientRect().left + minWidth;
    let maxX = nextCol.getBoundingClientRect().left + nextCol.offsetWidth - minWidth;
    let tableHeight = thead.clientHeight + tbody.clientHeight;

    line.className = 'resize-column-line';
    let lineStyle = line.style;
    lineStyle.height = tableHeight + 'px';
    lineStyle.left = (startX - 1) + 'px';
    lineStyle.top = startY + 'px';

    let bodyStyle = document.body.style;
    bodyStyle['user-select'] = 'none';
    bodyStyle['-moz-user-select'] = 'none';
    bodyStyle['-webkit-user-select'] = 'none';
    bodyStyle['-ms-user-select'] = 'none';

    table.appendChild(line);

    function getValidX (value) {
      if (value < minX) {
        return minX;
      } else if (value > maxX) {
        return maxX;
      }
      return value;
    }

    let onDrag = (evt) => {
      let offset = startXMouse - evt.clientX;
      lineStyle.left = getValidX(startX - offset) + 'px';
    };

    let endDrag = (evt) => {
      let endXMouse = getValidX(evt.clientX);
      let offset = startXMouse - endXMouse;

      let colWidth = this.state.colWidth;
      colWidth[colIndex] = col.offsetWidth - offset;
      colWidth[colIndex + 1] = nextCol.offsetWidth + offset;

      this.setState({
        colWidth: colWidth
      });

      bodyStyle['user-select'] = '';
      table.removeChild(line);

      document.removeEventListener('mousemove', onDrag, true);
      document.removeEventListener('mouseup', endDrag, true);
    };

    document.addEventListener('mouseup', endDrag, true);
    document.addEventListener('mousemove', onDrag, true);
  }

  //public function
  check(checkedKey) {
    this.setState({
      checkedKey: checkedKey
    });
  }

  filter(columnKeys, filterBy, e) {
    let data = this.props.data,
      state = this.state;
    if (!this.props.getData) {
      data = this.getFilteredData(columnKeys, filterBy, data);
    } else {
      this.props.getData(columnKeys, filterBy);
    }
    //check sort
    if (this.state.sortCol) {
      data = this.getSortedData(state.sortCol, state.sortDirection, data);
    }

    this.setState({
      filterColKey: columnKeys,
      filterBy: filterBy,
      data: data
    });

    //check checkbox
    this.check(this.state.checkedKey);
  }

  sort(column, direction) {
    let data = this.state.data;
    if (!column) {
      data = this.props.data;
    }

    data = this.getSortedData(column, direction, data);
    this.setState({
      sortCol: column,
      sortDirection: direction,
      data: data
    });
  }

  setData(data) {
    this.setState({
      data: this.getProcessedData(data, this.props.dataKey)
    });
  }

  getProcessedData(oldData, key) {
    let data = oldData;
    const state = this.state;

    //check filter and sort
    if (!state.filterBy && state.sortCol) {
      data = Object.assign([], oldData);
    }
    if (state.filterBy) {
      data = this.getFilteredData(state.filterColKey, state.filterBy, data);
    }
    if (state.sortCol) {
      data = this.getSortedData(state.sortCol, state.sortDirection, data);
    }

    return data;
  }

  loading(status) {
    this.setState({
      loading: status
    });
  }

  //clear all the state except loading
  clearState() {
    this.setState({
      data: this.props.data,
      checkedKey: {},
      sortCol: undefined,
      sortDirection: undefined,
      filterColKey: {},
      filterBy: undefined
    });
  }

  //render helper
  getFixedWidth(width) {
    return {
      width: width,
      minWidth: width,
      maxWidth: width
    };
  }

  checkedAll(data, key, checked) {
    return data.length > 0 && !data.some((item) => !checked[item[key]]);
  }

  render() {
    const props = this.props;
    const state = this.state;
    let dataKey = props.dataKey;
    let loading = state.loading;

    let style = styles.getWidth(props.width);
    let className = createClassName({
      default: 'table',
      prefix: 'table-',
      props: {
        mini: props.mini,
        hover: props.hover,
        striped: props.striped
      }
    });

    let checkedAll = this.checkedAll(state.data, dataKey, state.checkedKey);

    return (
      <div ref="table" style={style} className={className}>
        <div ref="thead" className="table-header" onClick={this.tableHeadOnClick}>
          {
            props.checkbox ?
              <div key="checkbox" className="checkbox">
                <input value="null" onChange={this.onCheck} type="checkbox" checked={checkedAll} />
              </div>
            : null
          }
          {
            props.column.map((col, index) => {
              let isSorted = (col === state.sortCol);
              let nextDir = (isSorted && state.sortDirection) ? state.sortDirection * -1 : 1;
              let ref = 'col-' + index;
              let colStyle = {};
              if (state.colWidth[index]) {
                colStyle = this.getFixedWidth(state.colWidth[index]);
              } else if (col.width) {
                colStyle = this.getFixedWidth(col.width);
              }

              return (
                <div key={col.key}
                  ref={ref}
                  style={colStyle}
                  className={col.sortBy ? 'sortable' : null}>
                  {
                    index < props.column.length - 1 ?
                      <div className="drag-line" onMouseDown={this.onResizeColumn.bind(this, index)} />
                    : null
                  }
                  {
                    col.sortBy ?
                      <div className="sort-box">
                        <span className={'sort-up' + (isSorted && (state.sortDirection === 1) ? ' selected' : '')}
                          onClick={this.onSort.bind(this, col, 1)} >
                          <span className="arrow-up" data-value={col.key} data-direction="up" />
                        </span>
                        <span className={'sort-down' + (isSorted && (state.sortDirection === -1) ? ' selected' : '')}
                          onClick={this.onSort.bind(this, col, -1)} >
                          <span className="arrow-down" data-value={col.key} data-direction="down" />
                        </span>
                      </div>
                    : null
                  }
                  <span className="title"
                    onClick={col.sortBy && this.onSort.bind(this, col, nextDir)}>
                    {col.title}
                  </span>
                  {
                    col.filter ?
                      <div className="filter-box">
                        <div className="filter-icon" onClick={this.onFilter.bind(this, col)} />
                      </div>
                    : null
                  }
                </div>
              );
            })
          }
        </div>
        {
          loading ?
            <div className="loading-data">
              <i className="glyphicon icon-loading" />
            </div>
          : null
        }
        <div ref="tbody" style={{display: loading ? 'none' : 'block'}} className="table-body">
          {
            state.data.map((item, index) => {
              let key = item[dataKey];
              let checked = !!state.checkedKey[key];

              return (
                <div key={key} className={'row' + (checked ? ' selected' : '')}>
                  {
                    props.checkbox ?
                      <div className="checkbox">
                        <input value={key}
                          onChange={this.onCheck}
                          type="checkbox"
                          checked={checked} />
                      </div>
                    : null
                  }
                  {
                    props.column.map((col, colIndex) => {
                      let cellStyle = {};
                      if (state.colWidth[colIndex]) {
                        cellStyle = this.getFixedWidth(state.colWidth[colIndex]);
                      } else if (col.width) {
                        cellStyle = this.getFixedWidth(col.width);
                      }

                      return (
                        <div key={col.key}
                          ref={'row-' + index + '-col-' + colIndex}
                          style={cellStyle}>
                          {col.render ? col.render(col, item, index) : item[col.dataIndex]}
                        </div>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  checkboxOnChange: PropTypes.func,
  checkboxOnChangeAll: PropTypes.func
};

Table.defaultProps = {
  columns: [],
  data: [],
  checkboxOnChange: noop,
  checkboxOnChangeAll: noop
};

export default Table;
