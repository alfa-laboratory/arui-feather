
import { Component, ReactNode } from 'react';

export type InputGroupWidthFieldType = 'default' | 'available';
export type InputGroupChildrenFieldType = Array<ReactNode> | ReactNode;
export type InputGroupThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type InputGroupClassNameFieldType = Function | string;


export interface InputGroupProps {

    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: InputGroupWidthFieldType;
    /**
     * Дочерние элементы `InputGroup`, как правило, компоненты `Input`
     */
    children?: InputGroupChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: InputGroupThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: InputGroupClassNameFieldType;
}



/**
 * Компонент группы полей для текстового ввода.
 */

export default class InputGroup extends Component<InputGroupProps, any> {

}
