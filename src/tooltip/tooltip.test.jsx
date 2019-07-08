import React from 'react';
import { mount } from 'enzyme';

import Tooltip, { combine } from './tooltip';

describe('tooltip', () => {
    it('should render without problems', () => {
        let elPopup = mount(<Tooltip uniqID='1'><span>TEST</span></Tooltip>);

        expect(elPopup).toMatchSnapshot();
    });

    it('should combine correct selector', () => {
        expect(
            combine(['desktop', 'direction', 'sub-direction'], 'popup')
        ).toEqual('.popup_desktop.popup_direction.popup_sub-direction');
    });
});
