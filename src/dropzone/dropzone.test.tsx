/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { Dropzone } from './dropzone';

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
        const dropzone = mount(<Dropzone />);

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

    it('should call `onDrop` callback after drop file on DropZone', () => {
        const onDrop = jest.fn();
        const dropzone = mount(<Dropzone onDrop={ onDrop } />);

        dropzone.simulate('drop', { dataTransfer });

        expect(onDrop).toHaveBeenCalledTimes(1);
    });

    it('should call `onDragEnter` callback after drop file on DropZone', () => {
        const onDragEnter = jest.fn();
        const dropzone = mount(<Dropzone onDragEnter={ onDragEnter } />);

        dropzone.simulate('dragenter', { dataTransfer });

        expect(onDragEnter).toHaveBeenCalledTimes(1);
    });

    it('should call `onDragLeave` callback after drop file on DropZone', () => {
        const onDragLeave = jest.fn();
        const dropzone = mount(<Dropzone onDragLeave={ onDragLeave } />);

        dropzone.simulate('dragleave');

        expect(onDragLeave).toHaveBeenCalledTimes(1);
    });

    it('should call `onDragOver` callback after drop file on DropZone', () => {
        const onDragOver = jest.fn();
        const dropzone = mount(<Dropzone onDragOver={ onDragOver } />);

        dropzone.simulate('dragover');

        expect(onDragOver).toHaveBeenCalledTimes(1);
    });

    it('onDrop should recieve files list', () => {
        const onDrop = jest.fn();
        const dropzone = mount(<Dropzone onDrop={ onDrop } />);

        dropzone.simulate('drop', { dataTransfer });

        expect(onDrop.mock.calls[0][0]).toEqual(filesList);
    });
});
