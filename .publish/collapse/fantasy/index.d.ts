
import { Component, ReactNode } from 'react';

export type CollapseChildrenFieldType = Array<ReactNode> | ReactNode;
export type CollapseThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type CollapseClassNameFieldType = Function | string;


export interface CollapseProps {

    /**
     * Управление состоянием `expand`/`collapse` компонента
     */
    isExpanded?: boolean;
    /**
     * Текст ссылки в `expand` состоянии
     */
    collapsedLabel?: string;
    /**
     * Текст ссылки в `collapse` состоянии
     */
    expandedLabel?: string;
    /**
     * Дочерние элементы `Collapse`
     */
    children?: CollapseChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: CollapseThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: CollapseClassNameFieldType;
    /**
     * Обработчик смены состояния `expand`/`collapse`
     */
    onExpandedChange?: Function;
}



/**
 * Компонент «подката» позволяет спрятать кусок текста за ссылку «Еще...».
 */

export default class Collapse extends Component<CollapseProps, any> {

}
