
import { Component, ReactNode } from 'react';

export type TagButtonViewFieldType = 'default' | 'action' | 'extra' | 'other';
export type TagButtonTypeFieldType = 'button' | 'reset' | 'submit';
export type TagButtonTagFieldType = 'button' | 'span';
export type TagButtonWidthFieldType = 'default' | 'available';
export type TagButtonSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type TagButtonTogglableFieldType = 'check' | 'radio';
export type TagButtonChildrenFieldType = Array<ReactNode> | ReactNode;
export type TagButtonThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type TagButtonClassNameFieldType = Function | string;


export interface TagButtonProps {

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
    view?: TagButtonViewFieldType;
    /**
     * Поведение кнопки
     */
    type?: TagButtonTypeFieldType;
    /**
     * HTML элемент, которым будет компонент в DOM
     */
    tag?: TagButtonTagFieldType;
    /**
     * Управление шириной кнопки. При значении 'available' растягивает кнопку на ширину родителя
     */
    width?: TagButtonWidthFieldType;
    /**
     * Размер компонента
     */
    size?: TagButtonSizeFieldType;
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
    togglable?: TagButtonTogglableFieldType;
    /**
     * Отображение кнопки в отмеченном (зажатом) состоянии
     */
    checked?: boolean;
    /**
     * Дочерние элементы `Button`
     */
    children?: TagButtonChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: TagButtonThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: TagButtonClassNameFieldType;
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

export default class TagButton extends Component<TagButtonProps, any> {

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
