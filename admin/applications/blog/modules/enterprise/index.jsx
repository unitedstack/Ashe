const React = require('react');
const Dashboard = require('admin/applications/blog/components/dashboard/index');
const config = require('./config.json');
const addCompany = require('./pop/add');
const enableCompany = require('./pop/enable');
const request = require('./request');

class List extends Dashboard {

  constructor(props) {
    super(props);

    config.table.column = this.tableColRender(config.table.column);
    this.state = {
      config: config,
      loading: true
    };

    ['tableColRender'].forEach((fn) => {
      this[fn] = this[fn].bind(this);
    });
  }

  getDetails(item) {
    let data = [{
      title: '企业名称',
      content: item.name
    }, {
      title: '电话',
      content: item.phone
    }, {
      title: '地址',
      content: item.location
    }, {
      title: 'ID',
      content: item.id
    }, {
      title: '启用状态',
      content: item.enable ? '已启用' : '已禁用'
    }, {
      title: '创建时间',
      content: item.createdAt,
      type: 'time'
    }];

    const user = item.c_users[0];
    if (user) {
      data = data.concat([{
        title: '管理员邮箱/账号',
        content: user.email
      }, {
        title: '管理员电话',
        content: user.phone
      }, {
        title: '账号启用状态',
        content: user.enable ? '已启用' : '已禁用'
      }]);
    }

    return data;
  }

  tableColRender(columns) {
    columns.map((column) => {
      switch (column.key) {
        case 'name':
          column.render = (col, item, i) => (
            <span className="clickable" onClick={this.detailPop.bind(this, this.getDetails(item))}>
              {item.name ? item.name : '(' + item.id.substr(0, 8) + ')'}
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
    return request.getList().then((res) => res.payload.companies);
  }

  onClickButton(btnKey) {
    let rows = this.state.rows;

    switch(btnKey) {
      case 'add':
        addCompany(null, (res) => {
          this.refresh();
        });
        break;
      case 'enable':
      case 'disable':
        if (rows.length > 0) {
          enableCompany(rows, btnKey === 'enable', (res) => {
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
