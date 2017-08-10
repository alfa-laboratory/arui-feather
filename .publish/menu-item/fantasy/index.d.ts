
import { Component, ReactNode } from 'react';

export type MenuItemTypeFieldType = 'link' | 'dropdown' | 'block';
export type MenuItemViewFieldType = 'default' | 'link' | 'pseudo';
export type MenuItemTargetFieldType = '_self' | '_blank' | '_parent' | '_top';
export type MenuItemValueFieldType = string | number;
export type MenuItemSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type MenuItemChildrenFieldType = Array<ReactNode> | ReactNode;
export type MenuItemThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type MenuItemClassNameFieldType = Function | string;


export interface MenuItemProps {

    /**
     * Тип элемента меню
     */
    type?: MenuItemTypeFieldType;
    /**
     * Тип ссылки, для компонента с type='link'
     */
    view?: MenuItemViewFieldType;
    /**
     * href ссылки, для компонента с type='link'
     */
    url?: string;
    /**
     * target для ссылки
     */
    target?: MenuItemTargetFieldType;
    /**
     * Уникальное значение элемента. Для использования в Menu
     */
    value?: MenuItemValueFieldType;
    /**
     * Попап для компонента с type='dropdown'
     */
    popup?: ReactNode;
    /**
     * Управление возможностью выбирать данный компонент
     */
    disabled?: boolean;
    /**
     * Управление состоянием выбран/не выбран компонента
     */
    checked?: boolean;
    /**
     * Управление видимостью компонента
     */
    hidden?: boolean;
    /**
     * Управление визуальным выделением компонента
     */
    hovered?: boolean;
    /**
     * Размер компонента
     */
    size?: MenuItemSizeFieldType;
    /**
     * Дочерние элементы `MenuItem`
     */
    children?: MenuItemChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: MenuItemThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: MenuItemClassNameFieldType;
    /**
     * Только для type='link', обработчик клика по компоненту
     */
    onClick?: Function;
    /**
     * Обработчик фокуса компонента
     */
    onFocus?: Function;
    /**
     * Обработчик снятия фокуса компонента
     */
    onBlur?: Function;
    /**
     * Обработчик события наведения курсора на элемент меню
     */
    onMouseEnter?: Function;
    /**
     * Обработчик события снятия курсора с элемента меню
     */
    onMouseLeave?: Function;
}



/**
 * Компонент элемента меню. Как правило, используется совместно с `Menu`.
 */

export default class MenuItem extends Component<MenuItemProps, any> {

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    getNode(): any;
    /**
     * Устанавливает фокус на элементе меню.
     */
    focus(): any;
    /**
     * Убирает фокус с элемента меню.
     */
    blur(): any;
}
