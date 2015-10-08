import React, { PropTypes } from 'react';
import PlanCreator from '../../components/Plans/PlanCreator';
import {Plans} from '../../collections';

export default class PlanCreateRoute extends React.Component {

  render() {
    return (
      <PlanCreator />
    );
  }
}
