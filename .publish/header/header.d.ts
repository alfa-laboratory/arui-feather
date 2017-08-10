
import { Component, ReactNode } from 'react';

export type HeaderThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type HeaderClassNameFieldType = Function | string;


export interface HeaderProps {
    root?: string;
    /**
     * Содержимое кастомного логотипа в шапке
     */
    logo?: ReactNode;
    /**
     * Содержимое меню в шапке
     */
    menu?: ReactNode;
    /**
     * Содержимое блока пользователя
     */
    user?: ReactNode;
    /**
     * Содержимое блока контактов поддержки
     */
    support?: ReactNode;
    /**
     * Произвольный контент над логотипом и меню
     */
    topContent?: ReactNode;
    /**
     * Управление возможностью фиксирования шапки к верхнему краю окна
     */
    fixed?: boolean;
    /**
     * Тема компонента
     */
    theme?: HeaderThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: HeaderClassNameFieldType;
    /**
     * Обработчик события изменение размера шапки
     */
    onResize?: Function;
    /**
     * Обработчик события клика по логотипу Альфа-Банк
     */
    onLogoClick?: Function;
}



/**
 * Компонент шапки сайта: лого, меню и пользовательский профиль.
Обычно используется совместно с компонентом `Page`.
 */

export default class Header extends Component<HeaderProps, any> {

}
