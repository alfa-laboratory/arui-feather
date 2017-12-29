/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { isNodeOutsideElement, isEventOutsideClientBounds } from './window';
import { cleanUp } from '../test-utils';

describe('window utils', () => {
    afterEach(cleanUp);

    describe('isNodeOutsideElement', () => {
        it('should return false - node inside element', () => {
            let container = document.createElement('div');
            container.className = 'container';

            let div = document.createElement('div');
            div.className = 'div';

            container.appendChild(div);
            document.body.appendChild(container);

            expect(isNodeOutsideElement(div, container)).to.be.eql(false);
        });

        it('should return true - node outside element', () => {
            let div1 = document.createElement('div');
            div1.className = 'div1';

            let div2 = document.createElement('div');
            div2.className = 'div2';

            document.body.appendChild(div1);
            document.body.appendChild(div2);

            expect(isNodeOutsideElement(div1, div2)).to.be.eql(true);
        });
    });

    describe('isEventOutsideClientBounds', () => {
        it('should return false - click event inside element rect', () => {
            let isEventOutsideCB;
            let div1 = document.createElement('div');
            div1.className = 'div1';
            div1.style.width = '100px';
            div1.style.height = '100px';
            div1.style.background = 'black';
            // place div1 to 0,0
            document.body.style.margin = '0px';

            div1.addEventListener('click', (event) => {
                isEventOutsideCB = isEventOutsideClientBounds(event, event.target);
            });
            document.body.appendChild(div1);
            div1.click();

            expect(isEventOutsideCB).to.be.eql(false);
        });

        it('should return true - click event outside element rect', () => {
            let isEventOutsideCB;
            let div1 = document.createElement('div');
            div1.className = 'div1';
            div1.style.width = '100px';
            div1.style.height = '100px';
            div1.style.background = 'black';
            document.body.style.margin = '8px';

            document.body.addEventListener('click', (event) => {
                isEventOutsideCB = isEventOutsideClientBounds(event, document.body);
            });
            document.body.appendChild(div1);
            document.body.click();

            expect(isEventOutsideCB).to.be.eql(true);
        });
    });
});
