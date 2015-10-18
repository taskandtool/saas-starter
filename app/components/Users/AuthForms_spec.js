import React from 'react/addons';
import AuthForms from './AuthForms.js';

const TestUtils = React.addons.TestUtils;
const Simulate = TestUtils.Simulate;

function renderComponent(comp, props) {
  return TestUtils.renderIntoDocument(
    React.createElement(comp, props)
  );
}

function simulateClickOn(selector) {
  var button = this.$el.find(selector)[0];
  Simulate.click(button);
}

describe('AuthForms', () => {
  it('renders form errors', () => {
    let comp = renderComponent(AuthForms, {formError: "An Error"});
    expect(comp.props.formError).toEqual('An Error');
  });
});
