
import { Component, ReactNode } from 'react';

export type FooterThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type FooterClassNameFieldType = Function | string;


export interface FooterProps {

    /**
     * Меню в подвале
     */
    menu?: ReactNode;
    /**
     * Дополнительный текст
     */
    additional?: ReactNode;
    /**
     * Содержимое блока соц. сетей
     */
    social?: ReactNode;
    /**
     * Отображение блока соц. сетей
     */
    showSocial?: boolean;
    /**
     * Содержимое блока копирайта
     */
    copyright?: ReactNode;
    /**
     * Отображение годов в копирайте
     */
    showYears?: boolean;
    /**
     * Тема компонента
     */
    theme?: FooterThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: FooterClassNameFieldType;
}



/**
 * Компонент подвала сайта.
Обычно используется совместно с компонентом `Page`.
 */

export default class Footer extends Component<FooterProps, any> {

}
