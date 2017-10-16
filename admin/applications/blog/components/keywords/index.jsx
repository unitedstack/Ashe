require('./style/index.less');
const React = require('react');

class Keywords extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      keywords: [],
      selected: []
    };
  }

  onSwitch(k) {
    let selected = this.state.selected,
      i = selected.indexOf(k);

    i > -1 ? selected.splice(i, 1) : selected.push(k);

    this.setState({
      selected: selected
    });
  }

  render() {
    let state = this.state,
      keywords = state.keywords,
      selected = state.selected;
    return (
      <div className="blog-module-keywords">
        <ul className="items-wrapper">
          {
            keywords.map((k, i) => {
              return <li key={i} onClick={this.onSwitch.bind(this, k)} className={selected.indexOf(k) > -1 ? 'active' : ''}>{k}</li>;
            })
          }
        </ul>
      </div>
    );
  }

}

module.exports = Keywords;
