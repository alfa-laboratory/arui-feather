
import { Component, ReactNode } from 'react';

export type FormFieldChildrenFieldType = Array<ReactNode> | ReactNode;
export type FormFieldSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type FormFieldThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type FormFieldClassNameFieldType = Function | string;


export interface FormFieldProps {

    /**
     * Дочерние элементы `FormField`
     */
    children?: FormFieldChildrenFieldType;
    /**
     * Заголовок для контрола
     */
    label?: ReactNode;
    /**
     * Размер компонента
     */
    size?: FormFieldSizeFieldType;
    /**
     * Расположение элемента label: 'line'
     */
    view?: string;
    /**
     * Тема компонента
     */
    theme?: FormFieldThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: FormFieldClassNameFieldType;
}



/**
 * Компонент поля формы: cодержит заголовок контрола и сам контрол.
Контрол должен быть передан дочерним компонентов.
 */

export default class FormField extends Component<FormFieldProps, any> {

}
