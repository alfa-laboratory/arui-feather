import React from 'react';
import { mount } from 'enzyme';

import Tooltip from './tooltip';

describe('tooltip', () => {
    it('should render without problems', () => {
        let elPopup = mount(<Tooltip uniqID='1'><span>TEST</span></Tooltip>);

        expect(elPopup).toMatchSnapshot();
    });
});
