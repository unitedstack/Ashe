let React = require('react');
let request = require('./request');
let getErrorMessage = require('../../utils/error_message');

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorTip: '',
      isSubmitting: false
    };

    ['onSubmit', 'onClick'].forEach(item => {
      this[item] = this[item].bind(this);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let refs = this.refs;

    if (this.state.isSubmitting) {
      return;
    }

    let data = {
      username: refs.username.value,
      password: refs.password.value,
      captcha: refs.captcha.value
    };

    this.setState({
      isSubmitting: true
    });

    request.login(data).then((res) => {
      window.location = '/admin/blog';
    }).catch((err) => {
      this.setState({
        errorTip: getErrorMessage(err),
        isSubmitting: false
      });
      this.refs.captcha_img.src = '/admin/tool/captcha?' + Math.random();
    });
  }

  onClick(e) {
    e.preventDefault();
    this.refs.captcha_img.src = '/admin/tool/captcha?' + Math.random();
  }

  render() {
    let state = this.state;

    return (
      <div id="container">
        <div className="header"></div>
        <div className="content">
          <div className="logo">
            <img src="/admin-static/assets/login/logo.png" />
          </div>
          <form className="input-wrapper" method="POST" onSubmit={this.onSubmit}>
            <input ref="username" className="username" placeholder="用户名" type="text" autoFocus="autofocus" />
            <input ref="password" className="password" placeholder="密码" type="password" />
            <div className="captcha-wrapper">
              <input ref="captcha" className="captcha" placeholder="验证码" type="text" />
              <div className="captcha-img"><img title="点击刷新" ref="captcha_img" onClick={this.onClick} src="/admin/tool/captcha" /></div>
            </div>
            <div className="tip-wrapper">{state.errorTip}</div>
            <input className={'login' + (state.isSubmitting ? ' disabled' : '')} type="submit" value="登录" />
          </form>
          <p className="small-tip">登录如有问题请<a href="#">咨询管理员</a></p>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

module.exports = Model;
