import React, { PropTypes } from 'react';
import InputStacked from '../../components/Forms/InputStacked';
import styles from './editUserInfo.css';


export default class EditUserInfo extends React.Component {
  static propTypes = {
  }

  constructor() {
    super();
  }

  render() {
    return (
        <div>
          <input type="text" name="emails" value={this.props.email} onChange={this.props.handleEmailChanged}/>
          <input type="text" name="name" className={styles.input} value={this.props.name} onChange={this.props.handleNameChanged}/>
          <p>Enter new email</p>
        </div>
    );
  }
}
