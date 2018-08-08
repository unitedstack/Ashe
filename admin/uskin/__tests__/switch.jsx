import React from 'react';
import {shallow} from 'enzyme';

import Switch from '../js/components/switch/index';

describe('test switch', () => {

  const LABEL_ON = 'ON';
  const LABEL_OFF = 'OFF';

  it('renders switch', () => {

    const checkbox = shallow(<Switch labelOn={LABEL_ON} labelOff={LABEL_OFF} />);
    const label = checkbox.find('label');

    expect(label.text()).toBe(LABEL_OFF);

  });

  it('renders switch witth unchecked', () => {

    const checkbox = shallow(<Switch labelOn={LABEL_ON} labelOff={LABEL_OFF} checked={true} />);
    const label = checkbox.find('label');

    expect(label.text()).toBe(LABEL_ON);

  });

  it('tests onclick', () => {

    let listener = jest.genMockFunction();
    const checkbox = shallow(
      <Switch labelOn={LABEL_ON} labelOff={LABEL_OFF} checked={true} onChange={listener} />
    );

    const input = checkbox.find('input');
    input.simulate('change');
    const label = checkbox.find('label');

    expect(label.text()).toBe(LABEL_OFF);
    expect(listener.mock.calls[0][1]).toBeFalsy();

    input.simulate('change');
    const label2 = checkbox.find('label');

    expect(label2.text()).toBe(LABEL_ON);
    expect(listener.mock.calls[1][1]).toBeTruthy();

  });

  it('tests onclick with no listener', () => {

    const checkbox = shallow(
      <Switch labelOn={LABEL_ON} labelOff={LABEL_OFF} />
    );

    const input = checkbox.find('input');
    input.simulate('change');
    const label = checkbox.find('label');

    expect(label.text()).toBe(LABEL_ON);

  });

  it('tests disabled switch', () => {

    let listener = jest.genMockFunction();
    const checkbox = shallow(
      <Switch labelOn={LABEL_ON} labelOff={LABEL_OFF} disabled={true} onChange={listener} />
    );

    const input = checkbox.find('input');
    input.simulate('change');

    expect(listener).not.toBeCalled();

  });

});
