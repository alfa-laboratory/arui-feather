/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { normalizeDate, getRussianWeekDay, parse } from './date-utils';

describe('date utils', () => {
    describe('normalizeDate', () => {
        it('should return Date object when other date is passed', () => {
            let date = new Date();
            let result = normalizeDate(date);
            expect(result).to.be.instanceof(Date);
            expect(result.valueOf()).to.be.eql(date.valueOf());
        });

        it('should return Date object when timestamp is passed', () => {
            let timestamp = 1452470400000;
            let result = normalizeDate(timestamp);
            expect(result).to.be.instanceof(Date);
            expect(result.valueOf()).to.be.eql(timestamp);
        });
    });


    describe('getRussianWeekDay', () => {
        it('should return correct russian weekday indexes for entire week', () => {
            expect(getRussianWeekDay(new Date('2016-01-11'))).to.be.eql(0);
            expect(getRussianWeekDay(new Date('2016-01-12'))).to.be.eql(1);
            expect(getRussianWeekDay(new Date('2016-01-13'))).to.be.eql(2);
            expect(getRussianWeekDay(new Date('2016-01-14'))).to.be.eql(3);
            expect(getRussianWeekDay(new Date('2016-01-15'))).to.be.eql(4);
            expect(getRussianWeekDay(new Date('2016-01-16'))).to.be.eql(5);
            expect(getRussianWeekDay(new Date('2016-01-17'))).to.be.eql(6);
        });
    });

    describe('parse', () => {
        it('should parse default russian format', () => {
            expect(parse('01.01.2017').getTime()).to.be.eql((new Date(2017, 0, 1)).getTime());
        });

        it('should allow to use any symbol as delimiter between date tokens', () => {
            const targetDate = (new Date(2017, 0, 1)).getTime();

            expect(parse('01_01_2017', 'DD_MM_YYYY').getTime()).to.be.eq(targetDate);
            expect(parse('day: 01, month: 01, year: 2017', 'day: DD, month: MM, year: YYYY').getTime())
                .to.be.eq(targetDate);
            expect(parse('2017, 01, 01', 'YYYY, MM, DD').getTime()).to.be.eq(targetDate);
        });

        it('should return start of the month if only YYYY and MM is presented in format', () => {
            const targetDate = (new Date(2017, 0, 1)).getTime();

            expect(parse('01 2017', 'MM YYYY').getTime()).to.be.eq(targetDate);
        });

        it('should return invalid date if string didn\'t match input format', () => {
            expect(isNaN(parse('01'))).to.be.eq(true);
            expect(isNaN(parse('01 01 2017'))).to.be.eq(true);
            expect(isNaN(parse('01.01'))).to.be.eq(true);
            expect(isNaN(parse('01.01.201'))).to.be.eq(true);
            expect(isNaN(parse('01.1.2017'))).to.be.eq(true);
            expect(isNaN(parse('1.01.2017'))).to.be.eq(true);
        });

        it('should return invalid date if date tokens is out of ranges', () => {
            expect(isNaN(parse('01.13.2017'))).to.be.eq(true);
            expect(isNaN(parse('32.01.2017'))).to.be.eq(true);
        });

        it('should return valid date if date token is out of range and strict = false', () => {
            const targetDate = (new Date(2017, 0, 1)).getTime();

            expect(parse('32.12.2016', 'DD.MM.YYYY', false).getTime()).to.be.eq(targetDate);
            expect(parse('01.13.2016', 'DD.MM.YYYY', false).getTime()).to.be.eq(targetDate);
        });
    });
});
