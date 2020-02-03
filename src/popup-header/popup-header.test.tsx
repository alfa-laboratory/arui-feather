/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow } from 'enzyme';

import { PopupHeader } from './popup-header';

describe('popup-header', () => {
    it('should render without problems', () => {
        const popupHeader = shallow(<PopupHeader title='Title' />);

        expect(popupHeader).toMatchSnapshot();
        expect(popupHeader.text()).toContain('Title');
    });

    it('should call `onCloserClick` callback after closer was clicked', () => {
        const onCloserClick = jest.fn();
        const popupHeader = shallow(<PopupHeader onCloserClick={ onCloserClick } />);
        const closer = popupHeader.find('.popup-header__closer');

        closer.simulate('click');

        expect(onCloserClick).toHaveBeenCalled();
    });
});
