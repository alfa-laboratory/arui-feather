
import { Component, ReactNode } from 'react';

export type SidebarThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type SidebarClassNameFieldType = Function | string;
export type SidebarChildrenFieldType = Array<ReactNode> | ReactNode;


export interface SidebarProps {

    /**
     * Тема компонента
     */
    theme?: SidebarThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: SidebarClassNameFieldType;
    /**
     * Дочерние компоненты
     */
    children?: SidebarChildrenFieldType;
    /**
     * Признак для отрисовки элемента закрытия
     */
    hasCloser?: boolean;
    /**
     * Признак появления холодильника
     */
    visible: boolean;
    /**
     * Обработчик клика на элемент закрытия
     */
    onCloserClick?: Function;
}



/**
 * Компонент боковой панели aka холодильник.
 */

export default class Sidebar extends Component<SidebarProps, any> {

}
