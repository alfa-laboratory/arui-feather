import React from 'react';
import { shallow } from 'enzyme';
import Toggle from './toggle';

describe('toggle', () => {
    it('should render without problems', () => {
        let toggle = shallow(<Toggle />);

        expect(toggle).toMatchSnapshot();
    });
});
