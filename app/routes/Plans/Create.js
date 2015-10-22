import React, { PropTypes } from 'react';
import PlanCreator from '../../components/Plans/PlanCreator';
import {Plans} from '../../schemas';
import Helmet from 'react-helmet';
import InputStacked from '../../components/Forms/InputStacked';

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
        <PlanCreator handleAddFeature={this.handleAddFeature} />
      </div>
    );
  }

  handleAddFeature() {
    React.CreateElement(
      <InputStacked
        type="text"
        name="feature"
        label="Feature"
        value={values.feature}
        errorMsg={errors.feature}
        handleChange={this.props.handleChange}
        />);
  }
}
