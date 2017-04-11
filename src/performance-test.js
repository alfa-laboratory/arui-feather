/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { isEqual } from './performance';

describe('isEqual', function () {
    describe('shallow equality', function () {
        it('should return `true` when equal primitive values passed', function () {
            expect(isEqual(42, 42)).to.equal(true);
            expect(isEqual('str', 'str')).to.equal(true);
            expect(isEqual(null, null)).to.equal(true);
            expect(isEqual(undefined, undefined)).to.equal(true);
            expect(isEqual(NaN, NaN)).to.equal(true);
            expect(isEqual(Infinity, Infinity)).to.equal(true);
            expect(isEqual(-Infinity, -Infinity)).to.equal(true);
        });

        it('should return `false` when different primitive values passed', function () {
            expect(isEqual(42, 'str')).to.equal(false);
            expect(isEqual(1, 3)).to.equal(false);
            expect(isEqual(-0, 0)).to.equal(false);
            expect(isEqual(undefined, NaN)).to.equal(false);
            expect(isEqual(Infinity, -Infinity)).to.equal(false);
        });

        it('should return `true` when same objects are passed', function () {
            const object = { foo: 'bar' };
            expect(isEqual(object, object)).to.equal(true);
        });

        it('should return `true` when same arrays are passed', function () {
            const array = [4, 8, 15, 16, 23, 42];
            expect(isEqual(array, array)).to.equal(true);
        });

        it('should return `true` when different objects with same values are passed', function () {
            const object = { foo: 'bar' };
            expect(isEqual(object, { ...object })).to.equal(true);
        });

        it('should return `true` when different arrays with same values are passed', function () {
            const array = [4, 8, 15, 16, 23, 42];
            expect(isEqual(array, array.slice(0))).to.equal(true);
        });

        it('should return `false` when objects has props with different primitive values', function () {
            const object1 = { foo: 'bar' };
            const object2 = { foo: 'buz' };
            expect(isEqual(object1, object2)).to.equal(false);
        });

        it('should return `true` when objects has props with same object values', function () {
            const child = { foobar: 42 };
            const object1 = { foo: 'bar', child };
            const object2 = { foo: 'bar', child };
            expect(isEqual(object1, object2)).to.equal(true);
        });

        it('should return `false` when objects has props with different objects', function () {
            const child = { foobar: 42 };
            const object1 = { foo: 'bar', child };
            const object2 = { foo: 'bar', child: { ...child } };

            expect(isEqual(object1, object2)).to.equal(false);
        });
    });

    describe('deep equality', function () {
        it('should return `true` when objects has props with different objects', function () {
            const child = { foobar: 42 };
            const object1 = { foo: 'bar', child };
            const object2 = { foo: 'bar', child: { ...child } };

            expect(isEqual(object1, object2, true)).to.equal(true);
        });
    });
});
