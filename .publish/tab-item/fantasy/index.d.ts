
import { Component, ReactNode } from 'react';

export type TabItemTargetFieldType = '_self' | '_blank' | '_parent' | '_top';
export type TabItemSizeFieldType = 'xs' | 's' | 'm' | 'l' | 'xl';
export type TabItemChildrenFieldType = Array<ReactNode> | ReactNode;
export type TabItemThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type TabItemClassNameFieldType = Function | string;


export interface TabItemProps {

    /**
     * Иконка ссылки
     */
    icon?: ReactNode;
    /**
     * Текст ссылки
     */
    text?: ReactNode;
    /**
     * href ссылки
     */
    url?: string;
    /**
     * target ссылки
     */
    target?: TabItemTargetFieldType;
    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;
    /**
     * Управление возможностью клика по ссылке
     */
    disabled?: boolean;
    /**
     * Управление состоянием ссылки выбран/не выбран
     */
    checked?: boolean;
    /**
     * Псевдо-ссылка (border-bottom: dotted)
     */
    pseudo?: boolean;
    /**
     * Размер компонента
     */
    size?: TabItemSizeFieldType;
    /**
     * Дочерние элементы `Link`
     */
    children?: TabItemChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: TabItemThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: TabItemClassNameFieldType;
    /**
     * Обработчик клика но ссылке
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
     * Обработчик события наведения курсора на ссылку
     */
    onMouseEnter?: Function;
    /**
     * Обработчик события снятия курсора с ссылки
     */
    onMouseLeave?: Function;
}



/**
 * Компонент ссылки.
 */

export default class TabItem extends Component<TabItemProps, any> {

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    getNode(): any;
    /**
     * Ставит фокус на ссылку.
     */
    focus(): any;
    /**
     * Убирает фокус с ссылки.
     */
    blur(): any;
}
