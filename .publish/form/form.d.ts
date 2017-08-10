
import { Component, ReactNode } from 'react';

export type FormEnctypeFieldType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
export type FormMethodFieldType = 'post' | 'get';
export type FormViewFieldType = 'line' | 'normal';
export type FormSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type FormChildrenFieldType = Array<ReactNode> | ReactNode;
export type FormThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type FormClassNameFieldType = Function | string;


export interface FormProps {

    /**
     * Способ кодирования данных формы при их отправке
     */
    enctype?: FormEnctypeFieldType;
    /**
     * Адрес отправки данных на сервер
     */
    action?: string;
    /**
     * Метод запроса
     */
    method?: FormMethodFieldType;
    /**
     * Тип формы
     */
    view?: FormViewFieldType;
    /**
     * Размер компонента
     */
    size?: FormSizeFieldType;
    /**
     * Футер для формы
     */
    footer?: ReactNode;
    /**
     * Управление встроенным в браузер механизмом валидации формы
     */
    noValidate?: boolean;
    /**
     * Управление автозаполнением формы
     */
    autocomplete?: boolean;
    /**
     * Дочерние элементы формы
     */
    children?: FormChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: FormThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: FormClassNameFieldType;
    /**
     * Идентификатор компонента в DOM
     */
    id?: string;
    /**
     * Имя компонента в DOM
     */
    name?: string;
    /**
     * Обработчик отправки формы
     */
    onSubmit?: Function;
}



/**
 * Компонент формы.
 */

export default class Form extends Component<FormProps, any> {

}
