
import { Component, ReactNode } from 'react';

export type CalendarInputCalendarthemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type CalendarInputCalendarclassNameFieldType = Function | string;
export type CalendarInputCalendarFieldType = {
    value?: number;
    selectedFrom?: number;
    selectedTo?: number;
    earlierLimit?: number;
    laterLimit?: number;
    month?: number;
    onValueChange?: Function;
    onMonthChange?: Function;
    outputFormat?: string;
    months?: Array<string>;
    weekdays?: Array<string>;
    offDays?: Array<number>;
    showArrows?: boolean;
    isKeyboard?: boolean;
    error?: ReactNode;
    theme?: CalendarInputCalendarthemeFieldType;
    className?: CalendarInputCalendarclassNameFieldType;
    onKeyDown?: Function;
    onKeyUp?: Function;
    onFocus?: Function;
    onBlur?: Function
};
export type CalendarInputWidthFieldType = 'default' | 'available';
export type CalendarInputDirectionsFieldType = 'anchor' | 'top-left' | 'top-center' | 'top-right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type CalendarInputSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type CalendarInputMobileModeFieldType = 'native' | 'popup';
export type CalendarInputThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface CalendarInputProps {

    /**
     * Содержимое поля ввода
     */
    value?: string;
    /**
     * Содержимое поля ввода, указанное по умолчанию
     */
    defaultValue?: string;
    /**
     * Свойства компонента [Calendar](../calendar/)
     */
    calendar?: CalendarInputCalendarFieldType;
    /**
     * Управление возможностью раскрытия календаря
     */
    opened?: boolean;
    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: CalendarInputWidthFieldType;
    /**
     * Направления, в которые может открываться попап компонента
     */
    directions?: Array<CalendarInputDirectionsFieldType>;
    /**
     * Управление возможностью изменения значения компонента
     */
    disabled?: boolean;
    /**
     * Размер компонента
     */
    size?: CalendarInputSizeFieldType;
    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;
    /**
     * Показывать иконку календаря в инпуте
     */
    withIcon?: boolean;
    /**
     * Лейбл для поля
     */
    label?: ReactNode;
    /**
     * Подсказка в поле
     */
    placeholder?: string;
    /**
     * Подсказка под полем
     */
    hint?: ReactNode;
    /**
     * Отображение ошибки
     */
    error?: ReactNode;
    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMode?: CalendarInputMobileModeFieldType;
    /**
     * Подсказка над меню в мобильном режиме
     */
    mobileTitle?: ReactNode;
    /**
     * Идентификатор компонента в DOM
     */
    id?: string;
    /**
     * Имя компонента в DOM
     */
    name?: string;
    /**
     * Тема компонента
     */
    theme?: CalendarInputThemeFieldType;
    /**
     * Обработчик установки фокуса на компонент
     */
    onFocus?: Function;
    /**
     * Обработчик снятия фокуса с компонента
     */
    onBlur?: Function;
    /**
     * Обработчик установки фокуса на поле ввода
     */
    onInputFocus?: Function;
    /**
     * Обработчик снятия фокуса с поля ввода
     */
    onInputBlur?: Function;
    /**
     * Обработчик ввода даты в текстовом поле
     */
    onInputChange?: Function;
    /**
     * Обработчик выбора даты в календаре
     */
    onCalendarChange?: Function;
    /**
     * Обрабочик изменения даты в календаре
     */
    onChange?: Function;
    /**
     * Обработчик события нажатия на клавишу в момент, когда фокус находится на компоненте
     */
    onKeyDown?: Function;
    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится в календаре
     */
    onCalendarKeyDown?: Function;
    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на текстовом поле
     */
    onInputKeyDown?: Function;
}



/**
 * Компонент для ввода даты.
 */

export default class CalendarInput extends Component<CalendarInputProps, any> {

    /**
     * Устанавливает фокус на поле ввода, открывает календарь.
     */
    focus(): any;
    /**
     * Убирает фокус с поля ввода.
     */
    blur(): any;
    /**
     * Скроллит страницу до поля ввода.
     */
    scrollTo(): any;
}
