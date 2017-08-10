
import { Component, ReactNode } from 'react';

export type MenuGroupViewFieldType = 'default' | 'line';
export type MenuModeFieldType = 'basic' | 'check' | 'radio' | 'radio-check';
export type MenuHighlightedItemrefFieldType = number | string;
export type MenuHighlightedItemFieldType = {

    /**
     * Уникальный идентификатор
     */
    ref?: MenuHighlightedItemrefFieldType;

    /**
     * Элемент списка типа ContentItem
     */
    item?: any
};
export type MenuContenttypeFieldType = 'item' | 'group';
export type MenuContentvalueFieldType = string | number;
export type MenuContentcontentFieldType = ReactNode | Array<any>;
export type MenuContentFieldType = {

    /**
     * Тип элемента
     */
    type?: MenuContenttypeFieldType;

    /**
     * Только для type='item', свойство для компонента [MenuItem](../menu-item/)
     */
    value?: MenuContentvalueFieldType;

    /**
     * Содержание элемента
     */
    content?: MenuContentcontentFieldType;

    /**
     * Только для type='item': свойства для компонента [MenuItem](../menu-item/)
     */
    props?: object
};
export type MenuCheckedItemsFieldType = string | number;
export type MenuSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type MenuThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type MenuClassNameFieldType = Function | string;


export interface MenuProps {

    /**
     * Тип расположения меню: 'horizontal'
     */
    view?: string;
    /**
     * Размещение заголовка групп: обычное или в одну строку с первым элементом группы
     */
    groupView?: MenuGroupViewFieldType;
    /**
     * Тип списка вариантов меню
     */
    mode?: MenuModeFieldType;
    /**
     * Управление возможностью изменения значения
     */
    disabled?: boolean;
    /**
     * Управление состоянием фокуса элемента
     */
    focused?: boolean;
    /**
     * Управление автоматическим фокусом на первом элементе при вызове публичного метода focus
     */
    autoFocusFirstItem?: boolean;
    /**
     * Элемент меню, на котором стоит выделение
     */
    highlightedItem?: MenuHighlightedItemFieldType;
    /**
     * Список объектов ContentItem
     */
    content?: Array<MenuContentFieldType>;
    /**
     * Список значений выбранных элементов
     */
    checkedItems?: Array<MenuCheckedItemsFieldType>;
    /**
     * Размер компонента
     */
    size?: MenuSizeFieldType;
    /**
     * Объект со стилями
     */
    style?: any/* Не нашелся встроенный тип для типа {"name":"custom","raw":"styleType"}
                 * https://github.com/alfa-laboratory/library-utils/issues/new 
                 */;
    /**
     * Тема компонента
     */
    theme?: MenuThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: MenuClassNameFieldType;
    /**
     * Обработчик клика по варианту меню
     */
    onItemClick?: Function;
    /**
     * Обработчик выбора варианта меню
     */
    onItemCheck?: Function;
    /**
     * Обработчик события наведения курсора на меню
     */
    onMouseEnter?: Function;
    /**
     * Обработчик события снятия курсора с меню
     */
    onMouseLeave?: Function;
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
    /**
     * Обработчик события выделения элемента меню, принимает на вход переменную типа HighlightedItem
     */
    onHighlightItem?: Function;
}



/**
 * Компонент меню.
 */

export default class Menu extends Component<MenuProps, any> {

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    getNode(): any;
    /**
     * Устанавливает фокус на меню.
     */
    focus(): any;
    /**
     * Убирает фокус с меню.
     */
    blur(): any;
}
