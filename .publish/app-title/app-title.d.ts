
import { Component, ReactNode } from 'react';

export type AppTitleChildrenFieldType = Array<ReactNode> | ReactNode;
export type AppTitleClassNameFieldType = Function | string;
export type AppTitleThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface AppTitleProps {

    /**
     * Дочерние элементы `AppTitle`
     */
    children?: AppTitleChildrenFieldType;
    /**
     * Дополнительный класс
     */
    className?: AppTitleClassNameFieldType;
    /**
     * Тема компонента
     */
    theme?: AppTitleThemeFieldType;
}



/**
 * Компонент заголовка страницы.
Обычно используется совместно с компонентом `Page`.
 */

export default class AppTitle extends Component<AppTitleProps, any> {

}
