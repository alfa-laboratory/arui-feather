
import { Component, ReactNode } from 'react';

export type SlideDownThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type SlideDownClassNameFieldType = string | Function;


export interface SlideDownProps {

    /**
     * Управление состоянием expand/collapse компонента
     */
    isExpanded?: boolean;
    /**
     * Контент компонента
     */
    children?: ReactNode;
    /**
     * Тема компонента
     */
    theme?: SlideDownThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: SlideDownClassNameFieldType;
}



/**
 * Компонент "расхлопа".
Позволяет скрывать и отображать контент.
 */

export default class SlideDown extends Component<SlideDownProps, any> {

}
