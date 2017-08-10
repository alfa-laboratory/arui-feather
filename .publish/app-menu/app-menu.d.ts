
import { Component, ReactNode } from 'react';

export type AppMenuChildrenFieldType = Array<ReactNode> | ReactNode;
export type AppMenuClassNameFieldType = Function | string;
export type AppMenuThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface AppMenuProps {

    /**
     * Дочерние элементы `AppMenu`
     */
    children?: AppMenuChildrenFieldType;
    /**
     * Дополнительный класс
     */
    className?: AppMenuClassNameFieldType;
    /**
     * Тема компонента
     */
    theme?: AppMenuThemeFieldType;
}



/**
 * Компонент меню страницы.
Обычно используется совместно с компонентом `Page`.
 */

export default class AppMenu extends Component<AppMenuProps, any> {

}
