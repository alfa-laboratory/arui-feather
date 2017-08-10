
import { Component, ReactNode } from 'react';

export type IconIconFieldType = 'error' | 'fail' | 'ok' | 'ok_filled' | 'attachment' | 'calendar' | 'search' | 'close' | 'user';
export type IconSizeFieldType = 's' | 'm' | 'l' | 'xl' | 'xxl';
export type IconChildrenFieldType = Array<ReactNode> | ReactNode;
export type IconThemeFieldType = 'alfa-on-color' | 'alfa-on-white' | 'alfa-on-colored';
export type IconClassNameFieldType = Function | string;


export interface IconProps {

    /**
     * Тип иконки
     */
    icon?: IconIconFieldType;
    /**
     * Размер компонента
     */
    size?: IconSizeFieldType;
    /**
     * Дочерние элементы `Icon`
     */
    children?: IconChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: IconThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: IconClassNameFieldType;
    /**
     * Обработчик клика по иконке
     */
    onClick?: Function;
}



/**
 * Компонент иконки. Содержит в себе только неодходимые для компонентов иконки.
Все иконки доступны в двух цветовых темах `alfa-on-color` и `alfa-on-white`.

Для иконок `error` и `ок` также есть цветной вариант,
реализуемый темой `alfa-on-colored`.
 */

export default class Icon extends Component<IconProps, any> {

}
