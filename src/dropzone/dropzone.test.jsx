/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import Dropzone from './dropzone';

describe('dropzone', () => {
    const filesList = [
        { name: 'test1.txt', type: 'application/text' },
        { name: 'test2.txt', type: 'application/text' },
        { name: 'test3.txt', type: 'application/text' }
    ];
    const dataTransfer = {
        files: filesList,
        items: filesList,
        clearData: () => {}
    };

    it('should render without problems', () => {
        let dropzone = mount(<Dropzone />);

        expect(dropzone).toMatchSnapshot();
    });

    it('should set/unset class `dropzone__view_active` on dragEnter', () => {
        const dropzone = mount(<Dropzone />);
        const dropzoneView = dropzone.find('.dropzone__view');

        dropzone.simulate('dragenter', { dataTransfer });
        expect(dropzoneView.getDOMNode().className).toContain('dropzone__view_active');

        dropzone.simulate('dragLeave');
        expect(dropzone.getDOMNode().className).not.toContain('.dropzone__view_active');
    });
});
