/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Mask from './mask';

describe('mask', () => {
    it('should set `length` as public property', () => {
        let mask = new Mask('1111');
        expect(mask.length).to.be.equal(4);
    });

    it('should set `firstEditableIndex` as public property', () => {
        let mask = new Mask('+1 111 111-11-11');
        expect(mask.firstEditableIndex).to.be.equal(1);
    });

    it('should set `lastEditableIndex` as public property', () => {
        let mask = new Mask('[ 111 ]');
        expect(mask.lastEditableIndex).to.be.equal(4);
    });

    it('should return `false` during `isEditableIndex` call on not editable index', () => {
        let mask = new Mask('+1 111 111-11-11');
        expect(mask.isEditableIndex(0)).to.be.equal(false);
    });

    it('should return `true` during `isEditableIndex` call on editable index', () => {
        let mask = new Mask('+1 111 111-11-11');
        expect(mask.isEditableIndex(1)).to.be.equal(true);
    });

    it('should format formattable chars during `format` call', () => {
        let mask = new Mask('+1 111 111-11-11');
        expect(mask.format('Adn7903hG7!nd5s2a27-13')).to.be.equal('+7 903 752-27-13');
    });

    it('should format chars with custom formatter', () => {
        const cyrillic = {
            c: {
                validate(char) { return /^[ЁёА-Яа-я]$/.test(char); }
            }
        };
        let mask = new Mask('c 111 cc', cyrillic);
        expect(mask.format('К123Abc(-ук')).to.be.equal('К 123 ук');
    });
});
