/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';
import timezoneMock from 'timezone-mock';

import addDays from 'date-fns/add_days';
import startOfDay from 'date-fns/start_of_day';
import subtractDays from 'date-fns/sub_days';
import subtractMonth from 'date-fns/sub_months';
import addMonth from 'date-fns/add_months';
import formatDate from 'date-fns/format';

import Calendar from './calendar';

import keyboardCode from '../lib/keyboard-code';

// initialize this later, after we will register timezoneMock
let INITIAL_DAY;
let TODAY_DAY;
const DATE_FORMAT = 'DD.MM.YYYY';

describe('calendar', () => {
    beforeAll(() => {
        timezoneMock.register('UTC');
        INITIAL_DAY = startOfDay(new Date('2016-01-15'));
        TODAY_DAY = startOfDay(new Date());
    });

    afterAll(() => {
        timezoneMock.unregister();
    });

    it('should render without problems', () => {
        let calendar = mount(<Calendar month={ new Date('2018-06-15').valueOf() } />);

        expect(calendar).toMatchSnapshot();
    });

    it('should call `onDayClick` callback on day change', () => {
        let onValueChange = jest.fn();
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                onValueChange={ onValueChange }
            />
        );
        let dateToClick = addDays(INITIAL_DAY, 1);
        let dayNodes = calendar
            .find('.calendar__day')
            .findWhere(e => e.length > 0 && e.props()['data-day'] === dateToClick.valueOf());

        dayNodes.simulate('click');

        expect(onValueChange).toHaveBeenCalledWith(dateToClick.valueOf(), '16.01.2016', false);
    });

    it('should display current date', () => {
        let calendar = mount(<Calendar value={ INITIAL_DAY.valueOf() } />);
        let currentDayNode = calendar.find('.calendar__day_state_current');

        expect(currentDayNode.text()).toContain(INITIAL_DAY.getDate().toString());
    });

    it('should display today', () => {
        let calendar = mount(
            <Calendar
                showToday={ true }
            />
        );
        let todayNode = calendar.find('.calendar__day_state_today');

        expect(todayNode.text()).toContain(TODAY_DAY.getDate().toString());
    });

    it('should display days off', () => {
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                offDays={ [addDays(INITIAL_DAY, 1).valueOf()] }
            />
        );
        let dayOffNode = calendar.find('.calendar__day_type_off');

        if (dayOffNode.length === 0) {
            dayOffNode = calendar.find('.calendar__day_type_weekend-off');
        }

        expect(dayOffNode.text()).toContain(`${addDays(INITIAL_DAY, 1).getDate()}`);
    });

    it('should display event days', () => {
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                eventDays={ [addDays(INITIAL_DAY, 1).valueOf()] }
            />
        );
        let dayOfEventsNode = calendar.find('.calendar__day_event');

        expect(dayOfEventsNode.text()).toContain(`${addDays(INITIAL_DAY, 1).getDate()}`);
    });

    it('should display earlier limit', () => {
        const EARLIER_LIMIT = 4;
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ subtractDays(INITIAL_DAY, EARLIER_LIMIT).valueOf() }
            />
        );
        let daysOffCount = calendar.find('.calendar__day_type_off').length;
        let weekendDaysOffCount = calendar.find('.calendar__day_type_weekend-off').length;

        expect(daysOffCount + weekendDaysOffCount).toEqual(INITIAL_DAY.getDate() - (EARLIER_LIMIT + 1));
    });

    it('should display later limit', () => {
        const LATER_LIMIT = 1;
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ addDays(INITIAL_DAY, LATER_LIMIT).valueOf() }
            />
        );
        let daysCount = (new Date(INITIAL_DAY.getFullYear(), INITIAL_DAY.getMonth() + 1, 0)).getDate();
        let daysOffCount = calendar.find('.calendar__day_type_off').length;
        let weekendDaysOffCount = calendar.find('.calendar__day_type_weekend-off').length;

        expect(daysCount - (INITIAL_DAY.getDate() + LATER_LIMIT)).toEqual(daysOffCount + weekendDaysOffCount);
    });

    it('should re set current day if it is day off with earlier limit', () => {
        const EARLIER_LIMIT = 2;
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ addDays(INITIAL_DAY, EARLIER_LIMIT).valueOf() }
            />
        );
        let currentDay = calendar.find('.calendar__day_state_current');
        let expectedDay = addDays(INITIAL_DAY, EARLIER_LIMIT).valueOf();

        expect(currentDay.props()['data-day']).toEqual(expectedDay);
    });

    it('should re set current day if it is day off with later limit', () => {
        const LATER_LIMIT = 2;
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                laterLimit={ subtractDays(INITIAL_DAY, LATER_LIMIT).valueOf() }
            />
        );
        let currentDay = calendar.find('.calendar__day_state_current');
        let expectedDay = subtractDays(INITIAL_DAY, LATER_LIMIT).valueOf();

        expect(currentDay.props()['data-day']).toEqual(expectedDay);
    });

    it('should call `onMonthChange` callback on month change', () => {
        let onMonthChange = jest.fn();
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                onMonthChange={ onMonthChange }
            />
        );
        let arrowNode = calendar.find('.calendar__arrow_direction_left');

        arrowNode.at(0).simulate('click');

        expect(onMonthChange).toHaveBeenCalledWith((new Date(2015, 0, 1)).valueOf());
    });

    it('should call `onMonthChange` callback when month was changed by arrow key press', () => {
        const LAST_DAY_OF_MONTH = startOfDay(new Date('2016-01-31'));
        let onMonthChange = jest.fn();
        let calendar = mount(
            <Calendar
                value={ LAST_DAY_OF_MONTH.valueOf() }
                onMonthChange={ onMonthChange }
            />
        );

        calendar.simulate('keyDown', { which: keyboardCode.DOWN_ARROW });

        expect(onMonthChange).toHaveBeenCalledWith((new Date(2016, 1, 7)).valueOf());
    });

    it('should select date on next week after down arrow key was pressed', () => {
        let onValueChange = jest.fn();
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                onValueChange={ onValueChange }
            />
        );
        let expectedDate = addDays(INITIAL_DAY, 7);

        calendar.simulate('keyDown', { which: keyboardCode.DOWN_ARROW });

        expect(onValueChange)
            .toHaveBeenCalledWith(expectedDate.valueOf(), formatDate(expectedDate, DATE_FORMAT), true);
    });

    it('should select date on previous week after up arrow key was pressed', () => {
        let onValueChange = jest.fn();
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                onValueChange={ onValueChange }
            />
        );
        let expectedDate = subtractDays(INITIAL_DAY, 7);

        calendar.simulate('keyDown', { which: keyboardCode.UP_ARROW });

        expect(onValueChange)
            .toHaveBeenCalledWith(expectedDate.valueOf(), formatDate(expectedDate, DATE_FORMAT), true);
    });

    it('should select date jump over off day when navigate using keyboard', () => {
        let onValueChange = jest.fn();
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                offDays={ [addDays(INITIAL_DAY, 1).valueOf()] }
                onValueChange={ onValueChange }
            />
        );

        calendar.simulate('keyDown', { which: keyboardCode.RIGHT_ARROW });

        let expectedDate = addDays(INITIAL_DAY, 2);
        expect(onValueChange)
            .toHaveBeenCalledWith(expectedDate.valueOf(), formatDate(expectedDate, DATE_FORMAT), true);
    });

    it('should hide prev year/month arrows when earlier limit is in current month', () => {
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ subtractDays(INITIAL_DAY, 10).valueOf() }
            />
        );

        let prevMonthArrow = calendar.find('.calendar__arrow_direction_left').not('.calendar__arrow_double');
        let prevYearArrow = calendar.find('.calendar__arrow_direction_left.calendar__arrow_double');

        expect(prevMonthArrow.getDOMNode().className).toContain('calendar__arrow_disabled');
        expect(prevYearArrow.getDOMNode().className).toContain('calendar__arrow_disabled');
    });

    it('should hide next year/month arrows when laterLimit is in current month', () => {
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                laterLimit={ addDays(INITIAL_DAY, 10).valueOf() }
            />
        );

        let nextMonthArrow = calendar.find('.calendar__arrow_direction_right').not('.calendar__arrow_double');
        let nextYearArrow = calendar.find('.calendar__arrow_direction_right.calendar__arrow_double');

        expect(nextMonthArrow.getDOMNode().className).toContain('calendar__arrow_disabled');
        expect(nextYearArrow.getDOMNode().className).toContain('calendar__arrow_disabled');
    });

    it('should show prev month arrow when earlierLimit is in prev month', () => {
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ subtractMonth(INITIAL_DAY, 1).valueOf() }
            />
        );

        let prevMonthArrow = calendar.find('.calendar__arrow_direction_left').not('.calendar__arrow_double');

        expect(prevMonthArrow.getDOMNode().className).not.toContain('calendar__arrow_disabled');
    });

    it('should show next month arrow when laterLimit is in next month', () => {
        let calendar = mount(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                laterLimit={ addMonth(INITIAL_DAY, 1).valueOf() }
            />
        );

        let nextMonthArrow = calendar.find('.calendar__arrow_direction_right').not('.calendar__arrow_double');

        expect(nextMonthArrow.getDOMNode().className).not.toContain('calendar__arrow_disabled');
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let calendar = mount(<Calendar />);

        let node = calendar.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
    });
});
