
import { Component, ReactNode } from 'react';

export type ParagraphViewFieldType = 'lead' | 'normal';
export type ParagraphChildrenFieldType = Array<ReactNode> | ReactNode;
export type ParagraphThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type ParagraphClassNameFieldType = Function | string;


export interface ParagraphProps {

    /**
     * Тип параграфа
     */
    view?: ParagraphViewFieldType;
    /**
     * Маркер параграфа
     */
    mark?: ReactNode;
    /**
     * Дочерние элементы `Paragraph`
     */
    children?: ParagraphChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: ParagraphThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: ParagraphClassNameFieldType;
}



/**
 * Компонент параграфа текста.
 */

export default class Paragraph extends Component<ParagraphProps, any> {

}
