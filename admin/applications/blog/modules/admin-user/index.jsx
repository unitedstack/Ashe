const React = require('react');
const Dashboard = require('admin/applications/blog/components/dashboard/index');
const config = require('./config.json');
const addAccount = require('./pop/add');
const enableAccount = require('./pop/enable');
const request = require('./request');

class List extends Dashboard {

  constructor(props) {
    super(props);

    config.table.column = this.tableColRender(config.table.column);
    this.state = {
      config: config,
      loading: true
    };
  }

  getDetails(item) {
    let data = [{
      title: '邮箱/用户名',
      content: item.email
    }, {
      title: 'ID',
      content: item.id
    }, {
      title: '管理员姓名',
      content: item.nickname
    }, {
      title: '电话',
      content: item.phone
    }, {
      title: '启用状态',
      content: item.enable ? '已启用' : '已禁用'
    }, {
      title: '创建时间',
      content: item.createdAt,
      type: 'time'
    }];

    return data;
  }

  tableColRender(columns) {
    columns.map((column) => {
      switch (column.key) {
        case 'email':
          column.render = (col, item, i) => (
            <span className="clickable" onClick={this.detailPop.bind(this, this.getDetails(item))}>
              {item.email ? item.email : '(' + item.id.substr(0, 8) + ')'}
            </span>
          );
          break;
        case 'enable':
          column.render = (col, item, i) => (item.enable ? '已启用' : '已禁用');
          break;
        default:
          break;
      }
    });

    return columns;
  }

  getData() {
    return request.getList().then((res) => res.payload.accounts);
  }

  onClickButton(btnKey) {
    let rows = this.state.rows;

    switch(btnKey) {
      case 'add':
        addAccount(null, (res) => {
          this.refresh();
        });
        break;
      case 'enable':
      case 'disable':
        if (rows.length > 0) {
          enableAccount(rows, btnKey === 'enable', (res) => {
            this.refresh();
          });
        }
        break;
      default:
        break;
    }
  }

}

module.exports = List;
