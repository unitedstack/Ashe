require('./style/index.less');
const React = require('react');
require('admin/utils/router_delegate');

let menus = require('./config.json').menus;

class Leftbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentMenu: '',
      nickname: ''
    };
  }

  componentDidMount() {
    let nickname;
    try {
      nickname = document.getElementsByTagName('body')[0].getAttribute('nickname');
    } catch(err) {
      nickname = '用户名';
    }
    this.setState({
      nickname: nickname
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentMenu: nextProps.currentModule
    });
  }

  onSwitch(key) {
    if(key === this.state.currentMenu) {
      return;
    }
    this.setState({
      currentMenu: key
    });
  }

  render() {
    let state = this.state;
    return (
      <div className="blog-module-leftbar">
        <div className="user-wrapper">
          <div className="user-head"><img src="/admin-static/assets/blog/headpic.jpg" /></div>
          <p className="username" title="用户名">{state.nickname}</p>
          <a className="logout" href="/admin/logout">退出登录</a>
        </div>
        <ul className="menu">
          {
            menus.map((m) => {
              return <li key={m.key} className={state.currentMenu === m.key ? 'active' : ''} onClick={this.onSwitch.bind(this, m.key)}><a data-type="router" href={m.link}>{m.title}</a></li>;
            })
          }
        </ul>
        <div className="img-wrapper">
          <a href="/admin/login"><img src="/admin-static/assets/login/logo.png" /></a>
        </div>
      </div>
    );
  }

}

module.exports = Leftbar;
