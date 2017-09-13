/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import ProgressBar from './progress-bar';

describe('progress-bar', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let progressBar = render(<ProgressBar />);

        expect(progressBar.node).to.exist;
        expect(progressBar.node).to.have.class('progress-bar');
    });

    it('should display current value', () => {
        let progressBar = render(<ProgressBar percent={ 50 } />);
        let currentValueWrapper = progressBar.node.querySelector('.progress-bar__current-value');

        expect(currentValueWrapper).to.have.attribute('style', 'width: 50%;');
    })
});
