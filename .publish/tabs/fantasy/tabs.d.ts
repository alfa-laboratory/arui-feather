
import { Component, ReactNode } from 'react';

export type TabsThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type TabsClassNameFieldType = Function | string;


export interface TabsProps {

    /**
     * Управление возможность скроллить компонент по-горизонтали
     */
    scrollable?: boolean;
    /**
     * Дочерние компоненты
     */
    children?: ReactNode;
    /**
     * Тема компонента
     */
    theme?: TabsThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: TabsClassNameFieldType;
}



/**
 * Компонент навигации в виде табов. Как правило используется совместно с `TabItem`.
 */

export default class Tabs extends Component<TabsProps, any> {

}
