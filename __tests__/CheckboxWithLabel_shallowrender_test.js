jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import * as sd from 'skin-deep'
import CheckboxWithLabel from '../CheckboxWithLabel';

describe('CheckboxWithLabel', () => {
  // Using ReactTestUtils shallowRenderer
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
  let checkbox = shallowRenderer.getRenderOutput();

  // Using skin-deep
  let tree = sd.shallowRender(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
  const component = tree.getMountedInstance();

  it('default to unchecked and Off label', () => {
    const inputField = checkbox.props.children[0];
    const textNode = checkbox.props.children[1];
    expect(inputField.props.checked).toBe(false);
    expect(textNode).toEqual("Off");
  });

  // specs using skin-deep shallow render methods
  it('defaults to unchecked and Off (shallow utils)', () => {
    const expectedChildren = [
      <input type="checkbox" checked={false} onChange={component.onChange} />, "Off"
    ];
    expect(tree.props.children).toEqual(expectedChildren);
  });

  it('changes the label after click', () => {
    component.onChange();
    let newResult = tree.getRenderOutput();
    expect(newResult.props.children[1]).toEqual('On');
  })
});
