import React from 'react/addons';
import AuthLinks from './AuthLinks.js';

const TestUtils = React.addons.TestUtils;
const Simulate = TestUtils.Simulate;

function renderComponent(comp, props) {
  return TestUtils.renderIntoDocument(
    React.createElement(comp, props)
  );
}

function simulateClickOn(selector) {
  var button = this.$el.find(selector)[0];
  React.addons.TestUtils.Simulate.click(button);
}

describe('AuthLinks', () => {
  it('displays correct links', () => {
    let comp = renderComponent(AuthLinks, {linksToUse: "name"});
    expect(comp.props.linksToUse).toEqual("name");
  });
});
