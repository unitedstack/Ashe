require('./style/index.less');
require('./style/model.less');

const React = require('react');
const {InputSearch, Pagination, Tab, Table} = require('admin/uskin/index');
const ButtonList = require('./button_list');
const TableFilter = require('./table_filter');
const FilterSearch = require('./filter_search');
const Detail = require('./detail');
const moment = require('moment');
const router = require('admin/utils/router');
const getTime = require('admin/utils/time_unification');

class Main extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('zh-CN');

    this.stores = {
      rows: []
    };

    ['onNextPage'].forEach((func) => {
      this[func] = this[func].bind(this);
    });

  }

  componentWillMount() {
    let config = this.props.config;
    config.table.column.forEach((col) => {
      if (col.filter) {
        col.filterAll = ['all'];
      }
      if (col.sort) {
        col.sortBy = function(item1, item2) {
          let key = col.dataIndex,
            a = item1[key] ? item1[key] : '(' + item1.id + ')',
            b = item2[key] ? item2[key] : '(' + item2.id + ')';

          return a.localeCompare(b);
        };
      }
    });

    this.tableColRender(config.table.column);
  }

  tableColRender(columns) {
    columns.map((column) => {
      switch (column.type) {
        case 'captain':
          column.render = (col, item, i) => {
            let formatData = column.formatter && column.formatter(col, item, i);
            if (!formatData) {
              formatData = (item[col.dataIndex] ? item[col.dataIndex] : '(' + item.id.substr(0, 8) + ')');
            }
            return (
              <a className="captain" onClick={this.onClickCaptain.bind(this, item)}>
                {formatData}
              </a>
            );
          };
          break;
        case 'status':
          column.render = (col, item, i) => {
            return this.props.getStatusIcon(item[col.dataIndex]);
          };
          break;
        case 'time':
          column.render = (col, item, i) => {
            return getTime(item[col.dataIndex], true);
          };
          break;
        default:
          break;
      }
    });
  }

  onAction(field, actionType, data) {
    if (!data) {
      data = {};
    }
    data.rows = this.stores.rows;
    let func = this.props.onAction;
    func && func(field, actionType, this.refs, data);
  }

  componentDidMount() {
    this.props.onInitialize(this.props.params);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.visible) {
      this.clearAllState(nextProps.visible);
    } else {
      if (nextProps.config.table.data.length > 0) {
        if (this.props.params[2] === nextProps.params[2]) {
          this.onChangeParams(nextProps.params);
        }
      } else {
        if (nextProps.params[3]) {
          this.closeDetail();
        } else {
          let detail = this.refs.detail;
          if (detail) {
            detail.setState({
              visible: false
            });
          }
        }
      }
    }

    let detail = this.refs.detail;
    let refreshBtnDisabled = nextProps.config.table.loading || detail && detail.state.loading;
    this.setRefreshBtnDisabled(refreshBtnDisabled);
    this.updateRows(nextProps.config.table.data);
  }

  shouldComponentUpdate(nextProps) {
    if (!this.props.visible && !nextProps.visible) {
      return false;
    }
    return true;
  }

  setRefreshBtnDisabled(disabled) {
    let btnList = this.refs.btnList,
      btns = btnList.state.btns;

    btns.refresh.disabled = disabled;

    btnList.setState({
      btns: btns
    });
  }

  updateRows(data) {
    //update main store rows
    let newRows = [];

    this.stores.rows.forEach((item) => {
      let existed = data.filter((d) => d.id === item.id)[0];

      if (existed) {
        newRows.push(existed);
      }
    });

    this.stores.rows = newRows;

    //update table checkedKey
    let checkedKey = {};
    newRows.forEach((item) => {
      checkedKey[item.id] = true;
    });

    let table = this.refs.table;
    if (table) {
      table.check(checkedKey);
    }

    //update btn status
    this.onAction('table', 'check', {
      status: false,
      checkedRow: this.stores.rows
    });
  }

  onChangeParams(params) {
    let table = this.refs.table,
      detail = this.refs.detail;

    if (params.length === 4) {
      let row = this.props.config.table.data.filter((data) => '' + data.id === params[3])[0];
      /* no row data means invalid path list */
      if (!row) {
        router.replaceState('/' + params.slice(0, 3).join('/'));
        return;
      }

      this.stores.rows = [row];

      if (detail && !detail.state.visible) {
        detail.setState({
          visible: true
        });
      }

      if (table) {
        table.check({ [params[3]]: true });
      }

      detail.setState({
        contents: {}
      }, () => {
        this.onClickDetailTabs();
      });
    } else {
      this.stores.rows = [];

      if (detail && detail.state.visible) {
        detail.setState({
          visible: false
        });
      }

      if (table) {
        table.check({});
      }
    }

    this.onAction('table', 'check', {
      status: params[3] ? true : false,
      checkedRow: params[3] ? this.stores.rows[0] : null
    });

  }

  onClickCaptain(item, e) {
    e.preventDefault();

    let shouldClose = this.refs.detail.state.visible
      && (this.stores.rows.length === 1)
      && (this.stores.rows[0].id === item.id);

    let path = router.getPathList();

    if (shouldClose) {
      router.pushState('/' + path[0] + '/' + path[1] + '/' + path[2]);
    } else {
      router.pushState('/' + path[0] + '/' + path[1] + '/' + path[2] + '/' + item.id);
    }
  }

  clickTabs(e, item) {
    let path = router.getPathList();
    router.pushState('/' + path[0] + '/' + path[1] + '/' + item.key);
  }

  onConfirmFilter(data) {
    this.onAction('filter', 'search', data);
  }

  changeSearchInput(str, status) {
    if (status) {
      this.onAction('search', 'click', {
        text: str
      });
    }
  }

  keypressSearch(e) {
    if (e.key === 'Enter') {
      let value = this.refs.search.state.value;

      this.onAction('search', 'click', {
        text: value
      });
    }
  }

  checkboxListener(status, clickedRow, arr) {
    let path = this.props.params;
    if (arr.length <= 1) {
      router.pushState('/admin/' + path[1] + '/' + path[2]);
    } else if (arr.length <= 2) {
      if (path[3] === ('' + arr[0].id)) {
        router.replaceState('/admin/' + path[1] + '/' + path[2] + '/' + arr[0].id, null, null, true);
      } else {
        router.pushState('/admin/' + path[1] + '/' + path[2] + '/' + arr[0].id);
      }
    } else {
      // this.refs.detail.updateContent(this.stores.rows);
    }

  }

  onChangeTableCheckbox(status, clickedRow, rows) {
    this.stores.rows = rows;

    if (this.refs.detail && this.refs.detail.state.visible) {
      this.checkboxListener(status, clickedRow, rows);
    }

    if (!this.refs.detail || (!this.refs.detail.state.visible || (this.refs.detail.state.visible && rows.length > 1))) {
      if (this.refs.detail && this.refs.detail.state.visible) {
        if (rows.length > 1) {
          this.displayDetail();
        } else {
          this.onClickDetailTabs();
        }
      }
      this.onAction('table', 'check', {
        status: status,
        clickedRow: clickedRow
      });
    }
  }

  displayDetail() {
    let detail = this.refs.detail,
      tabKey = detail.findDefaultTab().key,
      contents = detail.state.contents;

    contents[tabKey] = (
      <div className="no-data-desc">
        <p>没有数据</p>
      </div>
    );

    detail.setState({
      contents: contents,
      loading: false
    });
  }

  onClickDetailTabs(tab) {
    this.onAction('detail', tab ? tab.key : this.refs.detail.findDefaultTab().key, {});
  }

  clearAllState(visible) {
    //clear search bar or filter box
    this.clearSearchState();
    this.clearFilterState();

    //clear other state
    this.clearState(visible);
  }

  clearState(visible) {
    this.stores.rows = [];
    this.onAction('table', 'check', {
      status: false,
      clickedRow: []
    });

    this.clearTableState();
    this.closeDetail(visible);
  }

  closeDetail(visible) {
    let dashboardVisible = typeof visible === 'undefined' ? this.props.visible : visible;
    let detail = this.refs.detail;

    if (detail && detail.state.visible) {
      let params = this.props.params;
      if (params.length > 3 && dashboardVisible) {
        router.pushState('/' + params.slice(0, 3).join('/'));
      } else {
        detail.setState({
          visible: false
        });
      }
    }
  }

  clearSearchState() {
    if (this.refs.search) {
      this.refs.search.clearState();
    }
  }

  clearFilterState() {
    if (this.refs.filter_search) {
      this.refs.filter_search.clearState();
    }
  }

  clearTableState() {
    if (this.refs.table) {
      this.refs.table.clearState();
    }
  }

  onNextPage(direction) {
    let data = {};
    data.url = '';

    let pagi = this.props.config.table.pagination;
    if (direction === 'next') {
      data.url = pagi.nextUrl;
    } else if( direction === 'prev') {
      data.url = pagi.prevUrl;
    }
    data.direction = direction;
    this.onAction('table', 'pagination', data);
  }

  render() {
    let props = this.props;

    let _config = props.config,
      tabs = _config.tabs,
      btns = _config.btns,
      tableFilter = _config.tableFilter,
      search = _config.search,
      filter = _config.filter,
      table = _config.table,
      detail = _config.table.detail;

    let pagination = table.pagination,
      hasPagi, pagiLabel;
    if (pagination && !table.loading) {
      let hasNext = pagination.nextUrl ? true : false;
      let hasPrev = pagination.prevUrl ? true : false;
      hasPagi = hasNext || hasPrev;

      pagiLabel = {
        first: hasPrev,
        prev: true,
        prevDisabled: !hasPrev,
        next: true,
        nextDisabled: !hasNext
      };
    }

    return (
      <div className="admin-com-main">
        {tabs ?
          <div className="submenu-tabs">
            <Tab items={tabs} onClick={this.clickTabs.bind(this)} />
          </div>
          : null
        }
        <div className="operation-list">
          <ButtonList
            ref="btnList"
            btns={btns}
            onAction={this.onAction.bind(this)} />
          {search ?
            <InputSearch
              ref="search"
              type="light"
              width={search.width}
              placeholder={search.placeholder}
              onKeyPress={this.keypressSearch.bind(this)}
              onChange={this.changeSearchInput.bind(this)} />
            : null
          }
          {filter ?
            <FilterSearch
              ref="filter_search"
              btnDisabled={table.loading}
              items={filter}
              onConfirm={this.onConfirmFilter.bind(this)} />
            : null
          }
        </div>
        {
          tableFilter
            ? <TableFilter
              filters={tableFilter}
              onAction={this.onAction.bind(this)} />
            : null
        }
        <div className="table-box">
          {!table.loading && !table.data.length ?
            <div className="table-with-no-data">
              <Table
                column={table.column}
                data={[]}
                checkbox={table.checkbox} />
              <p>
                没有数据
              </p>
            </div>
            : <Table
              ref="table"
              column={table.column}
              data={table.data}
              dataKey={table.dataKey}
              loading={table.loading}
              checkbox={table.checkbox}
              checkboxOnChange={this.onChangeTableCheckbox.bind(this)}
              hover={table.hover}
              striped={this.striped} />
          }
          {!table.loading && hasPagi ?
            <div className="pagination-box">
              {
                hasPagi ? <Pagination labelOnly={true} label={pagiLabel} onClickLabel={this.onNextPage}/> : null
              }
            </div>
            : null
          }
          {detail ?
            <Detail
              ref="detail"
              tabs={detail.tabs}
              rows={this.stores.rows}
              onClickTabs={this.onClickDetailTabs.bind(this)}
              setRefreshBtnDisabled={this.setRefreshBtnDisabled.bind(this)} />
            : null
          }
        </div>
      </div>
    );
  }
}

module.exports = Main;
