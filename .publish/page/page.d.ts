
import { Component, ReactNode } from 'react';

export type PageChildrenFieldType = Array<ReactNode> | ReactNode;
export type PageThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type PageClassNameFieldType = Function | string;


export interface PageProps {

    /**
     * Шапка страницы
     */
    header?: ReactNode;
    /**
     * Дочерние элементы `Page`
     */
    children?: PageChildrenFieldType;
    /**
     * Футер страницы
     */
    footer?: ReactNode;
    /**
     * Тема компонента
     */
    theme?: PageThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: PageClassNameFieldType;
}



/**
 * Компонент страницы.
Как правило является корневым компонентов страницы.
Обычно используется совместно с компонентами `Header`, `Footer`
и компонентами `AppTitle`, `AppMenu` и `AppContent`.
 */

export default class Page extends Component<PageProps, any> {

}
