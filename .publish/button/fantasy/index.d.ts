
import { Component, ReactNode } from 'react';

export type ButtonViewFieldType = 'default' | 'action' | 'extra' | 'other';
export type ButtonTypeFieldType = 'button' | 'reset' | 'submit';
export type ButtonTagFieldType = 'button' | 'span';
export type ButtonWidthFieldType = 'default' | 'available';
export type ButtonSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type ButtonTogglableFieldType = 'check' | 'radio';
export type ButtonChildrenFieldType = Array<ReactNode> | ReactNode;
export type ButtonThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type ButtonClassNameFieldType = Function | string;


export interface ButtonProps {

    /**
     * Текст кнопки
     */
    text?: ReactNode;
    /**
     * Иконка кнопки
     */
    icon?: ReactNode;
    /**
     * Список произвольных элементов в левом слоте
     */
    rightAddons?: ReactNode;
    /**
     * Список произвольных элементов в правом слоте
     */
    leftAddons?: ReactNode;
    /**
     * Тип кнопки
     */
    view?: ButtonViewFieldType;
    /**
     * Поведение кнопки
     */
    type?: ButtonTypeFieldType;
    /**
     * HTML элемент, которым будет компонент в DOM
     */
    tag?: ButtonTagFieldType;
    /**
     * Управление шириной кнопки. При значении 'available' растягивает кнопку на ширину родителя
     */
    width?: ButtonWidthFieldType;
    /**
     * Размер компонента
     */
    size?: ButtonSizeFieldType;
    /**
     * Управление возможности взаимодействия с компонентом
     */
    disabled?: boolean;
    /**
     * Отображение кнопки в состоянии фокуса
     */
    focused?: boolean;
    /**
     * Псевдо представление кнопки
     */
    pseudo?: boolean;
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
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;
    /**
     * Тип переключателя
     */
    togglable?: ButtonTogglableFieldType;
    /**
     * Отображение кнопки в отмеченном (зажатом) состоянии
     */
    checked?: boolean;
    /**
     * Дочерние элементы `Button`
     */
    children?: ButtonChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: ButtonThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: ButtonClassNameFieldType;
    /**
     * Обработчик клика по кнопке
     */
    onClick?: Function;
    /**
     * Обработчик фокуса кнопки
     */
    onFocus?: Function;
    /**
     * Обработчик снятия фокуса кнопки
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
    /**
     * Обработчик события нажатия кнопки мыши в момент
     */
    onMouseDown?: Function;
    /**
     * Обработчик события отжатия кнопки мыши в момент
     */
    onMouseUp?: Function;
    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyDown?: Function;
    /**
     * Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyUp?: Function;
}



/**
 * Компонент кнопки (да, она нажимается!).
 */

export default class Button extends Component<ButtonProps, any> {

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    getNode(): any;
    /**
     * Устанавливает фокус на поле ввода.
     */
    focus(): any;
    /**
     * Убирает фокус с поля ввода.
     */
    blur(): any;
}
