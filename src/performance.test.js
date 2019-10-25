/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { isEqual } from './performance';

describe('isEqual', () => {
    describe('shallow equality', () => {
        it('should return `true` when equal primitive values passed', () => {
            expect(isEqual(42, 42)).toBe(true);
            expect(isEqual('str', 'str')).toBe(true);
            expect(isEqual(null, null)).toBe(true);
            expect(isEqual(undefined, undefined)).toBe(true);
            expect(isEqual(NaN, NaN)).toBe(true);
            expect(isEqual(Infinity, Infinity)).toBe(true);
            expect(isEqual(-Infinity, -Infinity)).toBe(true);
        });

        it('should return `false` when different primitive values passed', () => {
            expect(isEqual(42, 'str')).toBe(false);
            expect(isEqual(1, 3)).toBe(false);
            expect(isEqual(-0, 0)).toBe(false);
            expect(isEqual(undefined, NaN)).toBe(false);
            expect(isEqual(Infinity, -Infinity)).toBe(false);
        });

        it('should return `true` when same objects are passed', () => {
            const object = { foo: 'bar' };

            expect(isEqual(object, object)).toBe(true);
        });

        it('should return `true` when same arrays are passed', () => {
            const array = [4, 8, 15, 16, 23, 42];

            expect(isEqual(array, array)).toBe(true);
        });

        it('should return `true` when different objects with same values are passed', () => {
            const object = { foo: 'bar' };

            expect(isEqual(object, { ...object })).toBe(true);
        });

        it('should return `true` when different arrays with same values are passed', () => {
            const array = [4, 8, 15, 16, 23, 42];

            expect(isEqual(array, array.slice(0))).toBe(true);
        });

        it('should return `false` when objects has props with different primitive values', () => {
            const object1 = { foo: 'bar' };
            const object2 = { foo: 'buz' };

            expect(isEqual(object1, object2)).toBe(false);
        });

        it('should return `true` when objects has props with same object values', () => {
            const child = { foobar: 42 };
            const object1 = { foo: 'bar', child };
            const object2 = { foo: 'bar', child };

            expect(isEqual(object1, object2)).toBe(true);
        });

        it('should return `false` when objects has props with different objects', () => {
            const child = { foobar: 42 };
            const object1 = { foo: 'bar', child };
            const object2 = { foo: 'bar', child: { ...child } };

            expect(isEqual(object1, object2)).toBe(false);
        });
    });

    describe('deep equality', () => {
        it('should return `true` when objects has props with different objects', () => {
            const child = { foobar: 42 };
            const object1 = { foo: 'bar', child };
            const object2 = { foo: 'bar', child: { ...child } };

            expect(isEqual(object1, object2, true)).toBe(true);
        });
    });
});
