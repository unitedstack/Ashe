require('./style/index.less');

const React = require('react');
const Main = require('admin/components/main/index');
const BasicProps = require('admin/components/basic_props/index');
const deleteModal = require('admin/components/modal_delete/index');
const popCreate = require('./pop/create/index');
const popModify = require('./pop/modify/index');
const request = require('./request');
const config = require('./config.json');
const router = require('admin/utils/router');

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      config: config
    };

    ['onInitialize', 'onAction', 'getList'].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  componentWillMount() {
    this.tableColRender(this.state.config.table.column);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.style.display === 'none' && this.props.style.display === 'none') {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.style.display !== 'none' && this.props.style.display === 'none') {
      this.onInitialize();
    }
  }

  tableColRender(columns) {
    columns.map((column) => {
      switch (column.key) {
        case 'content':
          column.render = (col, item, i) => {
            return item.content.replace('<br>', '');
          };
          break;
        case 'top':
          column.render = (col, item, i) => {
            return item.top ? '置顶' : '否';
          };
          break;
        default:
          break;
      }
    });
  }

  //initialize table data
  onInitialize() {
    this.getList();
  }

  //request: get Hypervisor List
  getList(refreshDetail) {
    let table = this.state.config.table;

    request.getList().then((res) => {
      console.log(res);
      table.data = res.notice;
      this.updateTableData(table, refreshDetail);
    });
  }

  //rerender: update table data
  updateTableData(table, refreshDetail, callback) {
    let newConfig = this.state.config;
    newConfig.table = table;
    newConfig.table.loading = false;

    let detail = this.refs.dashboard.refs.detail;

    this.setState({
      config: newConfig
    }, () => {
      if(detail && refreshDetail) {
        detail.refresh();
      }
    });
  }

  refresh(data, params) {
    if (data) {
      let path = router.getPathList();
      if (path[3]) {
        if (data.loadingDetail) {
          this.refs.dashboard.refs.detail.loading();
        }
      } else {
        if (data.loadingTable) {
          this.loadingTable();
        }
        if (data.clearState) {
          this.refs.dashboard.clearState();
        }
      }
    }

    this.getList(data ? data.detailRefresh : false);
  }

  loadingTable() {
    let _config = this.state.config;
    _config.table.loading = true;
    _config.table.data = [];

    this.setState({
      config: _config
    });
  }

  loadingDetail() {
    this.refs.dashboard.refs.detail.loading();
  }

  clearState() {
    let dashboard = this.refs.dashboard;
    if (dashboard) {
      dashboard.clearState();
    }
  }

  onAction(field, actionType, refs, data) {
    switch (field) {
      case 'btnList':
        this.onClickBtnList(data.key, refs, data);
        break;
      case 'table_filter':
        console.log(field, actionType, refs, data);
        break;
      case 'table':
        this.onClickTable(actionType, refs, data);
        break;
      case 'detail':
        this.onClickDetailTabs(actionType, refs, data);
        break;
      default:
        break;
    }
  }

  onClickTable(actionType, refs, data) {
    switch (actionType) {
      case 'check':
        this.onClickTableCheckbox(refs, data);
        break;
      default:
        break;
    }
  }

  onClickBtnList(key, refs, data) {
    const { rows } = data;
    const that = this;
    const refresh = function() {
      that.refresh({
        refreshList: true,
        refreshDetail: true,
        loadingTable: true,
        loadingDetail: true
      });
    };
    switch(key) {
      case 'create':
        popCreate(null, null, refresh);
        break;
      case 'edit':
        popModify(rows[0], null, refresh);
        break;
      case 'delete':
        deleteModal({
          action: '删除',
          type: '职位',
          data: rows,
          onDelete: function(_data, cb) {
            request.deleteNotices(rows).then((res) => {
              cb(true);
              refresh();
            }).catch(err => {
              cb(false, '删除失败！');
            });
          }
        });
        break;
      case 'refresh':
        this.refresh({
          refreshList: true,
          refreshDetail: true,
          loadingTable: true,
          loadingDetail: true
        });
        break;
      default:
        break;
    }
  }

  onClickTableCheckbox(refs, data) {
    let {rows} = data,
      btnList = refs.btnList,
      btns = btnList.state.btns;

    btnList.setState({
      btns: this.btnListRender(rows, btns)
    });
  }

  btnListRender(rows, btns) {
    for(let key in btns) {
      switch (key) {
        case 'edit':
          btns[key].disabled = !(rows.length === 1);
          break;
        case 'delete':
          btns[key].disabled = !(rows.length >= 1);
          break;
        default:
          break;
      }
    }

    return btns;
  }

  onClickDetailTabs(tabKey, refs, data) {
    let {rows} = data;
    let detail = refs.detail;
    let contents = detail.state.contents;

    switch(tabKey) {
      case 'description':
        if (rows.length === 1) {
          let basicPropsItem = this.getBasicPropsItems(rows[0]);

          contents[tabKey] = (
            <div>
              <BasicProps
                title="详细信息"
                defaultUnfold={true}
                tabKey={'description'}
                items={basicPropsItem}
                rawItem={rows[0]}
                onAction={this.onDetailAction.bind(this)}
                dashboard={this.refs.dashboard ? this.refs.dashboard : null} />
            </div>
          );
        }
        break;
      default:
        break;
    }

    detail.setState({
      contents: contents,
      loading: false
    });
  }

  getBasicPropsItems(item) {
    let items = [{
      title: '标题',
      content: item.title
    }, {
      title: '公告内容',
      content: item.content,
      'type': 'html'
    }, {
      title: '是否置顶',
      content: item.top ? '置顶' : '否'
    }, {
      title: '发布时间',
      content: item.createdAt,
      type: 'time'
    }, {
      title: '状态',
      content: item.status === 'public' ? '公开' : '草稿'
    }];

    return items;
  }

  onDetailAction(tabKey, actionType, data) {
    switch(tabKey) {
      case 'description':
        this.onDescriptionAction(actionType, data);
        break;
      default:
        break;
    }
  }

  onDescriptionAction(actionType, data) {
    switch(actionType) {
      default:
        break;
    }
  }

  render() {
    return (
      <div className="ashe-module-notice" style={this.props.style}>
        <Main
          ref="dashboard"
          visible={this.props.style.display === 'none' ? false : true}
          onInitialize={this.onInitialize}
          onAction={this.onAction}
          config={this.state.config}
          params={this.props.params}
        />
      </div>
    );
  }
}

module.exports = Model;
