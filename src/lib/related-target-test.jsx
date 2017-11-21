/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import getRelatedTarget from './related-target';
import { cleanUp, render } from '../test-utils';

describe('related-target', () => {
    afterEach(cleanUp);

    it('should return relatedTarget on focus', () => {
        let onFocus = sinon.spy(event => event.persist());
        let input = render(<input onFocus={ onFocus } />);

        input.node.focus();

        let relatedTarget = getRelatedTarget(onFocus.getCall(0).args[0]);
        expect(relatedTarget.isEqualNode(input.node)).to.be.true;
    });

    it('should return relatedTarget on blur', (done) => {
        let onBlur = sinon.spy(event => event.persist());
        let input = render(<input onBlur={ onBlur } />);

        input.node.focus();

        setTimeout(() => {
            input.node.blur();

            let relatedTarget = getRelatedTarget(onBlur.getCall(0).args[0]);
            expect(relatedTarget.isEqualNode(document.body)).to.be.true;

            done();
        }, 0);
    });

    it('should return relatedTargets on focus switch between components', (done) => {
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
