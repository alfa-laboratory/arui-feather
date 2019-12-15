/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable max-len */

import React from 'react';
import formatDate from 'date-fns/format';
import Type from 'prop-types';

import Calendar from '../calendar/calendar';
import IconCalendar from '../icon/entity/calendar';
import IconButton from '../icon-button/icon-button';
import Input from '../input/input';
import Mq from '../mq/mq';
import Popup from '../popup/popup';
import PopupHeader from '../popup-header/popup-header';

import cn from '../cn';
import keyboardCode from '../lib/keyboard-code';
import { isNodeOutsideElement } from '../lib/window';
import {
    parseDate, calculateMonth, changeDateFormat, isInputDateSupported
} from './utils';
import performance from '../performance';

/**
 * NB: В нативном календаре нельзя менять формат даты. Приемлем только YYYY-MM-DD формат.
 * https://www.w3.org/TR/html-markup/input.date.html#input.date.attrs.value
 * https://tools.ietf.org/html/rfc3339#section-5.6
*/
const CUSTOM_DATE_FORMAT = 'DD.MM.YYYY';
const NATIVE_DATE_FORMAT = 'YYYY-MM-DD';
const IS_BROWSER = typeof window !== 'undefined';
const SUPPORTS_INPUT_TYPE_DATE = IS_BROWSER && isInputDateSupported();

/**
 * Компонент для ввода даты.
 */
@cn('calendar-input', Input, Popup)
@performance(true)
class CalendarInput extends React.Component {
    static propTypes = {
        /** Содержимое поля ввода */
        value: Type.string,
        /** Содержимое поля ввода, указанное по умолчанию */
        defaultValue: Type.string,
        /** Дата для отображения календаря по умолчанию */
        defaultMonth: Type.oneOfType([Type.string, Type.number, Type.instanceOf(Date)]),
        /** Свойства компонента [Calendar](#!/Calendar) */
        calendar: Type.shape({
            value: Type.number,
            selectedFrom: Type.number,
            selectedTo: Type.number,
            earlierLimit: Type.number,
            laterLimit: Type.number,
            month: Type.number,
            onValueChange: Type.func,
            onMonthChange: Type.func,
            outputFormat: Type.string,
            months: Type.arrayOf(Type.string),
            weekdays: Type.arrayOf(Type.string),
            offDays: Type.arrayOf(Type.number),
            eventDays: Type.arrayOf(Type.number),
            showToday: Type.bool,
            showArrows: Type.bool,
            isKeyboard: Type.bool,
            error: Type.node,
            theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
            className: Type.string,
            onKeyDown: Type.func,
            onKeyUp: Type.func,
            onFocus: Type.func,
            onBlur: Type.func
        }),
        /** Управление возможностью раскрытия календаря */
        opened: Type.bool,
        /** Тип инпута (filled только на белом фоне в размере m) */
        view: Type.oneOf(['default', 'filled']),
        /** Управление возможностью компонента занимать всю ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Направления, в которые может открываться попап компонента */
        directions: Type.arrayOf(Type.oneOf([
            'anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top',
            'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'
        ])),
        /** Управление автозаполнением компонента */
        autocomplete: Type.bool,
        /** Управление возможностью изменения значения компонента */
        disabled: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Последовательность перехода между контролами при нажатии на Tab */
        tabIndex: Type.number,
        /** Добавление дополнительных элементов к инпуту слева */
        leftAddons: Type.node,
        /** Добавление дополнительных элементов к инпуту справа */
        rightAddons: Type.node,
        /** Управление рендером иконки календаря в инпуте */
        withIcon: Type.bool,
        /** Лейбл для поля */
        label: Type.node,
        /** Подсказка в поле */
        placeholder: Type.string,
        /** Подсказка под полем */
        hint: Type.node,
        /** Отображение ошибки */
        error: Type.node,
        /** Управление нативным режимом на мобильных устройствах */
        mobileMode: Type.oneOf(['native', 'popup', 'input']),
        /** Подсказка над меню в мобильном режиме */
        mobileTitle: Type.node,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Имя компонента в DOM */
        name: Type.string,
        /** Дополнительный класс */
        className: Type.string,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /**
         * Обработчик установки фокуса на компонент
         * @param {React.FocusEvent} event
         */
        onFocus: Type.func,
        /**
         * Обработчик снятия фокуса с компонента
         * @param {React.FocusEvent} event
         */
        onBlur: Type.func,
        /**
         * Обработчик установки фокуса на поле ввода
         * @param {React.FocusEvent} event
         */
        onInputFocus: Type.func,
        /**
         * Обработчик снятия фокуса с поля ввода
         * @param {React.FocusEvent} event
         */
        onInputBlur: Type.func,
        /**
         * Обработчик ввода даты в текстовом поле
         * @param {string} value
         */
        onInputChange: Type.func,
        /**
         * Обработчик выбора даты в календаре
         * @param {string} formattedValue
         */
        onCalendarChange: Type.func,
        /**
         * Обрабочик изменения даты в календаре
         * @param {string} formattedValue
         * @param {number} value
         */
        onChange: Type.func,
        /**
         * Обработчик события нажатия на клавишу в момент, когда фокус находится на компоненте
         * @param {React.KeyboardEvent} event
         */
        onKeyDown: Type.func,
        /**
         * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится в календаре
         * @param {React.KeyboardEvent} event
         */
        onCalendarKeyDown: Type.func,
        /**
         * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на текстовом поле
         * @param {React.KeyboardEvent} event
         */
        onInputKeyDown: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        withIcon: true,
        directions: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
        placeholder: '00.00.0000',
        mobileMode: 'native'
    };

