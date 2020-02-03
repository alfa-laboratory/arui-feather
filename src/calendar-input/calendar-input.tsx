/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable max-len */

import React from 'react';
import formatDate from 'date-fns/format';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import Calendar, { CalendarProps } from '../calendar/calendar';
import IconCalendar from '../icon/entity/calendar';
import IconButton from '../icon-button/icon-button';
import Input from '../input/input';
import Mq from '../mq/mq';
import Popup from '../popup/popup';
import PopupHeader from '../popup-header/popup-header';

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

export type CalendarInputProps = {

    /**
     * Содержимое поля ввода
     */
    value?: string;

    /**
     * Содержимое поля ввода, указанное по умолчанию
     */
    defaultValue?: string;

    /**
     * Дата для отображения календаря по умолчанию
     */
    defaultMonth?: string | number | any;

    /**
     * Свойства компонента [Calendar](#!/Calendar)
     */
    calendar?: CalendarProps;

    /**
     * Управление возможностью раскрытия календаря
     */
    opened?: boolean;

    /**
     * Тип инпута (filled только на белом фоне в размере m)
     */
    view?: 'default' | 'filled';

    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Направления, в которые может открываться попап компонента
     */
    directions?: ReadonlyArray<'anchor' | 'top-left' | 'top-center' | 'top-right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right'>;

    /**
     * Управление автозаполнением компонента
     */
    autocomplete?: boolean;

    /**
     * Управление возможностью изменения значения компонента
     */
    disabled?: boolean;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;

    /**
     * Добавление дополнительных элементов к инпуту слева
     */
    leftAddons?: React.ReactNode;

    /**
     * Добавление дополнительных элементов к инпуту справа
     */
    rightAddons?: React.ReactNode;

    /**
     * Управление рендером иконки календаря в инпуте
     */
    withIcon?: boolean;

    /**
     * Лейбл для поля
     */
    label?: React.ReactNode;

    /**
     * Подсказка в поле
     */
    placeholder?: string;

    /**
     * Подсказка под полем
     */
    hint?: React.ReactNode;

    /**
     * Отображение ошибки
     */
    error?: React.ReactNode;

    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMode?: 'native' | 'popup' | 'input';

    /**
     * Подсказка над меню в мобильном режиме
     */
    mobileTitle?: React.ReactNode;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Имя компонента в DOM
     */
    name?: string;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Обработчик установки фокуса на компонент
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса с компонента
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик установки фокуса на поле ввода
     */
    onInputFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса с поля ввода
     */
    onInputBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик ввода даты в текстовом поле
     */
    onInputChange?: (value?: string) => void;

    /**
     * Обработчик выбора даты в календаре
     */
    onCalendarChange?: (formattedValue?: string) => void;

    /**
     * Обрабочик изменения даты в календаре
     */
    onChange?: (formattedValue?: string, value?: number) => void;

    /**
     * Обработчик события нажатия на клавишу в момент, когда фокус находится на компоненте
     */
    onKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится в календаре
     */
    onCalendarKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на текстовом поле
     */
    onInputKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент для ввода даты.
 */
@performance(true)
export class CalendarInput extends React.Component<CalendarInputProps> {
    cn = createCn('calendar-input');

    static defaultProps: Partial<CalendarInputProps> = {
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

    render() {
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
                className={ this.cn({ width: this.props.width }) }
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
                            this.canBeNative() &&
                            <input
                                ref={ (nativeCalendarTarget) => {
                                    this.nativeCalendarTarget = nativeCalendarTarget;
                                } }
                                { ...commonProps }
                                { ...nativeProps }
                                className={ this.cn('native-control') }
                                type='date'
                                value={ changeDateFormat(value, CUSTOM_DATE_FORMAT, NATIVE_DATE_FORMAT) }
                                onBlur={ this.handleNativeInputBlur }
                                onChange={ this.handleNativeInputChange }
                                onFocus={ this.handleNativeInputFocus }
                            />
                        }
                    </Mq>
                    <Input
                        ref={ (customCalendarTarget) => {
                            this.customCalendarTarget = customCalendarTarget;
                        } }
                        { ...commonProps }
                        autocomplete={ this.props.autocomplete }
                        className={ this.cn('custom-control') }
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
                            this.props.withIcon &&
                            <IconButton onClick={ this.handleIconButtonClick }>
                                <IconCalendar
                                    size={ this.props.size }
                                />
                            </IconButton>
                        }
                    />
                </span>
                { this.renderPopup(value) }
            </span>
        );
    }

    renderPopup(value) {
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
                <div className={ this.cn('calendar-wrapper', { mobile: this.isMobilePopup() }) }>
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

    private handleCalendarChange = (value, formatted, isTriggeredByKeyboard) => {
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

    private handleCalendarMonthChange = (month) => {
        this.setState({
            month
        });
    };

    private handleCalendarFocus = (event) => {
        this.changeFocused({ isCalendarFocused: true }, event);
    };

    private handleCalendarBlur = (event) => {
        this.changeFocused({ isCalendarFocused: false }, event);
    };

    private handleCalendarKeyDown = (event) => {
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

    private handleIconButtonClick = () => {
        this.customCalendarTarget.focus();
    };

    private handleCustomInputChange = (value) => {
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

    private handleNativeInputChange = (event) => {
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

    private handleCustomInputFocus = (event) => {
        this.changeFocused({ isInputFocused: true }, event);

        if (this.props.onInputFocus) {
            this.props.onInputFocus(event);
        }
    };

    private handleNativeInputFocus = (event) => {
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

    private handleCustomInputBlur = (event) => {
        this.changeFocused({ isInputFocused: false }, event);

        if (this.props.onInputBlur) {
            this.props.onInputBlur(event);
        }
    };

    private handleNativeInputBlur = (event) => {
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

    private handleInputKeyDown = (event) => {
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

    private handleMqMatchChange = (isMatched) => {
        this.setState({
            isMobile: isMatched
        });
    };

    private handleMobileWrapperClick = () => {
        this.setOpened(true);
    };

    private handlePopupCloserClick = () => {
        this.setOpened(false);
    };

    /**
     * Устанавливает фокус на поле ввода, открывает календарь.
     */
    public focus() {
        const targetRef = this.nativeCalendarTarget || this.customCalendarTarget;

        targetRef.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     */
    public blur() {
        const targetRef = this.nativeCalendarTarget || this.customCalendarTarget;

        targetRef.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     */
    public scrollTo() {
        this.customCalendarTarget.scrollTo();
    }

    private canBeNative() {
        return SUPPORTS_INPUT_TYPE_DATE && this.props.mobileMode === 'native';
    }

    private isNativeInput() {
        return this.state.isMobile && this.canBeNative();
    }

    private isMobilePopup() {
        return this.state.isMobile && this.props.mobileMode === 'popup';
    }

    private isSimpleInput() {
        return this.state.isMobile && this.props.mobileMode === 'input';
    }

    private changeFocused(focusedState, event) {
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

    private setOpened(opened) {
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

export default withTheme(CalendarInput);
