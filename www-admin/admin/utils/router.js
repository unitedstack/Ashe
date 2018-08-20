let EventEmitter = require('eventemitter2');

class Model extends EventEmitter{

  constructor() {
    super();

    window.onpopstate = this.onChangeState.bind(this);
  }

  onChangeState() {
    this.emit('changeState', this.getPathList());
  }

  pushState(url, obj, title, forced) {
    if (url === window.location.pathname && !forced) {
      return;
    }
    window.history.pushState(obj, title, url);
    this.onChangeState();
  }

  replaceState(url, obj, title, forced) {
    if (url === window.location.pathname && !forced) {
      return;
    }
    window.history.replaceState(obj, title, url);
    this.onChangeState();
  }

  getPathList() {
    let path = window.location.pathname;

    return path.split('/').filter((m) => {
      return m ? true : false;
    });
  }

  getPathName() {
    return window.location.pathname;
  }

}

let ret = {};
try {
  if (window) {
    ret = new Model();
  }
} catch (e) {
  console.log(e);
}

module.exports = ret;
