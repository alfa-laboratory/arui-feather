
import { Component, ReactNode } from 'react';

export type UserClassNameFieldType = Function | string;
export type UserThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface UserProps {

    /**
     * Дополнительный класс
     */
    className?: UserClassNameFieldType;
    /**
     * Иконка пользователя
     */
    icon?: ReactNode;
    /**
     * Имя пользователя
     */
    text?: string;
    /**
     * Тема компонента
     */
    theme?: UserThemeFieldType;
    /**
     * href ссылки с именем пользователя
     */
    url?: string;
    /**
     * Обработчик клика по пользователю
     */
    onClick?: Function;
}



/**
 * Компонент доступа к пользовательскому профилю: cодержит имя пользователя и кнопку "Выйти".
 */

export default class User extends Component<UserProps, any> {

}
