
import { Component, ReactNode } from 'react';

export type RadioTypeFieldType = 'normal' | 'button';
export type RadioWidthFieldType = 'default' | 'available';
export type RadioSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type RadioThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type RadioClassNameFieldType = Function | string;


export interface RadioProps {

    /**
     * Тип
     */
    type?: RadioTypeFieldType;
    /**
     * Управление состоянием вкл/выкл компонента
     */
    checked?: boolean;
    /**
     * Управление возможностью изменения состояние 'checked' компонента
     */
    disabled?: boolean;
    /**
     * Уникальный идентификатор блока
     */
    id?: string;
    /**
     * Уникальное имя блока
     */
    name?: string;
    /**
     * Значение радио-кнопки, которое будет отправлено на сервер, если она выбрана
     */
    value?: string;
    /**
     * Текст подписи к радио-кнопке
     */
    text?: ReactNode;
    /**
     * Управление шириной кнопки для типа 'button'. При значении 'available' растягивает кнопку на ширину родителя
     */
    width?: RadioWidthFieldType;
    /**
     * Размер компонента
     */
    size?: RadioSizeFieldType;
    /**
     * Отображение в состоянии ошибки
     */
    error?: boolean;
    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;
    /**
     * Тема компонента
     */
    theme?: RadioThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: RadioClassNameFieldType;
    /**
     * Обработчик изменения значения 'checked' компонента, принимает на вход isChecked и value компонента
     */
    onChange?: Function;
    /**
     * Обработчик фокуса комнонента
     */
    onFocus?: Function;
    /**
     * Обработчик снятия фокуса с компонента
     */
    onBlur?: Function;
    /**
     * Обработчик события наведения курсора на радио-кнопку
     */
    onMouseEnter?: Function;
    /**
     * Обработчик события снятия курсора с радио-кнопки
     */
    onMouseLeave?: Function;
}



/**
 * Компонент радио-кнопки.
 */

export default class Radio extends Component<RadioProps, any> {

    /**
     * Устанавливает фокус на радио-кнопку.
     */
    focus(): any;
    /**
     * Убирает фокус с радио-кнопки.
     */
    blur(): any;
    /**
     * Скроллит страницу до радио-кнопки.
     */
    scrollTo(): any;
}
