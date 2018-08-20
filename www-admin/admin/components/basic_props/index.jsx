require('../../style/index.less');
require('./style/index.less');

const React = require('react');
const EditContent = require('./edit_content');
const moment = require('moment');
const getTime = require('admin/utils/time_unification');
const copy = require('clipboard-plus');

class BasicProps extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      toggle: false
    };

    moment.locale('zh-CN');
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: this.props.url ? true : false,
      toggle: this.props.defaultUnfold
    });
  }

  toggle(e) {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  onClick(id) {
    copy(id);
  }

  onAction(actionType, data) {
    this.props.onAction && this.props.onAction(this.props.tabKey, actionType, data);
  }

  getItemContent(item, rawItem) {
    let copyId;
    if(item.title && item.title.toLowerCase() === 'id') {
      copyId = String(item.content);
      return <div>{item.content}<i title="click to copy id!" className="glyphicon icon-copy copyid" onClick={this.onClick.bind(this, copyId)} /></div>;
    }
    switch(item.type) {
      case 'editable':
        return <EditContent item={item} rawItem={rawItem} onAction={this.onAction.bind(this)} />;
      case 'time':
        return getTime(item.content);
      case 'copy':
        copyId = String(item.content);
        return <div>{item.content}<i title="click to copy id!" className="glyphicon icon-copy copyid" onClick={this.onClick.bind(this, copyId)} /></div>;
      case 'html':
        return <span dangerouslySetInnerHTML={{__html: item.content}}></span>;
      default:
        return item.content;
    }
  }

  render() {
    let items = this.props.items,
      rawItem = this.props.rawItem,
      state = this.state;

    return (
      <div className="toggle">
        <div className="toggle-title" onClick={this.toggle}>
          {this.props.title}
          <i className={'glyphicon icon-arrow-' + (state.toggle ? 'up' : 'down')} />
        </div>
        <div className={'toggle-content' + (state.toggle ? ' unfold' : ' fold')}>
          <div className="halo-com-basic-props">
            {state.loading ?
              <div className="content-loading">
                <i className="glyphicon icon-loading" />
              </div>
              : <table>
                <tbody>
                  {items.map((item, index) =>
                    <tr key={index}>
                      <th>{item.title}</th>
                      <td>{this.getItemContent(item, rawItem)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    );
  }

}

module.exports = BasicProps;
