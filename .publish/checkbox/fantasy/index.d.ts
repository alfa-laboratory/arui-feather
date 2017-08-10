
import { Component, ReactNode } from 'react';

export type CheckBoxSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type CheckBoxTypeFieldType = 'normal' | 'button';
export type CheckBoxThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type CheckBoxClassNameFieldType = Function | string;


export interface CheckBoxProps {

    /**
     * Текст подписи к чекбоксу
     */
    text?: ReactNode;
    /**
     * Идентификатор компонента в DOM
     */
    id?: string;
    /**
     * Имя компонента в DOM
     */
    name?: string;
    /**
     * Текст всплывающей подсказки
     */
    title?: string;
    /**
     * Значение чекбокса, которое будет отправлено на сервер, если он выбран
     */
    value?: string;
    /**
     * Размер компонента
     */
    size?: CheckBoxSizeFieldType;
    /**
     * Тип чекбокса
     */
    type?: CheckBoxTypeFieldType;
    /**
     * Управление возможностью изменять состояние 'checked' компонента
     */
    disabled?: boolean;
    /**
     * Управление состоянием вкл/выкл компонента
     */
    checked?: boolean;
    /**
     * Управление неопределенным состоянием чекбокса
     */
    indeterminate?: boolean;
    /**
     * Тема компонента
     */
    theme?: CheckBoxThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: CheckBoxClassNameFieldType;
    /**
     * Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента
     */
    onChange?: Function;
    /**
     * Обработчик фокуса комнонента
     */
    onFocus?: Function;
    /**
     * Обработчик снятия фокуса компонента
     */
    onBlur?: Function;
    /**
     * Обработчик события наведения курсора на чекбокс
     */
    onMouseEnter?: Function;
    /**
     * Обработчик события снятия курсора с чекбокса
     */
    onMouseLeave?: Function;
}



/**
 * Компонент чекбокса.
 */

export default class CheckBox extends Component<CheckBoxProps, any> {

    /**
     * Устанавливает фокус на чекбокс.
     */
    focus(): any;
    /**
     * Убирает фокус с чекбокса.
     */
    blur(): any;
    /**
     * Скроллит страницу до чекбокса.
     */
    scrollTo(): any;
}
