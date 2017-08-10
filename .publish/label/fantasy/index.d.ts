
import { Component, ReactNode } from 'react';

export type LabelSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type LabelChildrenFieldType = Array<ReactNode> | ReactNode;
export type LabelThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type LabelClassNameFieldType = Function | string;


export interface LabelProps {

    /**
     * Размер компонента
     */
    size?: LabelSizeFieldType;
    /**
     * Дочерние элементы `Label`
     */
    children?: LabelChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: LabelThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: LabelClassNameFieldType;
    /**
     * Управление возможностью рендерить компонент в одну сроку
     */
    isNoWrap?: boolean;
}



/**
 * Компонента лейбла.
 */

export default class Label extends Component<LabelProps, any> {

}
