
import { Component, ReactNode } from 'react';

export type SpinSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type SpinThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type SpinClassNameFieldType = Function | string;


export interface SpinProps {

    /**
     * Управление видимостью компонента
     */
    visible?: boolean;
    /**
     * Размер компонента
     */
    size?: SpinSizeFieldType;
    /**
     * Тема компонента
     */
    theme?: SpinThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: SpinClassNameFieldType;
}



/**
 * Компонент показывающий крутящееся кольцо загрузки.
 */

export default class Spin extends Component<SpinProps, any> {

}