    state = {
        isMobile: false,
        isInputFocused: false,
        isCalendarFocused: false,
        opened: false,
        value: this.props.defaultValue || '',
        month: calculateMonth(
            this.props.value || this.props.defaultMonth,
            CUSTOM_DATE_FORMAT,
            this.props.calendar ? this.props.calendar.earlierLimit : undefined,
            this.props.calendar ? this.props.calendar.laterLimit : undefined
        )
    };

    /**
     * @type {Number}
     */
    timeoutId;

    /**
     * @type {Number}
     */
    changeCloseTimeoutId;

    /**
     * @type {Calendar}
     */
    calendar;

    /**
     * @type {Popup}
     */
    calendarPopup;

    /**
     * @type {Input}
     */
    customCalendarTarget;

    /**
     * @type {HTMLInputElement}
     */
    nativeCalendarTarget;

    componentDidMount() {
        if (this.calendarPopup) {
            let element;

            if (this.nativeCalendarTarget) {
                element = this.nativeCalendarTarget;
            } else if (this.customCalendarTarget) {
                element = this.customCalendarTarget.getBoxNode();
            }

            if (element) {
                this.calendarPopup.setTarget(element);
            }
        }
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        if (this.changeCloseTimeoutId) {
            clearTimeout(this.changeCloseTimeoutId);
            this.changeCloseTimeoutId = null;
        }
    }

