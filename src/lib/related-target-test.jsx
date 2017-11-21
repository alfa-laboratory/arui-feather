/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import getRelatedTarget from './related-target';
import { cleanUp, render } from '../test-utils';

describe('related-target', () => {
    afterEach(cleanUp);

    it('should return relatedTarget on focus', () => {
        let relatedTarget;
        let input = render(<input onFocus={ (event) => { relatedTarget = getRelatedTarget(event); } } />);

        input.node.focus();

        expect(relatedTarget.isEqualNode(input.node)).to.be.true;
    });

    it('should return relatedTarget on blur', (done) => {
        let relatedTarget;
        let input = render(<input onBlur={ (event) => { relatedTarget = getRelatedTarget(event); } } />);

        input.node.focus();

        setTimeout(() => {
            input.node.blur();

            expect(relatedTarget.isEqualNode(document.body)).to.be.true;

            done();
        }, 0);
    });

    it('should return relatedTargets on focus switch between components', (done) => {
        let blurRelatedTarget;
        let focusRelatedTarget;

        let inputs = render(
            <div>
                <input id='foo' onBlur={ (event) => { blurRelatedTarget = getRelatedTarget(event); } } />
                <input id='bar' onFocus={ (event) => { focusRelatedTarget = getRelatedTarget(event); } } />
            </div>
        );
        let inputA = inputs.node.querySelector('#foo');
        let inputB = inputs.node.querySelector('#bar');

        inputA.focus();

        setTimeout(() => {
            inputB.focus();

            expect(blurRelatedTarget.isEqualNode(inputB)).to.be.true;
            expect(focusRelatedTarget.isEqualNode(inputA)).to.be.true;

            done();
        }, 0);
    });
});
