/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { normalizeDate, getRussianWeekDay, parse } from './date-utils';

describe('date utils', () => {
    describe('normalizeDate', () => {
        it('should return Date object when other date is passed', () => {
            const date = new Date();
            const result = normalizeDate(date);

            expect(result).toBeInstanceOf(Date);
            expect(result.valueOf()).toEqual(date.valueOf());
        });

        it('should return Date object when timestamp is passed', () => {
            const timestamp = 1452470400000;
            const result = normalizeDate(timestamp);

            expect(result).toBeInstanceOf(Date);
            expect(result.valueOf()).toEqual(timestamp);
        });
    });

    describe('getRussianWeekDay', () => {
        it('should return correct russian weekday indexes for entire week', () => {
            expect(getRussianWeekDay(new Date('2016-01-11'))).toEqual(0);
            expect(getRussianWeekDay(new Date('2016-01-12'))).toEqual(1);
            expect(getRussianWeekDay(new Date('2016-01-13'))).toEqual(2);
            expect(getRussianWeekDay(new Date('2016-01-14'))).toEqual(3);
            expect(getRussianWeekDay(new Date('2016-01-15'))).toEqual(4);
            expect(getRussianWeekDay(new Date('2016-01-16'))).toEqual(5);
            expect(getRussianWeekDay(new Date('2016-01-17'))).toEqual(6);
        });
    });

    describe('parse', () => {
        it('should parse default russian format', () => {
            expect(parse('01.01.2017').getTime()).toEqual((new Date(2017, 0, 1)).getTime());
        });

        it('should allow to use any symbol as delimiter between date tokens', () => {
            const targetDate = (new Date(2017, 0, 1)).getTime();

            expect(parse('01_01_2017', 'DD_MM_YYYY').getTime()).toEqual(targetDate);
            expect(parse('day: 01, month: 01, year: 2017', 'day: DD, month: MM, year: YYYY').getTime())
                .toEqual(targetDate);
            expect(parse('2017, 01, 01', 'YYYY, MM, DD').getTime()).toEqual(targetDate);
        });

        it('should return start of the month if only YYYY and MM is presented in format', () => {
            const targetDate = (new Date(2017, 0, 1)).getTime();

            expect(parse('01 2017', 'MM YYYY').getTime()).toEqual(targetDate);
        });

        /* eslint-disable no-restricted-globals */
        it('should return invalid date if string didn\'t match input format', () => {
            expect(isNaN(parse('01'))).toEqual(true);
            expect(isNaN(parse('01 01 2017'))).toEqual(true);
            expect(isNaN(parse('01.01'))).toEqual(true);
            expect(isNaN(parse('01.01.201'))).toEqual(true);
            expect(isNaN(parse('01.1.2017'))).toEqual(true);
            expect(isNaN(parse('1.01.2017'))).toEqual(true);
        });

        it('should return invalid date if date tokens is out of ranges', () => {
            expect(isNaN(parse('01.13.2017'))).toEqual(true);
            expect(isNaN(parse('32.01.2017'))).toEqual(true);
        });
        /* eslint-enable no-restricted-globals */

        it('should return valid date if date token is out of range and strict = false', () => {
            const targetDate = (new Date(2017, 0, 1)).getTime();

            expect(parse('32.12.2016', 'DD.MM.YYYY', false).getTime()).toEqual(targetDate);
            expect(parse('01.13.2016', 'DD.MM.YYYY', false).getTime()).toEqual(targetDate);
        });
    });
});
