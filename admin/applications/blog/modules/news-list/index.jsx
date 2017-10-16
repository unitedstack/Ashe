require('./style/index.less');
const React = require('react');
let request = require('./request');
let Loading = require('../../components/loading/index');
let tip = require('../../components/tip/index');
let Pagination = require('../../components/pagination/index');

const statusHolder = {
  all: '全部',
  public: '公开',
  private: '私有',
  draft: '草稿箱',
  trash: '回收站',
  top: '置顶'
};

class List extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allArticles: [],
      loading: true,
      up: false,
      currentPage: 1,
      query: null,
      category: 'all',
      status: 'all'
    };
  }

  componentWillMount() {
    this.getList(this.state.currentPage);
  }

  getList(page) {
    request.getList(page, {category: 'news'}).then((res) => {
      this.setState({
        loading: false,
        allArticles: res
      });
    }).catch((err) => {
      tip({
        content: '文章列表获取失败！',
        close: true,
        autoHide: false,
        reload: this.getList.bind(this)
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.style.display !== 'none') {
      this.getList(this.state.currentPage);
    }
  }

  onChangeArticle(id, obj) {
    request.modifyStatus(id, obj.status).then((res) => {
      this.getList(this.state.currentPage);
      tip({
        content: '状态修改成功！',
        close: true,
        autoHide: true
      });
    }).catch((err) => {
      tip({
        content: '状态修改失败！',
        close: true,
        autoHide: true
      });
    });
  }

  toggleTop(id, top) {
    request.toggleTop(id, top).then((res) => {
      tip({
        content: top ? '置顶成功!' : '取消置顶成功!',
        autoHide: true
      });
      this.getList(this.state.currentPage);
    }).catch((err) => {
      tip({
        content: top ? '置顶失败!' : '取消置顶失败!',
        autoHide: true
      });
    });
  }

  renderItem(a) {
    return <div key={a.id} className="article-wrapper">
      <div className="left">
        <a data-type="router" href={'/admin/blog/content/' + a.id} className="title">{a.title}</a>
        <div className="tag-wrapper">
          <div className="tag-holder">标签</div>
          <ul className="tag-items">
            {
              a.tags && JSON.parse(a.tags).map((t) => {
                return <li key={t}>{t}</li>;
              })
            }
          </ul>
        </div>
        <ul className="edit-wrapper">
          <li className="edit"><a data-type="router" href={'/admin/blog/news/' + a.id}>编辑</a></li>
          <li className="status">状态
            <ul>
              <li className={a.status === 'public' ? 'select' : ''} onClick={this.onChangeArticle.bind(this, a.id, {status: 'public'})}>公开</li>
              <li className={a.status === 'private' ? 'select' : ''} onClick={this.onChangeArticle.bind(this, a.id, {status: 'private'})}>私有</li>
              <li className={a.status === 'draft' ? 'select' : ''} onClick={this.onChangeArticle.bind(this, a.id, {status: 'draft'})}>草稿</li>
              <li className={a.status === 'trash' ? 'select' : ''} onClick={this.onChangeArticle.bind(this, a.id, {status: 'trash'})}>回收站</li>
            </ul>
          </li>
          <li onClick={this.toggleTop.bind(this, a.id, !a.top)} className="top">
            {
              a.top ? <span>已置顶</span> : '置顶'
            }
          </li>
        </ul>
      </div>
      <div className="right">
        <div className="info-wrapper">
          <div className="label">作者</div>
          <div className="content">{a.authorName}</div>
        </div>
        <div className="info-wrapper">
          <div className="label">时间</div>
          <div className="content">{a.time}</div>
        </div>
        <div className="info-wrapper">
          <div className="label">最后编辑</div>
          <div className="content">{a.updatedAt.slice(0, 10)}</div>
        </div>
        <div className="info-wrapper">
          <div className="label">浏览量</div>
          <div className="content">{a.view_count + ' views'}</div>
        </div>
        <div className="info-wrapper">
          <div className="label">状态</div>
          <div className="content">{statusHolder[a.status]}</div>
        </div>
      </div>
    </div>;
  }

  queryList(obj) {
    let p;
    if(Object.prototype.toString.call(obj)==='[object Object]') {
      p = obj;
    } else {
      p = null;
    }
    request.getList(1, obj).then((res) => {
      if(p) {
        if(Object.keys(obj)[0] === 'status') {
          this.setState({
            status: obj.status
          });
        } else if(obj === 'allStatus') {
          this.setState({
            status: 'all'
          });
        }
      }
      this.setState({
        query: obj,
        currentPage: 1,
        allArticles: res
      });
    }).catch((err) => {
      tip({
        content: '获取列表失败!',
        close: true,
        autoHide: false
      });
    });
  }

  onSort() {
    this.setState({
      up: !this.state.up
    });
  }

  getNextPage(page, e) {
    let state = this.state;
    request.getList(page, state.query).then((res) => {
      this.setState({
        allArticles: res,
        currentPage: page
      });
    }).catch((err) => {
      tip({
        content: '获取列表失败！',
        close: true,
        autoHide: false
      });
    });
  }

  onSearch(type, e) {
    let text = this.refs.searchText.value;
    if(type === 'click' || e.keyCode === 13) {
      request.getListByName(text).then((res) => {
        this.setState({
          allArticles: res
        });
      }).catch((err) => {
        tip({
          content: '搜索失败！',
          close: false,
          autoHide: true
        });
      });
    }
  }

  render() {
    let state = this.state,
      allArticles = this.state.allArticles,
      allpages = Math.ceil(allArticles.count / allArticles.limit);
    return (
      !state.loading ? <div className="blog-module-list" style={this.props.style}>
        <div className="main-wrapper">
          <div className="top-bar-wrapper">
            <div className="top-bar">
              <div className="status">文章状态
                <ul>
                  <li onClick={this.queryList.bind(this, 'allStatus')}>全部</li>
                  <li onClick={this.queryList.bind(this, {status: 'top'})}>置顶</li>
                  <li onClick={this.queryList.bind(this, {status: 'public'})}>公开</li>
                  <li onClick={this.queryList.bind(this, {status: 'private'})}>私有</li>
                  <li onClick={this.queryList.bind(this, {status: 'draft'})}>草稿</li>
                  <li onClick={this.queryList.bind(this, {status: 'trash'})}>回收站</li>
                </ul>
              </div>
              <div onClick={this.onSort.bind(this)} className="date">{state.up ? '日期 ↑' : '日期 ↓'}</div>
              <div className="search-wrapper">
                <div className="icon"><img src="/admin-static/assets/blog/search.png" /></div>
                <input onKeyUp={this.onSearch.bind(this, 'press')} ref="searchText" type="text" placeholder="搜索" />
                <div onClick={this.onSearch.bind(this, 'click')} className="search-btn">搜索</div>
              </div>
            </div>
          </div>
          <div className="list-wrapper">
            <div className="list">
              {
                allArticles.articles.sort((a, b) => {
                  return state.up ? new Date(a.createdAt) > new Date(b.createdAt) : new Date(a.createdAt) < new Date(b.createdAt);
                }).map((a) => {
                  return this.renderItem(a);
                })
              }
            </div>
          </div>
          <div className="pagination-wrapper"><div className="type-status-wrapper">&nbsp;&nbsp;&nbsp;文章状态&nbsp;&nbsp;<span>{statusHolder[state.status]}</span></div>
            {
              allpages > 1 ? <Pagination onClick={this.getNextPage.bind(this)} total={allpages} current={state.currentPage}  /> : null
            }
          </div>
        </div>
      </div> : <div className="blog-module-list-loading" style={this.props.style}>
        <Loading />
      </div>
    );
  }

}

module.exports = List;
