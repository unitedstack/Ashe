require('./style/index.less');
const React = require('react');
//let request = require('./request');
//let router = require('../../../../utils/router');


class ModifyPwd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nickname: ''
    };

    [].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  componentDidMount() {
    let nickname = document.getElementsByTagName('body')[0].getAttribute('nickname');
    this.setState({
      nickname: nickname
    });
  }

  render() {
    let state = this.state;
    return (
      <div className="blog-module-modify-pwd" style={this.props.style}>
        <div className="title">修改密码</div>
        <div className="tip">输入8-16个字符，混用大小写字母，数字，符号</div>
        <div className="content">
          <div className="username"><span>用户名</span>{state.nickname}</div>
          <div className="old-pwd"><span>旧密码</span><input /></div>
          <div className="new-pwd"><span>新密码</span><input /></div>
          <div className="username"><span>确认新密码</span><input /></div>
        </div>
        <div className="error"></div>
        <div className="btn-list">
          <span className="btn save">保存</span>
          <span className="btn cancel">取消</span>
        </div>
      </div>
    );
  }

}

module.exports = ModifyPwd;
