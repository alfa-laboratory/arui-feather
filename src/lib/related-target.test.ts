/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import getRelatedTarget from './related-target';

describe('related-target', () => {
    it('should return relatedTarget if event has it', () => {
        const target = new EventTarget();

        const eventStub = new MouseEvent('click', { relatedTarget: target });
        const result = getRelatedTarget(eventStub);

        expect(result).toBe(target);
    });

    it('should return document.activeElement if not relatedTarget available in event object', () => {
        const eventStub = new MouseEvent('click');
        const result = getRelatedTarget(eventStub);

        expect(result).toBe(document.activeElement);
    });
});
