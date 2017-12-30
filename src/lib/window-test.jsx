/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { isEventOusideBounds, isNodeOutsideElement, isEventOutsideClientBounds } from './window';
import { cleanUp } from '../test-utils';

describe('window utils', () => {
    afterEach(() => {
        cleanUp();
        document.body.style.margin = '0px';
    });

    describe('isEventOusideBounds', () => {
        it('should return false if click event is inside of element rect', () => {
            let isEventOutsideCB;
            let elem = document.createElement('div');
            elem.style.width = '100px';
            elem.style.height = '100px';
            document.body.style.margin = '0px';

            elem.addEventListener('click', (event) => {
                isEventOutsideCB = isEventOusideBounds(event, event.target);
            });
            document.body.appendChild(elem);
            elem.click();

            expect(isEventOutsideCB).to.be.false;
        });

        it('should return true if click event is outside of element rect', () => {
            let isEventOutsideCB;
            let elem = document.createElement('div');
            elem.style.width = '100px';
            elem.style.height = '100px';
            document.body.style.margin = '8px';

            document.body.addEventListener('click', (event) => {
                isEventOutsideCB = isEventOusideBounds(event, document.body);
            });
            document.body.appendChild(elem);
            document.body.click();

            expect(isEventOutsideCB).to.be.true;
        });
    });

    describe('isNodeOutsideElement', () => {
        it('should return false if node is inside of element', () => {
            let container = document.createElement('div');
            let elem = document.createElement('div');

            container.appendChild(elem);
            document.body.appendChild(container);

            expect(isNodeOutsideElement(elem, container)).to.be.false;
        });

        it('should return true if node is outside of element', () => {
            let elem1 = document.createElement('div');
            let elem2 = document.createElement('div');

            document.body.appendChild(elem1);
            document.body.appendChild(elem2);

            expect(isNodeOutsideElement(elem1, elem2)).to.be.true;
        });
    });

    describe('isEventOutsideClientBounds', () => {
        it('should return false if click event is inside of element rect', () => {
            let isEventOutsideCB;
            let elem = document.createElement('div');
            elem.style.width = '100px';
            elem.style.height = '100px';
            document.body.style.margin = '0px';

            elem.addEventListener('click', (event) => {
                isEventOutsideCB = isEventOutsideClientBounds(event, event.target);
            });
            document.body.appendChild(elem);
            elem.click();

            expect(isEventOutsideCB).to.be.false;
        });

        it('should return true if click event is outside of element rect', () => {
            let isEventOutsideCB;
            let elem = document.createElement('div');
            elem.style.width = '100px';
            elem.style.height = '100px';
            document.body.style.margin = '8px';

            document.body.addEventListener('click', (event) => {
                isEventOutsideCB = isEventOutsideClientBounds(event, document.body);
            });
            document.body.appendChild(elem);
            document.body.click();

            expect(isEventOutsideCB).to.be.true;
        });
    });
});
