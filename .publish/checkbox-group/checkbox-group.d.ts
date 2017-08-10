
import { Component, ReactNode } from 'react';

export type CheckBoxGroupTypeFieldType = 'normal' | 'button' | 'line';
export type CheckBoxGroupChildrenFieldType = Array<ReactNode> | ReactNode;
export type CheckBoxGroupThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type CheckBoxGroupClassNameFieldType = Function | string;


export interface CheckBoxGroupProps {

    /**
     * Тип компонента
     */
    type?: CheckBoxGroupTypeFieldType;
    /**
     * Дочерние элементы `CheckBoxGroup`, как правило, компоненты `CheckBox`
     */
    children?: CheckBoxGroupChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: CheckBoxGroupThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: CheckBoxGroupClassNameFieldType;
    /**
     * Лейбл для группы
     */
    label?: ReactNode;
}



/**
 * Компонент группы чекбоксов.
 */

export default class CheckBoxGroup extends Component<CheckBoxGroupProps, any> {

}
