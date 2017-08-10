
import { Component, ReactNode } from 'react';

export type AttachButtonPropsviewFieldType = 'default' | 'action' | 'extra' | 'other';
export type AttachButtonPropstypeFieldType = 'button' | 'reset' | 'submit';
export type AttachButtonPropstagFieldType = 'button' | 'span';
export type AttachButtonPropswidthFieldType = 'default' | 'available';
export type AttachButtonPropssizeFieldType = 's' | 'm' | 'l' | 'xl';
export type AttachButtonPropstogglableFieldType = 'check' | 'radio';
export type AttachButtonPropsthemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type AttachButtonPropsclassNameFieldType = Function | string;
export type AttachButtonPropsFieldType = {
    text?: ReactNode;
    rightAddons?: ReactNode;
    leftAddons?: ReactNode;
    view?: AttachButtonPropsviewFieldType;
    type?: AttachButtonPropstypeFieldType;
    tag?: AttachButtonPropstagFieldType;
    width?: AttachButtonPropswidthFieldType;
    size?: AttachButtonPropssizeFieldType;
    disabled?: boolean;
    pseudo?: boolean;
    id?: string;
    name?: string;
    title?: string;
    tabIndex?: number;
    togglable?: AttachButtonPropstogglableFieldType;
    checked?: boolean;
    theme?: AttachButtonPropsthemeFieldType;
    className?: AttachButtonPropsclassNameFieldType;
    onClick?: Function;
    onFocus?: Function;
    onBlur?: Function;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
    onMouseDown?: Function;
    onMouseUp?: Function;
    onKeyDown?: Function;
    onKeyUp?: Function
};
export type AttachSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type AttachThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type AttachClassNameFieldType = Function | string;


export interface AttachProps {

    /**
     * Содержимое поля ввода, указанное по умолчанию. Принимает массив объектов типа File или null.
     */
    value?: Array<any>;
    /**
     * Уникальное имя блока
     */
    name?: string;
    /**
     * Идентификатор компонента в DOM
     */
    id?: string;
    /**
     * Иконка
     */
    icon?: ReactNode;
    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;
    /**
     * Текст для случая, когда файл не загружен
     */
    noFileText?: string;
    /**
     * Содержимое кнопки для выбора файла
     */
    buttonContent?: ReactNode;
    /**
     * Свойства для кнопки
     */
    buttonProps?: AttachButtonPropsFieldType;
    /**
     * Доступные для выбора MIME типы файлов
     */
    accept?: string;
    /**
     * Управление возможностью изменения значения компонента
     */
    disabled?: boolean;
    /**
     * Управляет возможностью выбора нескольких файлов
     */
    multiple?: boolean;
    /**
     * Размер компонента
     */
    size?: AttachSizeFieldType;
    /**
     * Тема компонента
     */
    theme?: AttachThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: AttachClassNameFieldType;
    /**
     * Обработчик клика по компоненту кнопки
     */
    onClick?: Function;
    /**
     * Обработчик изменения значения 'value'
     */
    onChange?: Function;
    /**
     * Обработчик фокуса компонента
     */
    onFocus?: Function;
    /**
     * Обработчик снятия фокуса компонента
     */
    onBlur?: Function;
    /**
     * Обработчик события наведения курсора на кнопку
     */
    onMouseEnter?: Function;
    /**
     * Обработчик события снятия курсора с кнопки
     */
    onMouseLeave?: Function;
}



/**
 * Компонент прикрепления файлов
 */

export default class Attach extends Component<AttachProps, any> {

    /**
     * Ставит фокус на контрол.
     */
    focus(): any;
    /**
     * Убирает фокус с контрола.
     */
    blur(): any;
}
