
import { Component, ReactNode } from 'react';

export type SupportSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type SupportThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type SupportClassNameFieldType = Function | string;


export interface SupportProps {

    /**
     * Название города
     */
    city?: string;
    /**
     * Номер телефона
     */
    phone?: string;
    /**
     * Размер компонента
     */
    size?: SupportSizeFieldType;
    /**
     * Тема компонента
     */
    theme?: SupportThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: SupportClassNameFieldType;
    /**
     * Обработчик клика по городу
     */
    onCityClick?: Function;
    /**
     * Обработчик клика по телефону
     */
    onPhoneClick?: Function;
}



/**
 * Компонент с информацией о поддержке для клиентов.
Включает в себя город и телефон.
 */

export default class Support extends Component<SupportProps, any> {

}
