
import { Component, ReactNode } from 'react';

export type LinkTargetFieldType = '_self' | '_blank' | '_parent' | '_top';
export type LinkSizeFieldType = 'xs' | 's' | 'm' | 'l' | 'xl';
export type LinkChildrenFieldType = Array<ReactNode> | ReactNode;
export type LinkThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type LinkClassNameFieldType = Function | string;


export interface LinkProps {

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
    target?: LinkTargetFieldType;
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
    size?: LinkSizeFieldType;
    /**
     * Дочерние элементы `Link`
     */
    children?: LinkChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: LinkThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: LinkClassNameFieldType;
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

export default class Link extends Component<LinkProps, any> {

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
