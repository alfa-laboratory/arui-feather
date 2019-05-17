import React from 'react';
import { mount } from 'enzyme';

import ElementPopup from './element-popup';

describe('element-popup', () => {
    it('should render without problems', () => {
        let elPopup = mount(<ElementPopup uniqID='1'><span>TEST</span></ElementPopup>);

        expect(elPopup).toMatchSnapshot();
    });
});
