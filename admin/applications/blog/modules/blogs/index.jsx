require('./style/index.less');
const React = require('react');
let wangEditor = require('wangeditor');
let Keywords = require('../../components/keywords/index');
let request = require('./request');
let fileupload = require('../../../../core/fileupload');
let router = require('../../../../utils/router');
let tip = require('../../components/tip/index');

const holder = {
  thumbnail: '最佳尺寸 166*155',
  flash: '最佳尺寸 400*600'
};

class Articles extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editor: null,
      content: '',
      cover: '',
      flashImage: '',
      inPreview: false,
      introduction: '',
      category: 'blog',
      keywords: [],
      title: '',
      titleLength: 0,
      time: '',
      thumbnail: {
        value: '',
        holder: holder.thumbnail,
        isUploading: false
      },
      flash: {
        value: '',
        holder: holder.flash,
        isUploading: false
      },
      url: '',
    };

    ['onTitleChange', 'onPreview', 'onClosePreview', 'onSave', 'onPublish', 'onAddKeywords', 'onChangeTime', 'onChangeUrl', 'onChangeTextArea', 'onEditor', 'destroy'].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  // input title
  onTitleChange(e) {
    let title = e.target.value,
      length = e.target.value.length;
    this.setState({
      title: title,
      titleLength: length
    });
  }

  onPreview() {
    let state = this.state;
    let content = state.editor.$txt.html();
    this.setState({
      inPreview: !state.inPreview,
      content: content
    });
  }

  onClosePreview() {
    let state = this.state;
    this.setState({
      inPreview: !state.inPreview
    });
  }

  getPreviewContent() {
    return {__html: this.state.content};
  }

  componentDidMount() {
    try {
      //wangEditor.config.printLog = false;
      this.onEditor();
    } catch(e) {
      return;
    }
  }

  onEditor() {
    let editor = new wangEditor(document.getElementById('blog-editor'));
    editor.config.uploadImgUrl = '/admin/api/media?editor=true';
    editor.config.uploadImgFileName = 'media';
    editor.config.menus = wangEditor.config.menus.map(function(item, key) {
      if (item === 'location') {
        return null;
      }
      return item;
    });
    editor.create();
    this.setState({
      editor: editor
    });
    let path = router.getPathList();
    path.length >= 4 ? this.initData() : this.clearTable();
  }

  destroy() {
    let wrapper = document.getElementById('blog-wrapper');
    while(wrapper.hasChildNodes()) {
      wrapper.removeChild(wrapper.firstChild);
    }
    let div = document.createElement('div');
    div.id = 'blog-editor';
    div.className = 'editor';
    document.getElementById('blog-wrapper').append(div);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.style.display !== 'none') {
      this.destroy();
      this.onEditor();
      let path = router.getPathList();
      path.length >= 4 ? this.initData() : this.clearTable();
    }
  }

  initData() {
    let path = router.getPathList();
    request.getInitData(path[3] ? path[3] : null).then((res) => {
      this.clearTable();
      let tags = res[0], article;
      let k = [];
      if (tags.length > 0) {
        tags.forEach((item, index) => {
          if (item.category === this.state.category) {
            k.push(item.tag);
          }
        });
      }
      if(res[1]) {
        article = res[1].article;
      } else {
        article = null;
      }
      this.refs.keywords.setState({
        keywords: k
      });
      if(path[3]) {
        this.fillTable(article);
      }
    }).catch((err) => {
      tip({
        content: '初始化失败！',
        autoHide: false,
        close: true,
        reload: this.initData.bind(this)
      });
    });
  }

  fillTable(article) {
    let a;
    if(article) {
      a = article;
      this.setState({
        category: a.category,
        introduction: a.introduction,
        title: a.title,
        time: a.time,
        url: a.url,
        cover: a.cover
      });
      this.state.editor.$txt.html(a.content);
      if (a.tags) {
        this.refs.keywords.setState({
          selected: JSON.parse(a.tags)
        });
      }
    }
  }

  clearTable() {
    this.setState({
      category: 'blog',
      title: '',
      time: '',
      url: '',
      cover: '',
      flashImage: '',
      introduction: '',
      content: '',
      thumbnail: {
        value: '',
        holder: holder.thumbnail,
        isUploading: false
      },
      flash: {
        value: '',
        holder: holder.flash,
        isUploading: false
      }
    });
    this.state.editor.$txt.html('<p><br></p>');
    this.refs.keywords.setState({
      selected: []
    });
  }

  getData() {
    let state = this.state,
      refs = this.refs;
    let data = {
      category: state.category,
      title: refs.title.value,
      time: refs.time.value,
      introduction: refs.introduction.value,
      content: state.editor.$txt.html(),
      cover: state.thumbnail.value || refs.thumbnail_previewer.value,
      tags: JSON.stringify(refs.keywords.state.selected),
      url: refs.url.value
    };
    console.log('postData', data);
    return data;
  }

  onSave() {
    let path = router.getPathList();
    let data = this.getData();
    data.status = 'draft';

    if(!path[3]) {
      request.publishArticles(data).then((res) => {
        tip({
          content: '保存成功！',
          autoHide: true,
          close: true
        });
        router.replaceState('/admin/blog/blog-list', null, null, false);
      }).catch((err) => {
        tip({
          content: '保存失败！',
          autoHide: true,
          close: true
        });
      });
    } else {
      request.modifyArticles(data, path[3]).then((res) => {
        tip({
          content: '保存成功！',
          autoHide: true,
          close: true
        });
        router.replaceState('/admin/blog/blog-list', null, null, false);
      }).catch((err) => {
        tip({
          content: '保存失败！',
          autoHide: true,
          close: true
        });
      });
    }

  }

  onPublish() {
    let path = router.getPathList();
    let data = this.getData();
    data.status = 'public';

    if(!path[3]) {
      request.publishArticles(data).then((res) => {
        tip({
          content: '发表成功！',
          autoHide: true,
          close: true
        });
        router.replaceState('/admin/blog/blog-list', null, null, false);
      }).catch((err) => {
        tip({
          content: '发表失败！',
          autoHide: true,
          close: true
        });
      });
    } else {
      request.modifyArticles(data, path[3]).then((res) => {
        tip({
          content: '修改成功！',
          autoHide: true,
          close: true
        });
        router.replaceState('/admin/blog/blog-list', null, null, false);
      }).catch((err) => {
        tip({
          content: '修改失败！',
          autoHide: true,
          close: true
        });
      });
    }
  }

  onAddKeywords(e) {
    let refs = this.refs,
      keywords = refs.keywords.state.keywords,
      selected = refs.keywords.state.selected;
    let handler = () => {
      refs.keywords.setState({
        keywords: keywords.indexOf(e.target.value) > -1 ? keywords : keywords.concat(e.target.value),
        selected: selected.indexOf(e.target.value) > -1 ? selected : selected.concat(e.target.value)
      }, () => {
        refs.addKeywords.value = '';
      });
    };
    e.keyCode === 13 && handler();
  }

  onPreviewChange(field) {

    let state = this.state;
    if((field === 'thumbnail' && state.thumbnail.isUploading) || (field === 'flash' && state.flash.isUploading)) {
      return;
    }
    if(field === 'thumbnail') {
      this.setState({
        thumbnail: {
          holder: '正在上传...',
          isUploading: true
        }
      });
    } else {
      this.setState({
        flash: {
          holder: '正在上传...',
          isUploading: true
        }
      });
    }
    let form = new FormData(this.refs[field]);
    fileupload({
      url: '/admin/api/media',
      data: form
    }).then((res) => {
      let r = JSON.parse(res),
        n = r.prefix + r.filename;
      this.refs[field + '_previewer'].src = n;
      if(field === 'thumbnail') {
        this.setState({
          thumbnail: {
            value: n,
            holder: '',
            isUploading: false
          }
        });
      } else {
        this.setState({
          flash: {
            value: n,
            holder: '',
            isUploading: false
          }
        });
      }
    }).catch((err) => {
      tip({
        content: '图片上传失败!',
        autoHide: true,
        close: true
      });
      if(field === 'thumbnail') {
        this.setState({
          thumbnail: {
            holder: holder.thumbnail,
            isUploading: false
          }
        });
      } else {
        this.setState({
          flash: {
            holder: holder.flash,
            isUploading: false
          }
        });
      }
    });
  }

  onChangeTime(e) {
    this.setState({
      time: e.target.value
    });
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    });
  }

  onChangeTextArea(e) {
    this.setState({
      introduction: e.target.value
    });
  }

  render() {
    let state = this.state;
    return (
      <div className="blog-module-blogs" style={this.props.style}>
        <div className="top-bar">
          <div className="left">
            <ul>
              <li>
                <span className='circle active'></span><p>博客</p>
              </li>
            </ul>
          </div>
          <div className="right">
            <div onClick={this.onPreview} className="preview">预览</div>
            <div onClick={this.onSave} className="save">保存</div>
            <div onClick={this.onPublish} className="publish">确认发表</div>
          </div>
        </div>
        <div className="second-bar">
          <div className="left">
            <div className={'title-wrapper' + (state.titleLength > 30 ? ' toolong' : '')}>
              <input ref="title" onChange={this.onTitleChange} type="text" value={state.title} placeholder="输入标题" />
              <p><span>{state.titleLength}</span>/30</p>
            </div>
            <div className="author-wrapper">
              <input ref="time" type="text" onChange={this.onChangeTime} placeholder="时间" value={state.time} />
              <input ref="url" type="text" onChange={this.onChangeUrl} placeholder="固定链接" value={state.url} />
            </div>
          </div>
          <div className="right">
            <div className="thumbnail">
              {state.thumbnail.holder}
              <img ref="thumbnail_previewer" src={state.cover} />
            </div>
            <form ref="thumbnail" onChange={this.onPreviewChange.bind(this, 'thumbnail')} method="POST" action="/admin/api/media" className="upload">
              <a href="javascript:;">
                <input multiple={false} type="file" name="media" />上传封面
              </a>
            </form>
          </div>
        </div>
        <div className="third-bar">
          <div className="left">
            <div className="introduction">
              <textarea onChange={this.onChangeTextArea} ref="introduction" placeholder="简介" value={state.introduction}></textarea>
            </div>
            <div className="editor-wrapper" id="blog-wrapper">
              <div id="blog-editor" className="editor">

              </div>
            </div>
          </div>
          <div className="right">
            <div className="keywords-wrapper">
              <div className="title">
                <span></span>点击选择关键词
              </div>
              <input onKeyUp={this.onAddKeywords} ref="addKeywords" className="add" placeholder="添加新关键词" type="text" />
              <div className="keywords">
                <Keywords ref="keywords" />
              </div>
            </div>
          </div>
        </div>
        <div className={'preview-wrapper wangEditor-container' + (state.inPreview ? '' : ' hide')}>
          <div className="content editor wangEditor-txt" dangerouslySetInnerHTML={this.getPreviewContent()} />
          <div onClick={this.onClosePreview} className="close">退出预览</div>
        </div>
      </div>
    );
  }

}

module.exports = Articles;
