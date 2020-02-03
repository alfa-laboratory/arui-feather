/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';
import { ProgressBar } from './progress-bar';

describe('progress-bar', () => {
    it('should render without problems', () => {
        const progressBar = mount(<ProgressBar />);

        expect(progressBar).toMatchSnapshot();
    });

    it('should display current value', () => {
        const progressBar = mount(<ProgressBar percent={ 50 } />);
        const currentValueWrapper = progressBar.find('.progress-bar__current-value');

        expect(currentValueWrapper.getDOMNode().getAttribute('style')).toEqual('width: 50%;');
    });
});
