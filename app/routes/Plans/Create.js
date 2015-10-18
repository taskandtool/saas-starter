import React, { PropTypes } from 'react';
import PlanCreator from '../../components/Plans/PlanCreator';
import {Plans} from '../../schemas';
import Helmet from 'react-helmet';

export default class PlanCreateRoute extends React.Component {

  render() {
    return (
      <div>
        <Helmet
          title="Create New Plan"
          meta={[
              {"name": "description", "content": "Create New Plan"}
          ]}
        />
        <PlanCreator />
      </div>
    );
  }
}
