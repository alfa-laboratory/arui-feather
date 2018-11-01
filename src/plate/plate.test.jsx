/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import Plate from './plate';

describe('plate', () => {
    it('should render without problems', () => {
        let plate = shallow(<Plate>plate-text</Plate>);

        expect(plate).toMatchSnapshot();
        expect(plate.html()).toContain('plate-text');
    });

    it('should render with cross without problems', () => {
        let plate = shallow(<Plate hasCloser={ true }>plate-text</Plate>);
        let crossNode = plate.find('.plate__closer');

        expect(crossNode).toBeTruthy();
    });

    it('should call `onCloserClick` callback after plate closer was clicked', () => {
        let onCloserClick = jest.fn();
        let plate = shallow(
            <Plate hasCloser={ true } onCloserClick={ onCloserClick }>plate-text</Plate>
        );
        let closer = plate.find('.plate__closer');

        closer.simulate('click');

        expect(onCloserClick).toHaveBeenCalled();
    });

    it('should call `onClick` callback after plate was clicked', () => {
        let onClick = jest.fn();
        let plate = mount(
            <Plate hasCloser={ true } onClick={ onClick }>plate-text</Plate>
        );

        plate.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });
});
