
import { Component, ReactNode } from 'react';

export type PlateChildrenFieldType = Array<ReactNode> | ReactNode;
export type PlateThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type PlateClassNameFieldType = Function | string;


export interface PlateProps {

    /**
     * Управление наличием закрывающего крестика
     */
    hasCloser?: boolean;
    /**
     * Плоская тема
     */
    isFlat?: boolean;
    /**
     * Дочерние элементы `Plate`
     */
    children?: PlateChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: PlateThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: PlateClassNameFieldType;
    /**
     * Обработчик клика по плашке
     */
    onClick?: Function;
    /**
     * Обработчик клика по крестику
     */
    onCloserClick?: Function;
}



/**
 * Компонент плашки.
 */

export default class Plate extends Component<PlateProps, any> {

}
