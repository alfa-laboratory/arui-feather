/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { Plate } from './plate';
import IconOk from '../icon/ui/ok';

describe('plate', () => {
    it('should render without problems', () => {
        const plate = shallow(<Plate>plate-text</Plate>);

        expect(plate).toMatchSnapshot();
        expect(plate.html()).toContain('plate-text');
    });

    it('should render with cross without problems', () => {
        const plate = shallow(<Plate hasCloser={ true }>plate-text</Plate>);
        const crossNode = plate.find('.plate__closer');

        expect(crossNode).toBeTruthy();
    });

    it('should call `onCloserClick` callback after plate closer was clicked', () => {
        const onCloserClick = jest.fn();
        const plate = shallow(
            <Plate hasCloser={ true } onCloserClick={ onCloserClick }>plate-text</Plate>
        );
        const closer = plate.find('.plate__closer');

        closer.simulate('click');

        expect(onCloserClick).toHaveBeenCalled();
    });

    it('should call `onClick` callback after plate was clicked', () => {
        const onClick = jest.fn();
        const plate = mount(
            <Plate hasCloser={ true } onClick={ onClick }>plate-text</Plate>
        );

        plate.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should call `onFolderClick` callback after plate folder was clicked', () => {
        const onFolderClick = jest.fn();
        const plate = shallow(
            <Plate title='plate-title' foldable={ true } onFolderClick={ onFolderClick }>plate-text</Plate>
        );
        const folder = plate.find('.plate__folder');

        folder.simulate('click');

        expect(onFolderClick).toHaveBeenCalled();
    });

    it('should call `onTitleClick` callback after plate folder was clicked', () => {
        const onTitleClick = jest.fn();
        const plate = shallow(
            <Plate title='plate-title' foldable={ true } onTitleClick={ onTitleClick }>plate-text</Plate>
        );
        const title = plate.find('span');

        title.simulate('click');

        expect(onTitleClick).toHaveBeenCalled();
    });

    it('should render icon when it propperty is setted', () => {
        const plate = shallow(
            <Plate
                title='Успешный'
                type='success'
                hasCloser={ true }
                icon={
                    <IconOk
                        colored={ true }
                    />
                }
            />
        );

        expect(plate).toMatchSnapshot();
        expect(plate.html()).toContain('plate__icon');
    });

});
