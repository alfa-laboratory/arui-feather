
import { Component, ReactNode } from 'react';

export type AppContentChildrenFieldType = Array<ReactNode> | ReactNode;
export type AppContentClassNameFieldType = Function | string;
export type AppContentThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface AppContentProps {

    /**
     * Дочерние элементы `AppContent`
     */
    children?: AppContentChildrenFieldType;
    /**
     * Дополнительный класс
     */
    className?: AppContentClassNameFieldType;
    /**
     * Тема компонента
     */
    theme?: AppContentThemeFieldType;
}



/**
 * Компонент содержимого страницы.
Обычно используется совместно с компонентом `Page`.
 */

export default class AppContent extends Component<AppContentProps, any> {

}
