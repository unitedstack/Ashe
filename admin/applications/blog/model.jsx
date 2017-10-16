const React = require('react');
let Leftbar = require('./components/leftbar/index');
let router = require('admin/utils/router');
let loader = require('./cores/loader');

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modules: []
    };
  }

  loadRouter() {
    router.on('changeState', this.onChangeState.bind(this));

    var pathList = router.getPathList();
    if (pathList.length <= 2) {
      pathList[2] = 'enterprise';
    }
    router.replaceState('/admin/blog/' + pathList.slice(2).join('/'), null, null, true);
  }

  onChangeState(pathList) {
    let currentModule = pathList[2];
    let modules = this.state.modules;
    if (modules.indexOf(currentModule) === -1) {
      modules = modules.concat(currentModule);
    }
    this.setState({
      modules: modules,
      currentModule: currentModule
    });
  }

  componentDidMount() {
    this.loadRouter();
  }

  componentWillUpdate() {
    console.time('blog');
  }

  componentDidUpdate() {
    console.timeEnd('blog');
  }

  render() {
    let state = this.state;
    return (
      <div className="blog">
        <Leftbar currentModule={state.currentModule} />
        <div className="wrapper">
          {
            state.modules.map((m, index) => {
              let M = loader.modules[m];
              if (M) {
                return <M key={index} style={state.currentModule === m ? {display: state.currentModule === 'enterprise' ? 'block' : 'flex'} : {display: 'none'}} />;
              }
            })
          }
        </div>
      </div>
    );
  }

}

module.exports = Model;
