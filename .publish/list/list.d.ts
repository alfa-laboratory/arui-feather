
import { Component, ReactNode } from 'react';

export type ListItemsFieldType = {

    /**
     * Уникальный ключ элемента
     */
    key: string;

    /**
     * Содержание элемента
     */
    value: ReactNode
};
export type ListTypeFieldType = 'default' | 'ordered';
export type ListThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type ListClassNameFieldType = Function | string;


export interface ListProps {

    /**
     * Список элементов
     */
    items?: Array<ListItemsFieldType>;
    /**
     * Тип списка
     */
    type?: ListTypeFieldType;
    /**
     * Тема компонента
     */
    theme?: ListThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: ListClassNameFieldType;
}



/**
 * Компонент списка.
 */

export default class List extends Component<ListProps, any> {

}
