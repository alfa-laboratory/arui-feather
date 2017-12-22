/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import addDays from 'date-fns/add_days';
import startOfDay from 'date-fns/start_of_day';
import subtractDays from 'date-fns/sub_days';
import subtractMonth from 'date-fns/sub_months';
import addMonth from 'date-fns/add_months';

import Calendar from './calendar';

import keyboardCode from '../lib/keyboard-code';
import { render, cleanUp, simulate } from '../test-utils';

const INITIAL_DAY = startOfDay(new Date('2016-01-15'));
const TODAY_DAY = startOfDay(new Date());

describe('calendar', () => {
    afterEach(cleanUp);

    it('should call `onDayClick` callback on day change', () => {
        let onValueChange = sinon.spy();
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                onValueChange={ onValueChange }
            />
        );
        let dayNodes = calendar.node.querySelectorAll('.calendar__day[data-day]');

        dayNodes[15].click();

        expect(onValueChange).to.have.been.calledWith(addDays(INITIAL_DAY, 1).valueOf(), '16.01.2016');
    });

    it('should render without problems', () => {
        let calendar = render(<Calendar />);

        expect(calendar.node).to.exist;
        expect(calendar.node).to.have.class('calendar');
    });

    it('should display current date', () => {
        let calendar = render(<Calendar value={ INITIAL_DAY.valueOf() } />);
        let currentDayNode = calendar.node.querySelector('.calendar__day_state_current');

        expect(currentDayNode).to.exist;
        expect(currentDayNode).to.have.text(INITIAL_DAY.getDate().toString());
    });

    it('should display today', () => {
        let calendar = render(
            <Calendar
                showToday={ true }
            />
        );
        let todayNode = calendar.node.querySelector('.calendar__day_state_today');

        expect(todayNode).to.exist;
        expect(todayNode).to.have.text(TODAY_DAY.getDate().toString());
    });

    it('should display days off', () => {
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                offDays={ [addDays(INITIAL_DAY, 1).valueOf()] }
            />
        );
        let dayOffNode = calendar.node.querySelector('.calendar__day_type_off')
            || calendar.node.querySelector('.calendar__day_type_weekend-off');

        expect(dayOffNode).to.exist;
        expect(dayOffNode).to.have.text(`${addDays(INITIAL_DAY, 1).getDate()}`);
    });

    it('should display event days', () => {
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                daysOfEvents={ [addDays(INITIAL_DAY, 1).valueOf()] }
            />
        );
        let dayOfEventsNode = calendar.node.querySelector('.calendar__day_event');

        expect(dayOfEventsNode).to.exist;
        expect(dayOfEventsNode).to.have.text(`${addDays(INITIAL_DAY, 1).getDate()}`);
    });

    it('should display earlier limit', () => {
        const EARLIER_LIMIT = 4;
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ subtractDays(INITIAL_DAY, EARLIER_LIMIT).valueOf() }
            />
        );
        let daysOffCount = calendar.node.querySelectorAll('.calendar__day_type_off').length;
        let weekendDaysOffCount = calendar.node.querySelectorAll('.calendar__day_type_weekend-off').length;

        expect(daysOffCount + weekendDaysOffCount).to.equal(INITIAL_DAY.getDate() - (EARLIER_LIMIT + 1));
    });

    it('should display later limit', () => {
        const LATER_LIMIT = 1;
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ addDays(INITIAL_DAY, LATER_LIMIT).valueOf() }
            />
        );
        let daysCount = (new Date(INITIAL_DAY.getFullYear(), INITIAL_DAY.getMonth() + 1, 0)).getDate();
        let daysOffCount = calendar.node.querySelectorAll('.calendar__day_type_off').length;
        let weekendDaysOffCount = calendar.node.querySelectorAll('.calendar__day_type_weekend-off').length;

        expect(daysCount - (INITIAL_DAY.getDate() + LATER_LIMIT)).to.equal(daysOffCount + weekendDaysOffCount);
    });

    it('should re set current day if it is day off with earlier limit', () => {
        const EARLIER_LIMIT = 2;
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ addDays(INITIAL_DAY, EARLIER_LIMIT).valueOf() }
            />
        );
        let currentDay = calendar.node.querySelector('.calendar__day_state_current');
        let expectedDay = addDays(INITIAL_DAY, EARLIER_LIMIT).valueOf().toString();

        expect(currentDay).to.have.attr('data-day', expectedDay);
    });

    it('should re set current day if it is day off with later limit', () => {
        const LATER_LIMIT = 2;
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                laterLimit={ subtractDays(INITIAL_DAY, LATER_LIMIT).valueOf() }
            />
        );
        let currentDay = calendar.node.querySelector('.calendar__day_state_current');
        let expectedDay = subtractDays(INITIAL_DAY, LATER_LIMIT).valueOf().toString();

        expect(currentDay).to.have.attr('data-day', expectedDay);
    });

    it('should call `onMonthChange` callback on month change', () => {
        let onMonthChange = sinon.spy();
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                onMonthChange={ onMonthChange }
            />
        );
        let arrowNode = calendar.node.querySelector('.calendar__arrow_direction_left');

        arrowNode.click();

        expect(onMonthChange).to.have.been.calledWith((new Date(2015, 0, 1)).valueOf());
    });

    it('should call `onMonthChange` callback when month was changed by arrow key press', () => {
        const LAST_DAY_OF_MONTH = startOfDay(new Date('2016-01-31'));
        let onMonthChange = sinon.spy();
        let calendar = render(
            <Calendar
                value={ LAST_DAY_OF_MONTH.valueOf() }
                onMonthChange={ onMonthChange }
            />
        );

        simulate(calendar.node, 'keyDown', { which: keyboardCode.DOWN_ARROW });

        expect(onMonthChange).to.have.been.calledWith((new Date(2016, 1, 7)).valueOf());
    });

    it('should select date on next week after down arrow key was pressed', () => {
        let onValueChange = sinon.spy();
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                onValueChange={ onValueChange }
            />
        );

        simulate(calendar.node, 'keyDown', { which: keyboardCode.DOWN_ARROW });

        expect(onValueChange).to.have.been.calledWith(addDays(INITIAL_DAY, 7).valueOf());
    });

    it('should select date on previous week after up arrow key was pressed', () => {
        let onValueChange = sinon.spy();
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                onValueChange={ onValueChange }
            />
        );

        simulate(calendar.node, 'keyDown', { which: keyboardCode.UP_ARROW });

        expect(onValueChange).to.have.been.calledWith(subtractDays(INITIAL_DAY, 7).valueOf());
    });

    it('should select date jump over off day when navigate using keyboard', () => {
        let onValueChange = sinon.spy();
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                offDays={ [addDays(INITIAL_DAY, 1).valueOf()] }
                onValueChange={ onValueChange }
            />
        );

        simulate(calendar.node, 'keyDown', { which: keyboardCode.RIGHT_ARROW });

        expect(onValueChange).to.have.been.calledWith(addDays(INITIAL_DAY, 2).valueOf());
    });

    it('should hide prev year/month arrows when earlier limit is in current month', () => {
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ subtractDays(INITIAL_DAY, 10).valueOf() }
            />
        );

        let prevMonthArrow = calendar.node
            .querySelector('.calendar__arrow_direction_left:not(.calendar__arrow_double)');
        let prevYearArrow = calendar.node.querySelector('.calendar__arrow_direction_left.calendar__arrow_double');

        expect(prevMonthArrow).to.have.class('calendar__arrow_disabled');
        expect(prevYearArrow).to.have.class('calendar__arrow_disabled');
    });

    it('should hide next year/month arrows when laterLimit is in current month', () => {
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                laterLimit={ addDays(INITIAL_DAY, 10).valueOf() }
            />
        );

        let nextMonthArrow = calendar.node
            .querySelector('.calendar__arrow_direction_right:not(.calendar__arrow_double)');
        let nextYearArrow = calendar.node.querySelector('.calendar__arrow_direction_right.calendar__arrow_double');

        expect(nextMonthArrow).to.have.class('calendar__arrow_disabled');
        expect(nextYearArrow).to.have.class('calendar__arrow_disabled');
    });

    it('should show prev month arrow when earlierLimit is in prev month', () => {
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                earlierLimit={ subtractMonth(INITIAL_DAY, 1).valueOf() }
            />
        );

        let prevMonthArrow = calendar.node
            .querySelector('.calendar__arrow_direction_left:not(.calendar__arrow_double)');

        expect(prevMonthArrow).to.not.have.class('calendar__arrow_disabled');
    });

    it('should show next month arrow when laterLimit is in next month', () => {
        let calendar = render(
            <Calendar
                value={ INITIAL_DAY.valueOf() }
                laterLimit={ addMonth(INITIAL_DAY, 1).valueOf() }
            />
        );

        let nextMonthArrow = calendar.node
            .querySelector('.calendar__arrow_direction_right:not(.calendar__arrow_double)');

        expect(nextMonthArrow).to.not.have.class('calendar__arrow_disabled');
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let calendar = render(<Calendar />);

        let node = calendar.instance.getNode();

        expect(node).to.be.instanceOf(HTMLElement);
        expect(node).to.be.equal(calendar.node);
    });
});
