require('./style/index.less');
const React = require('react');

class Loading extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blog-module-com-pop-loading">
        <div className="icon">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
      </div>
    );
  }

}

module.exports = Loading;
