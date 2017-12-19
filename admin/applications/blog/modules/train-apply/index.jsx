const React = require('react');
const config = require('./config.json');
const request = require('./request');
const moment = require('moment');

class List extends React.Component {

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
      title: 'ID',
      content: item.id
    }, {
      title: '公司名称',
      content: item.company
    }, {
      title: '申请人姓名',
      content: item.nickname
    }, {
      title: '邮箱',
      content: item.email
    }, {
      title: '地址',
      content: item.location
    }, {
      title: '电话',
      content: item.phone
    }, {
      title: '创建时间',
      content: item.createdAt,
      type: 'time'
    }];

    return data;
  }

  getTime(str) {
    let time = moment(str);
    return time.isValid() ? time.format('YYYY-MM-DD HH:mm:ss') : null;
  }

  tableColRender(columns) {
    columns.map((column) => {
      switch (column.key) {
        case 'company':
          column.render = (col, item, i) => (
            <span className="clickable" onClick={this.detailPop.bind(this, this.getDetails(item))}>
              {item.company ? item.company : '(' + item.id.substr(0, 8) + ')'}
            </span>
          );
          break;
        case 'createdAt':
          column.render = (col, item, i) => this.getTime(item.createdAt);
          break;
        default:
          break;
      }
    });

    return columns;
  }

  getData() {
    return request.getList().then((res) => res.payload.list);
  }

}

module.exports = List;
