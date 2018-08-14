/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import ResizeSensor from './resize-sensor';

describe('resize-sensor', () => {
    let target;
    beforeEach(() => {
        target = document.createElement('div');

        document.body.appendChild(target);
    });

    afterEach(() => {
        target.remove();
    });

    it('should render without problem', () => {
        let resizeSensor = mount(<ResizeSensor />);

        expect(resizeSensor).toMatchSnapshot();
    });

    it('should call `onResize` callback when `ResizeSensor` detects new dimensions', () => {
        let onResize = jest.fn();
        let resizeSensor = mount(
            <ResizeSensor onResize={ onResize } />,
            { attachTo: target }
        );
        let iframeNode = resizeSensor.find('iframe').getDOMNode();
        iframeNode.contentWindow.dispatchEvent(new Event('resize'));


        expect(onResize).toHaveBeenCalled();
    });
});
