//import '../../styles/global.styl';
//import styles from './styles.styl';

import React, { PropTypes } from 'react';
//import CSSModules from 'react-css-modules';

//@CSSModules(styles)
export default class PlanEditor extends React.Component {
  static propTypes = {
    //onSave: PropTypes.func.isRequired,
    plan: PropTypes.object
  }

  handleSave = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.post);
  }

  handleChange = field => event => {
    Meteor.call
    this.setState({
      post: {
        ...this.state.post,
        [field]: event.target.value
      }
    });
  }

  render() {
    const { title, monthlyPrice, setupPrice } = this.props.plan;

    return (
      <div styleName="wrapper">
        <div styleName="editor-container">
          <input
            styleName="input-title"
            value={title}
            onChange={this.handleChange('title')}
            type="text"
            placeholder="Plan title"
          />

          <input
            styleName="input-text"
            onChange={this.handleChange('monthlyPrice')}
            value={monthlyPrice}
            placeholder="0"
            type="number"
          />

          <input
            styleName="input-text"
            onChange={this.handleChange('setupPrice')}
            value={setupPrice}
            placeholder="0"
            type="number"
          />

          <div styleName="btn-container">
            <button
              styleName="btn"
              onClick={this.handleSave}
            >Save</button>
          </div>
        </div>
      </div>
    );
  }
}
