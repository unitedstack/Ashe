const React = require('react');
const Leftbar = require('admin/components/leftbar/index');
const router = require('admin/utils/router');
const loader = require('./cores/loader');
require('./cores/watchdog');

class Model extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modules: [],
      params: []
    };

    this.onChangeState = this.onChangeState.bind(this);
  }

  loadRouter() {
    router.on('changeState', this.onChangeState.bind(this));

    var pathList = router.getPathList();
    if (pathList.length <= 2) {
      pathList[2] = 'admin-user';
    }
    router.replaceState('/admin/blog/' + pathList.slice(2, 4).join('/'), null, null, true);
  }

  onChangeState(pathList) {
    let currentModule = pathList[2];
    let modules = this.state.modules;

    if (modules.indexOf(currentModule) === -1) {
      modules = modules.concat(currentModule);
    }
    this.setState({
      modules: modules,
      currentModule: currentModule,
      params: pathList
    });
  }

  componentDidMount() {
    this.loadRouter();
  }

  componentWillUpdate() {
    console.time('start');
  }

  componentDidUpdate() {
    console.timeEnd('end');
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
                return <M key={index} params={state.params} style={state.currentModule === m ? {display: 'flex'} : {display: 'none'}} />;
              }
            })
          }
        </div>
      </div>
    );
  }

}

module.exports = Model;
