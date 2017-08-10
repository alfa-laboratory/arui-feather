
import { Component, ReactNode } from 'react';

export type IconButtonViewFieldType = 'default' | 'action' | 'extra' | 'other';
export type IconButtonTypeFieldType = 'button' | 'reset' | 'submit';
export type IconButtonTagFieldType = 'button' | 'span';
export type IconButtonWidthFieldType = 'default' | 'available';
export type IconButtonSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type IconButtonTogglableFieldType = 'check' | 'radio';
export type IconButtonChildrenFieldType = Array<ReactNode> | ReactNode;
export type IconButtonThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type IconButtonClassNameFieldType = Function | string;


export interface IconButtonProps {

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
    view?: IconButtonViewFieldType;
    /**
     * Поведение кнопки
     */
    type?: IconButtonTypeFieldType;
    /**
     * HTML элемент, которым будет компонент в DOM
     */
    tag?: IconButtonTagFieldType;
    /**
     * Управление шириной кнопки. При значении 'available' растягивает кнопку на ширину родителя
     */
    width?: IconButtonWidthFieldType;
    /**
     * Размер компонента
     */
    size?: IconButtonSizeFieldType;
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
    togglable?: IconButtonTogglableFieldType;
    /**
     * Отображение кнопки в отмеченном (зажатом) состоянии
     */
    checked?: boolean;
    /**
     * Дочерние элементы `Button`
     */
    children?: IconButtonChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: IconButtonThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: IconButtonClassNameFieldType;
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

export default class IconButton extends Component<IconButtonProps, any> {

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
