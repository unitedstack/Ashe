require('./style/index.less');
const React = require('react');
let request = require('./request');
let Loading = require('../../components/loading/index');
let tip = require('../../components/tip/index');
let router = require('admin/utils/router');

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      article: [],
      loading: true
    };
  }

  componentWillMount() {
    let path = router.getPathList();
    if(!path[3]) {
      tip({
        content: '找不到文章!',
        autoHide: false,
        close: true
      });
      this.setState({
        loading: false
      });
      return;
    }
    this.getArticle(path[3]);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.style.display !== 'none') {
      this.loading();
      let path = router.getPathList();
      if(!path[3]) {
        tip({
          content: '找不到文章!',
          autoHide: false,
          close: true
        });
        this.setState({
          loading: false
        });
        return;
      }
      this.getArticle(path[3]);
    }
  }

  getArticle(id) {
    request.getArticle(id).then((res) => {
      this.setState({
        id: id,
        loading: false,
        article: res
      });
    }).catch((err) => {
      tip({
        content: '文章获取失败！',
        close: true,
        autoHide: false,
        reload: this.getArticle.bind(this)
      });
    });
  }

  loading() {
    this.setState({
      loading: true
    });
  }

  getContent() {
    return {__html: this.state.article.article.content};
  }

  render() {
    var category = '';
    let state = this.state;
    if (!state.loading) {
      if (this.state.article.article.category === 'blog') {
        category = 'blogs';
      } else {
        category = 'news';
      }
    }
    return (
      !state.loading ? <div className="blog-module-content" style={this.props.style}>
        <a data-type="router" href={'/admin/blog/' + category + '/' + state.id} className="edit">编辑</a>
        <div className="main-wrapper">
          <div className="wrapper wangEditor-container">
            <div className="editor wangEditor-txt" dangerouslySetInnerHTML={this.getContent()}>
            </div>
          </div>
        </div>
      </div> : <div className="blog-module-content-loading">
        <Loading />
      </div>
    );
  }

}

module.exports = List;
