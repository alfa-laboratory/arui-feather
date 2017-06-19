/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import bowser from 'bowser';
import { render, cleanUp, simulate } from '../test-utils';

import CalendarInput from './calendar-input';
import keyboardCode from '../lib/keyboard-code';
import { SCROLL_TO_CORRECTION } from '../vars';

function renderCalendarInput(props = {}) {
    let calendarInput = render(
        <CalendarInput { ...props } />,
        {
            css: 'min-width: 9999px; min-height: 9999px; padding: 50px 0 0;'
        }
    );

    let inputNode =
        calendarInput.node.querySelector('.calendar-input__native-control') ||
        calendarInput.node.querySelector('.calendar-input__custom-control input');
    let popupNode = document.querySelector('.popup');
    let calendarNode = popupNode.querySelector('.calendar');

    return { calendarInput, inputNode, popupNode, calendarNode };
}

describe('calendar-input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = chai.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        let { calendarInput, popupNode } = renderCalendarInput();

        expect(calendarInput.node).to.exist;
        expect(popupNode).to.not.have.class('popup_visible');
    });

    it('should render with calendar icon by default', () => {
        let { calendarInput } = renderCalendarInput();
        let iconNode = calendarInput.node.querySelector('.icon');

        expect(iconNode).to.exist;
        expect(iconNode).to.have.class('icon_calendar');
    });

    it('should render without calendar icon with withIcon=false', () => {
        let { calendarInput } = renderCalendarInput({ withIcon: false });
        let iconNode = calendarInput.node.querySelector('.icon');

        expect(iconNode).to.not.exist;
    });

    it('should call `onInputChange` callback after input value was changed', () => {
        let onInputChange = chai.spy();
        let { inputNode } = renderCalendarInput({ onInputChange });

        simulate(inputNode, 'change');

        expect(onInputChange).to.have.been.called.once;
    });

    it('should call `onChange` callback after input value was changed', () => {
        let onChange = chai.spy();
        let { inputNode } = renderCalendarInput({ onChange });

        simulate(inputNode, 'change');

        expect(onChange).to.have.been.called.once;
    });

    it('should focus input on after `focus` call', (done) => {
        let onInputFocus = chai.spy();
        let { calendarInput } = renderCalendarInput({ onInputFocus });

        calendarInput.instance.focus();

        setTimeout(() => {
            expect(onInputFocus).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should blur input on after `blur` call', (done) => {
        let onInputBlur = chai.spy();
        let { calendarInput } = renderCalendarInput({ onInputBlur });

        calendarInput.instance.focus();

        setTimeout(() => {
            calendarInput.instance.blur();
            expect(onInputBlur).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let { calendarInput } = renderCalendarInput();
        let elemTopPosition = calendarInput.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        calendarInput.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.called.with(0, elemScrollTo);
            done();
        }, 0);
    });

    it('should receive SyntheticEvent with type blur from input in first argument of `onInputFocus` callback',
    (done) => {
        let type = '';
        let onInputFocus = chai.spy((event) => { type = event.type; });
        let { calendarInput } = renderCalendarInput({ onInputFocus });

        calendarInput.instance.focus();

        setTimeout(() => {
            expect(onInputFocus).to.have.been.called.once;
            expect(type).to.equal('focus');
            done();
        }, 0);
    });

    it('should receive SyntheticEvent with type blur from input in first argument of `onInputBlur` callback',
    (done) => {
        let type = '';
        let onInputBlur = chai.spy((event) => { type = event.type; });
        let { calendarInput } = renderCalendarInput({ onInputBlur });

        calendarInput.instance.focus();

        setTimeout(() => {
            calendarInput.instance.blur();
            expect(onInputBlur).to.have.been.called.once;
            expect(type).to.equal('blur');
            done();
        }, 0);
    });

    it('should receive SyntheticEvent with type focus from component in first argument of `onFocus` callback',
    (done) => {
        let type = '';
        let onFocus = chai.spy((event) => { type = event.type; });
        let { calendarInput } = renderCalendarInput({ onFocus });

        calendarInput.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            expect(type).to.equal('focus');
            done();
        }, 0);
    });

    it('should receive SyntheticEvent with type blur from component in first argument of `onBlur` callback',
    (done) => {
        let type = '';
        let onBlur = chai.spy((event) => { type = event.type; });
        let { calendarInput } = renderCalendarInput({ onBlur });

        calendarInput.instance.focus();

        setTimeout(() => {
            calendarInput.instance.blur();
            expect(onBlur).to.have.been.called.once;
            expect(type).to.equal('blur');
            done();
        }, 0);
    });

    it('should receive custom formatted date from event.target.value on `onFocus` callback', (done) => {
        let value = '';
        let onFocus = chai.spy((event) => { value = event.target.value; });
        let { calendarInput } = renderCalendarInput({ value: '01.08.2016', onFocus });

        calendarInput.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            expect(value).to.equal('01.08.2016');
            done();
        }, 0);
    });

    it('should receive custom formatted date from event.target.value on `onBlur` callback', (done) => {
        let value = '';
        let onBlur = chai.spy((event) => { value = event.target.value; });
        let { calendarInput } = renderCalendarInput({ value: '01.08.2016', onBlur });

        calendarInput.instance.focus();

        setTimeout(() => {
            calendarInput.instance.blur();
            expect(onBlur).to.have.been.called.once;
            expect(value).to.equal('01.08.2016');
            done();
        }, 0);
    });

    it('should receive custom formatted date from event.target.value on `onChange` callback', () => {
        let onChange = chai.spy();
        let { inputNode } = renderCalendarInput({ onChange });

        simulate(inputNode, 'change', { target: { value: '01.08.2016' } });

        expect(onChange).to.have.been.called.with('01.08.2016');
    });

    it('should receive custom formatted date from event.target.value on `onInputChange` callback', () => {
        let onInputChange = chai.spy();
        let { inputNode } = renderCalendarInput({ onInputChange });

        simulate(inputNode, 'change', { target: { value: '01.08.2016' } });

        expect(onInputChange).to.have.been.called.with('01.08.2016');
    });

    it('should receive `null` value prop correctly', () => {
        const onInputChange = chai.spy();
        const { inputNode } = renderCalendarInput({ onInputChange });
        function changeFn() {
            simulate(inputNode, 'change', { target: { value: null } });
        }

        expect(changeFn).to.not.throw(Error);
        expect(onInputChange).to.have.been.called.with(null);
    });

    if (!bowser.mobile) {
        it('should open calendar after input was focused', (done) => {
            let { calendarInput, popupNode } = renderCalendarInput();

            calendarInput.instance.focus();

            setTimeout(() => {
                expect(popupNode).to.have.class('popup_visible');
                done();
            }, 0);
        });

        it('should call `onCalendarChange` callback after calendar value was changed', () => {
            let onCalendarChange = chai.spy();
            let { calendarNode } = renderCalendarInput({ onCalendarChange, opened: true });
            let dayNodes = calendarNode.querySelectorAll('.calendar__day');

            dayNodes[15].click();

            expect(onCalendarChange).to.have.been.called.once;
        });

        it('should call `onChange` callback after calendar value was changed', () => {
            let onChange = chai.spy();
            let { calendarNode } = renderCalendarInput({ onChange, opened: true });
            let dayNodes = calendarNode.querySelectorAll('.calendar__day');

            dayNodes[15].click();

            expect(onChange).to.have.been.called.once;
        });

        it('should close calendar popup after calendar value was changed by mouse click', () => {
            let { popupNode, calendarNode, calendarInput } = renderCalendarInput();
            let dayNodes = calendarNode.querySelectorAll('.calendar__day');

            calendarInput.instance.focus();
            dayNodes[15].click();

            expect(popupNode).to.not.have.class('popup_visible');
        });

        it('should open calendar popup after down key was pressed in input', (done) => {
            let { popupNode, inputNode } = renderCalendarInput();

            simulate(inputNode, 'keyDown', { which: keyboardCode.DOWN_ARROW });

            setTimeout(() => {
                expect(popupNode).to.have.class('popup_visible');
                done();
            }, 0);
        });

        it('should close calendar popup after escape key was pressed in input', () => {
            let { calendarInput, popupNode, inputNode } = renderCalendarInput();
            calendarInput.instance.setState({ isOpen: true });

            simulate(inputNode, 'keyDown', { which: keyboardCode.ESCAPE });

            expect(popupNode).to.not.have.class('popup_visible');
        });

        it('should close calendar popup after tab key was pressed in input', () => {
            let { popupNode, inputNode } = renderCalendarInput();

            simulate(inputNode, 'keyDown', { which: keyboardCode.TAB });

            expect(popupNode).to.not.have.class('popup_visible');
        });

        it('should close calendar popup after enter or space key was pressed in calendar', () => {
            let { calendarInput, popupNode, calendarNode } = renderCalendarInput();
            calendarInput.instance.setState({ isOpen: true });

            simulate(calendarNode, 'keyDown', { which: keyboardCode.ESCAPE });

            expect(popupNode).to.not.have.class('popup_visible');

            calendarInput.instance.setState({ isOpen: true });
            simulate(calendarNode, 'keyDown', { which: keyboardCode.ESCAPE });

            expect(popupNode).to.not.have.class('popup_visible');
        });

        it('should focus on input after escape key was pressed in calendar', (done) => {
            let onInputFocus = chai.spy();
            let { calendarNode } = renderCalendarInput({ onInputFocus });

            simulate(calendarNode, 'keyDown', { which: keyboardCode.ESCAPE });

            setTimeout(() => {
                expect(onInputFocus).to.have.been.called.once;
                done();
            }, 0);
        });

        it('should focus on input after calendar icon was clicked', (done) => {
            let onInputFocus = chai.spy();
            let { calendarInput } = renderCalendarInput({ onInputFocus });
            let iconNode = calendarInput.node.querySelector('.icon');

            iconNode.click();

            setTimeout(() => {
                expect(onInputFocus).to.have.been.called.once;
                done();
            }, 0);
        });

        it('should call `onCalendarKeyDown` callback after any key was pressed in calendar', (done) => {
            let onCalendarKeyDown = chai.spy();
            let { calendarNode } = renderCalendarInput({ onCalendarKeyDown });

            simulate(calendarNode, 'keyDown', { which: keyboardCode.NUMBER_0 });

            setTimeout(() => {
                expect(onCalendarKeyDown).to.have.been.called.once;
                done();
            }, 0);
        });

        it('should call `onInputKeyDown` callback after any key was pressed in input', (done) => {
            let onInputKeyDown = chai.spy();
            let { inputNode } = renderCalendarInput({ onInputKeyDown });

            simulate(inputNode, 'keyDown', { which: keyboardCode.NUMBER_0 });

            setTimeout(() => {
                expect(onInputKeyDown).to.have.been.called.once;
                done();
            }, 0);
        });

        it('should call `onKeyDown` callback after any key was pressed in input and in calendar', (done) => {
            let onKeyDown = chai.spy();
            let { inputNode, calendarNode } = renderCalendarInput({ onKeyDown });

            simulate(inputNode, 'keyDown', { which: keyboardCode.NUMBER_0 });
            simulate(calendarNode, 'keyDown', { which: keyboardCode.NUMBER_0 });

            setTimeout(() => {
                expect(onKeyDown).to.have.been.called.twice;
                done();
            }, 0);
        });
    }
});
