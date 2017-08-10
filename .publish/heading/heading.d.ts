
import { Component, ReactNode } from 'react';

export type HeadingChildrenFieldType = Array<ReactNode> | ReactNode;
export type HeadingSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type HeadingThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type HeadingClassNameFieldType = Function | string;


export interface HeadingProps {

    /**
     * Дочерние элементы `Heading`
     */
    children?: HeadingChildrenFieldType;
    /**
     * Размер, определяющий какой тег заголовка будет использоваться
     */
    size?: HeadingSizeFieldType;
    /**
     * Тема компонента
     */
    theme?: HeadingThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: HeadingClassNameFieldType;
}



/**
 * Компонент заголовка.
 */

export default class Heading extends Component<HeadingProps, any> {

}
