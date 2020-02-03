import React from 'react';
import { shallow, mount } from 'enzyme';
import { Toggle } from './toggle';

describe('toggle', () => {
    it('should render without problems', () => {
        const toggle = shallow(<Toggle />);

        expect(toggle).toMatchSnapshot();
    });

    it('should set label right align by default', () => {
        const toggle = mount(<Toggle label='default (right) label' />);
        const label = toggle.find('.toggle__label');

        expect(label.getDOMNode().className).toContain('toggle__label_align_right');
    });

    it('should set label align from props', () => {
        const toggle = mount(<Toggle label='right label' labelAlign='left' />);
        const label = toggle.find('.toggle__label');

        expect(label.getDOMNode().className).toContain('toggle__label_align_left');
    });
});
