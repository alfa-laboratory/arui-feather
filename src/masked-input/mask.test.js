/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Mask from './mask';

describe('mask', () => {
    it('should set `length` as public property', () => {
        const mask = new Mask('1111');

        expect(mask.length).toBe(4);
    });

    it('should set `firstEditableIndex` as public property', () => {
        const mask = new Mask('+1 111 111-11-11');

        expect(mask.firstEditableIndex).toBe(1);
    });

    it('should set `lastEditableIndex` as public property', () => {
        const mask = new Mask('[ 111 ]');

        expect(mask.lastEditableIndex).toBe(4);
    });

    it('should return `false` during `isEditableIndex` call on not editable index', () => {
        const mask = new Mask('+1 111 111-11-11');

        expect(mask.isEditableIndex(0)).toBe(false);
    });

    it('should return `true` during `isEditableIndex` call on editable index', () => {
        const mask = new Mask('+1 111 111-11-11');

        expect(mask.isEditableIndex(1)).toBe(true);
    });

    it('should format formattable chars during `format` call', () => {
        const mask = new Mask('+1 111 111-11-11');

        expect(mask.format('Adn7903hG7!nd5s2a27-13')).toBe('+7 903 752-27-13');
    });

    it('should format formattable chars during `format` call ignoring preformatted chars', () => {
        const mask = new Mask('+7 111 111-11-11');

        expect(mask.format('+7Adn903hG7!nd5s2a27-13')).toBe('+7 903 752-27-13');
    });

    it('should format chars with custom formatter', () => {
        const cyrillic = {
            c: {
                validate(char) {
                    return /^[ЁёА-Яа-я]$/.test(char);
                }
            }
        };
        const mask = new Mask('c 111 cc', cyrillic);

        expect(mask.format('К123Abc(-ук')).toBe('К 123 ук');
    });
});
