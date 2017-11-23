/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Autoclosable from './autoclosable';

describe('autoclosable', () => {
    afterEach(cleanUp);

    it('should call `onClickOutside` callback after click outside div', (done) => {
        let onClickOutside = sinon.spy();
        render(
            <Autoclosable onClickOutside={ onClickOutside }>
                <div style={ { position: 'absolute', top: 0, left: 0, width: 100, height: 100 } } />
            </Autoclosable>
        );

        let outsideElement = document.createElement('div');
        outsideElement.setAttribute('style',
            'position: absolute; top: 200; left: 200; width: 100px; height: 100px;'
        );
        document.body.appendChild(outsideElement);

        setTimeout(() => {
            outsideElement.click();
            expect(onClickOutside).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should not call `onClickOutside` callback after click inside div', (done) => {
        let onClickOutside = sinon.spy();
        render(
            <Autoclosable onClickOutside={ onClickOutside }>
                <div className='foo' style={ { width: 100, height: 100 } } />
            </Autoclosable>
        );

        setTimeout(() => {
            document.querySelector('.foo').click();
            expect(onClickOutside).to.not.have.been.called;
            done();
        }, 0);
    });
});
