/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React from 'react';
import { shallow, mount } from 'enzyme';

import CalendarInput from './calendar-input';
import * as calendarUtils from './utils';
import keyboardCode from '../lib/keyboard-code';
import { SCROLL_TO_CORRECTION } from '../vars';
import { setIsMatched as setMqMatched } from '../mq/mq';

jest.mock('../mq/mq');

describe('calendar-input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
        setMqMatched(false);
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        let calendarInput = shallow(<CalendarInput value='01.06.2018' />);

        expect(calendarInput).toMatchSnapshot();
    });

    it('should render with calendar icon by default', () => {
        let calendarInput = mount(<CalendarInput />);
        let iconNode = calendarInput.find('IconButton');

        expect(iconNode.length).toBe(1);
    });

    it('should render without calendar icon with withIcon=false', () => {
        let calendarInput = mount(<CalendarInput withIcon={ false } />);
        let iconNode = calendarInput.find('IconButton');

        expect(iconNode.length).toBe(0);
    });

    it('should call `onInputChange` callback after input value was changed', () => {
        let onInputChange = jest.fn();
        let calendarInput = mount(<CalendarInput onInputChange={ onInputChange } />);


        calendarInput.find('input').simulate('change');

        expect(onInputChange).toHaveBeenCalled();
    });

    it('should call `onChange` callback after input value was changed', () => {
        let onChange = jest.fn();
        let calendarInput = mount(<CalendarInput onChange={ onChange } />);

        calendarInput.find('input').simulate('change');

        expect(onChange).toHaveBeenCalled();
    });

    it('should focus input on after `focus` call', () => {
        let calendarInput = mount(<CalendarInput />);
        let focusTarget = calendarInput.instance().customCalendarTarget;
        jest.spyOn(focusTarget, 'focus');

        calendarInput.instance().focus();

        expect(focusTarget.focus).toHaveBeenCalled();
    });

    it('should blur input on after `blur` call', () => {
        let calendarInput = mount(<CalendarInput />);
        let focusTarget = calendarInput.instance().customCalendarTarget;
        jest.spyOn(focusTarget, 'blur');

        calendarInput.instance().blur();

        expect(focusTarget.blur).toHaveBeenCalled();
    });

    it('should scroll window to element on public scrollTo method', () => {
        let calendarInput = mount(<CalendarInput />);
        let elemTopPosition = calendarInput.getDOMNode().getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        calendarInput.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should receive SyntheticEvent with type blur from input in first argument of `onInputFocus` callback', () => {
        let onInputFocus = jest.fn();
        let calendarInput = mount(<CalendarInput onInputFocus={ onInputFocus } />);

        calendarInput.find('input').simulate('focus');

        expect(onInputFocus).toHaveBeenCalled();
        expect(onInputFocus).toHaveBeenCalledWith(expect.objectContaining({ type: 'focus' }));
    });

    it('should receive SyntheticEvent with type blur from input in first argument of `onInputBlur` callback', () => {
        let onInputBlur = jest.fn();
        let calendarInput = mount(<CalendarInput onInputBlur={ onInputBlur } />);

        calendarInput.find('input').simulate('blur');

        expect(onInputBlur).toHaveBeenCalled();
        expect(onInputBlur).toHaveBeenCalledWith(expect.objectContaining({ type: 'blur' }));
    });

    it('should receive SyntheticEvent with type focus from component in first argument of `onFocus` callback', () => {
        let onFocus = jest.fn();
        let calendarInput = mount(<CalendarInput onFocus={ onFocus } />);

        calendarInput.find('input').simulate('focus');

        expect(onFocus).toHaveBeenCalled();
        expect(onFocus).toHaveBeenCalledWith(expect.objectContaining({ type: 'focus' }));
    });

    it('should receive SyntheticEvent with type blur from component in first argument of `onBlur` callback', () => {
        let onBlur = jest.fn();
        let calendarInput = mount(<CalendarInput onBlur={ onBlur } />);

        calendarInput.find('input').simulate('blur');

        expect(onBlur).toHaveBeenCalled();
        expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ type: 'blur' }));
    });


    it('should receive custom formatted date from event.target.value on `onFocus` callback', () => {
        let onFocus = jest.fn();
        let calendarInput = mount(<CalendarInput onFocus={ onFocus } value='01.08.2016' />);

        calendarInput.find('input').simulate('focus');

        expect(onFocus).toHaveBeenCalled();
        expect(onFocus.mock.calls[0][0].target.value).toEqual('01.08.2016');
        // expect(onFocus).toHaveBeenCalledWith({ target: { value: '01.08.2016' } });
    });

    it('should receive custom formatted date from event.target.value on `onBlur` callback', () => {
        let onBlur = jest.fn();
        const wrapper = mount(<CalendarInput onBlur={ onBlur } value='01.08.2016' />);

        wrapper.find('input').simulate('blur');

        expect(onBlur.mock.calls[0][0].target.value).toEqual('01.08.2016');
        // expect(onBlur).toHaveBeenCalledWith(expect.objectContaining({ target: { value: '01.08.2016' } }));
    });

    it('should receive custom formatted date from event.target.value on `onChange` callback', () => {
        let onChange = jest.fn();
        const wrapper = mount(<CalendarInput onChange={ onChange } />);
        const inputNode = wrapper.find('input');

        inputNode.simulate('change', { target: { value: '01.08.2016' } });

        expect(onChange).toHaveBeenCalledWith('01.08.2016', expect.any(Number));
    });

    it('should receive custom formatted date from event.target.value on `onInputChange` callback', () => {
        let onInputChange = jest.fn();
        const wrapper = mount(<CalendarInput onInputChange={ onInputChange } />);
        const inputNode = wrapper.find('input');

        inputNode.simulate('change', { target: { value: '01.08.2016' } });

        expect(onInputChange).toHaveBeenCalledWith('01.08.2016');
    });

    it('should open calendar after input was focused', (done) => {
        const wrapper = mount(<CalendarInput />);
        const calendarInput = wrapper.find('input');

        calendarInput.simulate('focus');

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.find('Popup').props().visible).toBe(true);
            done();
        }, 0);
    });

    it('should call `onCalendarChange` callback after calendar value was changed', () => {
        let onCalendarChange = jest.fn();
        const wrapper = mount(<CalendarInput opened={ true } onCalendarChange={ onCalendarChange } />);
        const dayNode = wrapper.find('.calendar__day').at(15);

        dayNode.simulate('click');

        expect(onCalendarChange).toHaveBeenCalled();
    });

    it('should call `onChange` callback after calendar value was changed', () => {
        let onChange = jest.fn();
        const wrapper = mount(<CalendarInput opened={ true } onChange={ onChange } />);
        const dayNode = wrapper.find('.calendar__day').at(15);

        dayNode.simulate('click');

        expect(onChange).toHaveBeenCalled();
    });

    it('should close calendar popup after calendar value was changed by mouse click', () => {
        const wrapper = mount(<CalendarInput />);

        wrapper.setState({ isOpen: true });

        const dayNode = wrapper.find('.calendar__day').at(15);

        dayNode.simulate('click');

        expect(wrapper.find('Popup').props().visible).not.toBe(true);
    });

    it('should open calendar popup after down key was pressed in input', () => {
        const wrapper = mount(<CalendarInput />);
        const inputNode = wrapper.find('input');

        inputNode.simulate('keyDown', { which: keyboardCode.DOWN_ARROW });

        expect(wrapper.find('Popup').props().visible).toBe(true);
    });

    it('should close calendar popup after escape key was pressed in input', () => {
        const wrapper = mount(<CalendarInput />);
        const inputNode = wrapper.find('input');

        wrapper.setState({ isOpen: true });
        inputNode.simulate('keyDown', { which: keyboardCode.ESCAPE });

        expect(wrapper.find('Popup').props().visible).toBe(false);
    });

    it('should close calendar popup after tab key was pressed in input', () => {
        const wrapper = mount(<CalendarInput />);

        wrapper.setState({ isOpen: true });
        const inputNode = wrapper.find('input');

        inputNode.simulate('keyDown', { which: keyboardCode.TAB });

        expect(wrapper.find('Popup').props().visible).toBe(false);
    });

    it('should close calendar popup after enter or space key was pressed in calendar', () => {
        const wrapper = mount(<CalendarInput />);

        const calendarNode = wrapper.find('.calendar');

        wrapper.setState({ isOpen: true });
        calendarNode.simulate('keyDown', { which: keyboardCode.ESCAPE });

        expect(wrapper.find('Popup').props().visible).toBe(false);

        wrapper.setState({ isOpen: true });
        calendarNode.simulate('keyDown', { which: keyboardCode.ESCAPE });

        expect(wrapper.find('Popup').props().visible).toBe(false);
    });

    it('should focus on input after escape key was pressed in calendar', () => {
        const wrapper = mount(<CalendarInput />);
        const calendarTarget = wrapper.instance().customCalendarTarget;
        const calendarNode = wrapper.find('.calendar');
        jest.spyOn(calendarTarget, 'focus');

        calendarNode.simulate('keyDown', { which: keyboardCode.ESCAPE });

        expect(calendarTarget.focus).toHaveBeenCalled();
    });

    it('should focus on input after calendar icon was clicked', () => {
        const wrapper = mount(<CalendarInput />);
        const calendarTarget = wrapper.instance().customCalendarTarget;
        jest.spyOn(calendarTarget, 'focus');
        let iconNode = wrapper.find('.icon');

        iconNode.simulate('click');

        expect(calendarTarget.focus).toHaveBeenCalled();
    });

    it('should call `onCalendarKeyDown` callback after any key was pressed in calendar', () => {
        let onCalendarKeyDown = jest.fn();
        const wrapper = mount(<CalendarInput onCalendarKeyDown={ onCalendarKeyDown } />);
        const calendarNode = wrapper.find('.calendar');

        calendarNode.simulate('keyDown', { which: keyboardCode.NUMBER_0 });

        expect(onCalendarKeyDown).toHaveBeenCalled();
    });

    it('should call `onInputKeyDown` callback after any key was pressed in input', () => {
        let onInputKeyDown = jest.fn();
        const wrapper = mount(<CalendarInput onInputKeyDown={ onInputKeyDown } />);
        const inputNode = wrapper.find('input');

        inputNode.simulate('keyDown', { which: keyboardCode.NUMBER_0 });

        expect(onInputKeyDown).toHaveBeenCalled();
    });

    it('should call `onKeyDown` callback after any key was pressed in input and in calendar', () => {
        let onKeyDown = jest.fn();
        const wrapper = mount(<CalendarInput onKeyDown={ onKeyDown } />);
        const inputNode = wrapper.find('input');
        const calendarNode = wrapper.find('.calendar');

        inputNode.simulate('keyDown', { which: keyboardCode.NUMBER_0 });
        calendarNode.simulate('keyDown', { which: keyboardCode.NUMBER_0 });

        expect(onKeyDown).toHaveBeenCalledTimes(2);
    });

    describe('mobile', () => {
        beforeEach(() => {
            setMqMatched(true);
        });

        it('should set `max` attribute to `date`', () => {
            let calendar = {
                laterLimit: 1514505600000
            };

            const wrapper = mount(<CalendarInput calendar={ calendar } />);
            const inputNode = wrapper.find('input.calendar-input__native-control');

            expect(inputNode.props().max).toBe('2017-12-29');
        });

        it('should set `min` attribute to `date`', () => {
            let calendar = {
                earlierLimit: 1513900800000
            };

            const wrapper = mount(<CalendarInput calendar={ calendar } />);
            const inputNode = wrapper.find('input.calendar-input__native-control');

            expect(inputNode.props().min).toBe('2017-12-22');
        });
    });

    describe('calendar utils', () => {
        it('should change format of a date', () => {
            const result = calendarUtils.changeDateFormat('2012-11-10', 'YYYY-MM-DD', 'DD.MM.YYYY');
            expect(result).toBe('10.11.2012');
        });

        it('should return start of month', () => {
            const result = new Date(calendarUtils.calculateMonth('2012-11-10', 'YYYY-MM-DD'));
            expect(result.getMonth() + 1).toBe(11); // getMonth is zero based
            expect(result.getFullYear()).toBe(2012);
        });

        it('should return current month if not valid value given', () => {
            const result = new Date(calendarUtils.calculateMonth('foo', 'YYYY-MM-DD'));
            const now = new Date();
            expect(result.getMonth()).toBe(now.getMonth());
            expect(result.getFullYear()).toBe(now.getFullYear());
        });

        it('should return earlierLimit month if it after given date', () => {
            const result = new Date(calendarUtils.calculateMonth(
                '2012-11-10',
                'YYYY-MM-DD',
                (new Date(2013, 8, 10).getTime())
            ));
            expect(result.getMonth()).toBe(8);
            expect(result.getFullYear()).toBe(2013);
        });

        it('should return laterLimit month if it before given date', () => {
            const result = new Date(calendarUtils.calculateMonth(
                '2012-11-10',
                'YYYY-MM-DD',
                (new Date(2011, 8, 10).getTime()),
                (new Date(2011, 9, 10).getTime())
            ));
            expect(result.getMonth()).toBe(9);
            expect(result.getFullYear()).toBe(2011);
        });

        it('should return start of month if earlier and later limit given, but value is between them', () => {
            const result = new Date(calendarUtils.calculateMonth(
                '2012-11-10',
                'YYYY-MM-DD',
                (new Date(2011, 8, 10).getTime()),
                (new Date(2014, 9, 10).getTime())
            ));
            expect(result.getMonth() + 1).toBe(11); // getMonth is zero based
            expect(result.getFullYear()).toBe(2012);
        });
    });
});
