/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import ResizeSensor from './resize-sensor';

describe('resize-sensor', () => {
    afterEach(cleanUp);

    it('should render without problem', () => {
        let resizeSensor = render(<ResizeSensor />);

        expect(resizeSensor.node).to.exist;
    });

    it('should call `onResize` callback when `ResizeSensor` detects new dimensions', (done) => {
        let onResize = sinon.spy();
        let { node } = render(
            <div style={ { position: 'relative', width: '10px', height: '10px' } }>
                <ResizeSensor onResize={ onResize } />
            </div>
        );

        setTimeout(() => {
            node.style.width = '20px';
            node.style.height = '20px';

            setTimeout(() => {
                expect(onResize).to.have.been.called;
                done();
            }, 1000);
        }, 0);
    });
});