    render(cn, Input, Popup) {
        const value = this.props.value === undefined ? this.state.value : this.props.value;

        const commonProps = {
            disabled: this.props.disabled,
            tabIndex: this.props.tabIndex,
            formNoValidate: true
        };

        const nativeProps = {
            min: this.props.calendar &&
                this.props.calendar.earlierLimit &&
                formatDate(this.props.calendar.earlierLimit, NATIVE_DATE_FORMAT),
            max: this.props.calendar &&
                this.props.calendar.laterLimit &&
                formatDate(this.props.calendar.laterLimit, NATIVE_DATE_FORMAT)
        };

        const wrapperProps = this.isMobilePopup() && !this.props.disabled
            ? {
                role: 'button',
                tabIndex: 0,
                onClick: this.handleMobileWrapperClick
            }
            : {};

        return (
            <span
                className={ cn({ width: this.props.width }) }
                data-test-id={ this.props['data-test-id'] }
            >
                <span
                    { ...wrapperProps }
                >
                    <Mq
                        query='--small-only'
                        touch={ true }
                        onMatchChange={ this.handleMqMatchChange }
                    >
                        {
                            this.canBeNative() && (
                            <input
                                ref={ (nativeCalendarTarget) => {
                                    this.nativeCalendarTarget = nativeCalendarTarget;
                                } }
                                { ...commonProps }
                                { ...nativeProps }
                                className={ cn('native-control') }
                                type='date'
                                value={ changeDateFormat(value, CUSTOM_DATE_FORMAT, NATIVE_DATE_FORMAT) }
                                onBlur={ this.handleNativeInputBlur }
                                onChange={ this.handleNativeInputChange }
                                onFocus={ this.handleNativeInputFocus }
                            />
                          )
}
                    </Mq>
                    <Input
                        ref={ (customCalendarTarget) => {
                            this.customCalendarTarget = customCalendarTarget;
                        } }
                        { ...commonProps }
                        autocomplete={ this.props.autocomplete }
                        className={ cn('custom-control') }
                        disabledAttr={ this.isNativeInput() || this.isMobilePopup() }
                        focused={ this.state.isInputFocused || this.state.isCalendarFocused }
                        mask='11.11.1111'
                        size={ this.props.size }
                        type='tel'
                        pattern='[0-9.]*'
                        label={ this.props.label }
                        placeholder={ this.props.placeholder }
                        hint={ this.props.hint }
                        error={ this.props.error }
                        value={ value }
                        view={ this.props.view }
                        width={ this.props.width }
                        id={ this.props.id }
                        name={ this.props.name }
                        leftAddons={ this.props.leftAddons }
                        rightAddons={ this.props.rightAddons }
                        onBlur={ this.handleCustomInputBlur }
                        onChange={ this.handleCustomInputChange }
                        onFocus={ this.handleCustomInputFocus }
                        onKeyDown={ this.handleInputKeyDown }
                        icon={
                            this.props.withIcon && (
                            <IconButton onClick={ this.handleIconButtonClick }>
                                <IconCalendar
                                    size={ this.props.size }
                                />
                            </IconButton>
                          )
}
                    />
                </span>
                { this.renderPopup(cn, value, Popup) }
            </span>
        );
    }

    renderPopup(cn, value, Popup) {
        let opened = this.props.opened === undefined ? this.state.opened : this.props.opened;

        if (this.isSimpleInput()) {
            opened = false;
        }

        return (
            <Popup
                ref={ (calendarPopup) => {
                    this.calendarPopup = calendarPopup;
                } }
                for={ this.props.name }
                visible={ opened }
                directions={ this.props.directions }
                target={ this.isMobilePopup() ? 'screen' : 'anchor' }
                header={ this.isMobilePopup() && this.renderMobileHeader() }
                padded={ false }
            >
                <div className={ cn('calendar-wrapper', { mobile: this.isMobilePopup() }) }>
                    <Calendar
                        ref={ (calendar) => {
                            this.calendar = calendar;
                        } }
                        month={ this.state.month }
                        { ...this.props.calendar }
                        value={ parseDate(value, CUSTOM_DATE_FORMAT) }
                        onBlur={ this.handleCalendarBlur }
                        onFocus={ this.handleCalendarFocus }
                        onKeyDown={ this.handleCalendarKeyDown }
                        onValueChange={ this.handleCalendarChange }
                        onMonthChange={ this.handleCalendarMonthChange }
                    />
                </div>
            </Popup>
        );
    }

    renderMobileHeader() {
        return (
            <PopupHeader
                size={ this.props.size }
                title={ this.props.mobileTitle || this.props.label || 'Выберите дату' }
                onCloserClick={ this.handlePopupCloserClick }
            />
        );
    }

