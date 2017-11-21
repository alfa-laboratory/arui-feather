/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import getRelatedTarget from './related-target';
import { render } from '../test-utils';

describe('related-target', () => {
    it('should return expected relatedTargets on focus switch', (done) => {
        let onBlur = sinon.spy(event => event.persist());
        let onFocus = sinon.spy(event => event.persist());
        let inputs = render(
            <div>
                <input id='foo' onBlur={ onBlur } />
                <input id='bar' onFocus={ onFocus } />
            </div>
        );
        let inputA = inputs.node.querySelector('#foo');
        let inputB = inputs.node.querySelector('#bar');

        inputA.focus();

        setTimeout(() => {
            inputB.focus();

            let blurRelatedTarget = getRelatedTarget(onBlur.getCall(0).args[0]);
            let focusRelatedTarget = getRelatedTarget(onFocus.getCall(0).args[0]);

            expect(blurRelatedTarget.isEqualNode(inputB)).to.be.true;
            expect(focusRelatedTarget.isEqualNode(inputA)).to.be.true;

            done();
        }, 0);
    });
});
