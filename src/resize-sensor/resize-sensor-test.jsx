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

    it('should call `onResize` callback when `ResizeSensor` was change dimensions', (done) => {
        let onResize = sinon.spy();
        render(
            <div id='resize-sensor-parent' style={ { position: 'relative', width: '10px', height: '10px' } }>
                <ResizeSensor onResize={ onResize } />
            </div>
        );
        let resizeSensorNode = document.getElementById('resize-sensor-parent');

        setTimeout(() => {
            resizeSensorNode.style.width = '20px';
            resizeSensorNode.style.height = '20px';

            setTimeout(() => {
                expect(onResize).to.have.been.called;
                done();
            }, 100);
        }, 0);
    });
});