    handleCalendarChange = (value, formatted, isTriggeredByKeyboard) => {
        if (!isTriggeredByKeyboard) {
            this.changeCloseTimeoutId = setTimeout(() => {
                this.calendar.blur(); // FF не испускает событие `blur` когда элементы становятся невидимыми, делаем это явно
                this.setState({
                    opened: false
                });
                this.changeCloseTimeoutId = null;
            }, 0);
        }

        this.setState({ value: formatted });

        if (this.props.onCalendarChange) {
            this.props.onCalendarChange(formatted);
        }

        if (this.props.onChange) {
            this.props.onChange(formatted, value);
        }
    };

    handleCalendarMonthChange = (month) => {
        this.setState({
            month
        });
    };

    handleCalendarFocus = (event) => {
        this.changeFocused({ isCalendarFocused: true }, event);
    };

    handleCalendarBlur = (event) => {
        this.changeFocused({ isCalendarFocused: false }, event);
    };

    handleCalendarKeyDown = (event) => {
        switch (event.which) {
            case keyboardCode.ESCAPE:
                event.preventDefault();
                this.customCalendarTarget.focus();
                break;
            case keyboardCode.ENTER:
            case keyboardCode.SPACE:
                event.preventDefault();
                this.setState({
                    opened: false
                });
                break;
        }

        if (this.props.onCalendarKeyDown) {
            this.props.onCalendarKeyDown(event);
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    handleIconButtonClick = () => {
        this.customCalendarTarget.focus();
    };

    handleCustomInputChange = (value) => {
        const month = calculateMonth(
            value,
            CUSTOM_DATE_FORMAT,
            this.props.calendar ? this.props.calendar.earlierLimit : undefined,
            this.props.calendar ? this.props.calendar.laterLimit : undefined
        );

        this.setState({ value });

        // Изменяет месяц в календаре в соответствии с введёной в поле валидной датой
        if (value && value.length === CUSTOM_DATE_FORMAT.length && month !== this.state.month) {
            this.setState({ month });
        }

        if (this.props.onInputChange) {
            this.props.onInputChange(value);
        }

        if (this.props.onChange) {
            this.props.onChange(value, parseDate(value, CUSTOM_DATE_FORMAT));
        }
    };

    handleNativeInputChange = (event) => {
        let value = changeDateFormat(event.target.value, NATIVE_DATE_FORMAT, CUSTOM_DATE_FORMAT);

        // Детектим нажатие `сlear` в нативном календаре
        if (this.state.value === value) {
            value = '';
        }

        this.setState({ value });

        if (this.props.onInputChange) {
            this.props.onInputChange(value);
        }

        if (this.props.onChange) {
            this.props.onChange(value, parseDate(value, CUSTOM_DATE_FORMAT));
        }
    };

    handleCustomInputFocus = (event) => {
        this.changeFocused({ isInputFocused: true }, event);

        if (this.props.onInputFocus) {
            this.props.onInputFocus(event);
        }
    };

    handleNativeInputFocus = (event) => {
        // Копируем пришедший из аргументов SyntheticEvent для дальнейшего редактирования
        const resultEvent = {
            ...event,
            // Трансформируем нативную YYYY-MM-DD дату в кастомный формат на вывод в коллбэках
            target: { value: changeDateFormat(event.target.value, NATIVE_DATE_FORMAT, CUSTOM_DATE_FORMAT) }
        };

        this.changeFocused({ isInputFocused: true }, resultEvent);

        if (this.props.onInputFocus) {
            this.props.onInputFocus(resultEvent);
        }
    };

    handleCustomInputBlur = (event) => {
        this.changeFocused({ isInputFocused: false }, event);

        if (this.props.onInputBlur) {
            this.props.onInputBlur(event);
        }
    };

    handleNativeInputBlur = (event) => {
        // Копируем пришедший из аргументов SyntheticEvent для дальнейшего редактирования
        const resultEvent = {
            ...event,
            // Трансформируем нативную YYYY-MM-DD дату в кастомный формат на вывод в коллбэках
            target: { value: changeDateFormat(event.target.value, NATIVE_DATE_FORMAT, CUSTOM_DATE_FORMAT) }
        };

        this.changeFocused({ isInputFocused: false }, resultEvent);

        if (this.props.onInputBlur) {
            this.props.onInputBlur(resultEvent);
        }
    };

    handleInputKeyDown = (event) => {
        switch (event.which) {
            case keyboardCode.DOWN_ARROW: {
                event.preventDefault();

                const value = this.props.value === undefined ? this.state.value : this.props.value;

                this.setState({
                    opened: true,
                    month: calculateMonth(
                        value,
                        CUSTOM_DATE_FORMAT,
                        this.props.calendar ? this.props.calendar.earlierLimit : undefined,
                        this.props.calendar ? this.props.calendar.laterLimit : undefined
                    )
                });

                this.calendar.focus();

                break;
            }
            case keyboardCode.ESCAPE: {
                event.preventDefault();

                this.setState({
                    opened: false
                });

                break;
            }
        }

        if (this.props.onInputKeyDown) {
            this.props.onInputKeyDown(event);
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    handleMqMatchChange = (isMatched) => {
        this.setState({
            isMobile: isMatched
        });
    };

    handleMobileWrapperClick = () => {
        this.setOpened(true);
    };

    handlePopupCloserClick = () => {
        this.setOpened(false);
    };

    /**
     * Устанавливает фокус на поле ввода, открывает календарь.
     *
     * @public
     */
    focus() {
        const targetRef = this.nativeCalendarTarget || this.customCalendarTarget;

        targetRef.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     *
     * @public
     */
    blur() {
        const targetRef = this.nativeCalendarTarget || this.customCalendarTarget;

        targetRef.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     *
     * @public
     */
    scrollTo() {
        this.customCalendarTarget.scrollTo();
    }

    canBeNative() {
        return SUPPORTS_INPUT_TYPE_DATE && this.props.mobileMode === 'native';
    }

    isNativeInput() {
        return this.state.isMobile && this.canBeNative();
    }

    isMobilePopup() {
        return this.state.isMobile && this.props.mobileMode === 'popup';
    }

    isSimpleInput() {
        return this.state.isMobile && this.props.mobileMode === 'input';
    }

    changeFocused(focusedState, event) {
        const newState = {
            isInputFocused: this.state.isInputFocused,
            isCalendarFocused: this.state.isCalendarFocused,
            ...focusedState
        };

        // При переключении фокуса с поля ввода на календарь событие `blur` у поля ввода иногда происходит перед фокусом календаря
        // Поэтому проверяем элемент который получит фокус после блюра и если он внутри календаря - оставляем сфокусированное состояние.
        const relatedTarget = event.relatedTarget || // не поддерживается в FF и IE10 https://github.com/facebook/react/issues/2011
            event.explicitOriginalTarget || // не поддерживается в IE
            document.activeElement; // В IE вернет не <calendar> а конкретную ноду, на которую пришел фокус

        const calendarWillReceiveFocus = !isNodeOutsideElement(relatedTarget, this.calendar.getNode());

        const newFocused = newState.isInputFocused ||
            newState.isCalendarFocused ||
            calendarWillReceiveFocus;

        this.setState(focusedState);

        let newOpened = false;

        if (newFocused) {
            if (this.props.onFocus) {
                this.props.onFocus(event);
            }

            newOpened = true;
        } else if (this.props.onBlur) {
            this.props.onBlur(event);
        }

        if (!this.isNativeInput()) {
            this.setOpened(newOpened);
        }
    }

    setOpened(opened) {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            const value = this.props.value === undefined ? this.state.value : this.props.value;

            const newMonth = this.state.opened === opened
                ? this.state.month
                : calculateMonth(
                    value || this.props.defaultMonth,
                    CUSTOM_DATE_FORMAT,
                    this.props.calendar ? this.props.calendar.earlierLimit : undefined,
                    this.props.calendar ? this.props.calendar.laterLimit : undefined
                );

            this.setState({
                opened,
                month: newMonth
            });

            this.timeoutId = null;
        }, 0);
    }
}

export default CalendarInput;
