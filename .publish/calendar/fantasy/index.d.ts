
import { Component, ReactNode } from 'react';

export type CalendarThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type CalendarClassNameFieldType = Function | string;


export interface CalendarProps {

    /**
     * Выбранная дата, в формате unix timestamp
     */
    value?: number;
    /**
     * Левая граница диапазона дат, в формате unix timestamp
     */
    selectedFrom?: number;
    /**
     * Правая граница диапазона дат, в формате unix timestamp
     */
    selectedTo?: number;
    /**
     * Левая граница дат, возможных для выбора, в формате unix timestamp
     */
    earlierLimit?: number;
    /**
     * Правая граница дат, возможных для выбора, в формате unix timestamp
     */
    laterLimit?: number;
    /**
     * Месяц, в формате unix timestamp
     */
    month?: number;
    /**
     * Обработчик смены даты
     */
    onValueChange?: Function;
    /**
     * Обработчик смены месяца
     */
    onMonthChange?: Function;
    /**
     * Тип форматирования даты при выводе
     */
    outputFormat?: string;
    /**
     * Список названий месяцев
     */
    months?: Array<string>;
    /**
     * Список названий дней недели
     */
    weekdays?: Array<string>;
    /**
     * Список выходных дней в виде unix timestamp, отсортированный по возрастанию
     */
    offDays?: Array<number>;
    /**
     * Отображение стрелок навигации по месяцам
     */
    showArrows?: boolean;
    /**
     * Возможность управления календарём с клавиатуры
     */
    isKeyboard?: boolean;
    /**
     * Тема компонента
     */
    theme?: CalendarThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: CalendarClassNameFieldType;
    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyDown?: Function;
    /**
     * Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyUp?: Function;
    /**
     * Обработчик фокуса
     */
    onFocus?: Function;
    /**
     * Обработчик снятия фокуса
     */
    onBlur?: Function;
}



/**
 * Компонент календаря.
 */

export default class Calendar extends Component<CalendarProps, any> {

    /**
     * Устанавливает фокус на календарь.
     */
    focus(): any;
    /**
     * Убирает фокус с календаря.
     */
    blur(): any;
    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    getNode(): any;
}
