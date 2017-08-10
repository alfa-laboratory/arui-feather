
import { Component, ReactNode } from 'react';

export type PopupHeaderSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type PopupHeaderThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type PopupHeaderClassNameFieldType = Function | string;


export interface PopupHeaderProps {

    /**
     * Размер компонента
     */
    size?: PopupHeaderSizeFieldType;
    /**
     * Содержимое заголовка
     */
    title?: ReactNode;
    /**
     * Тема компонента
     */
    theme?: PopupHeaderThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: PopupHeaderClassNameFieldType;
    /**
     * Обработчик клика по кнопке закрытия
     */
    onCloseClick?: Function;
}



/**
 * Заголовок popup'а
 */

export default class PopupHeader extends Component<PopupHeaderProps, any> {

}
