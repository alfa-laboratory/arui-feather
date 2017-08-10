
import { Component, ReactNode } from 'react';

export type NotificationStatusFieldType = 'error' | 'fail' | 'ok';
export type NotificationStickToFieldType = 'left' | 'right';
export type NotificationChildrenFieldType = Array<ReactNode> | ReactNode;
export type NotificationThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type NotificationClassNameFieldType = Function | string;


export interface NotificationProps {

    /**
     * Тип компонента
     */
    status?: NotificationStatusFieldType;
    /**
     * Управление видимостью компонента
     */
    visible?: boolean;
    /**
     * Отступ от верхнего края
     */
    offset?: number;
    /**
     * К какому краю прижат попап
     */
    stickTo?: NotificationStickToFieldType;
    /**
     * Управляет отображением кнопки закрытия уведомления
     */
    hasCloser?: boolean;
    /**
     * Дочерние элементы `Notification`
     */
    children?: NotificationChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: NotificationThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: NotificationClassNameFieldType;
    /**
     * Заголовок сообщения
     */
    title?: ReactNode;
    /**
     * Замена стандартной иконки
     */
    icon?: ReactNode;
    /**
     * Время до закрытия компонента
     */
    autoCloseDelay?: number;
    /**
     * Управление возможностью закрытия компонента по клику вне его
     */
    outsideClickClosable?: boolean;
    /**
     * Обработчик события истечения времени до закрытия компонента
     */
    onCloseTimeout?: Function;
    /**
     * Обработчик клика по крестику компонента
     */
    onCloserClick?: Function;
    /**
     * Обработчик события наведения курсора на попап
     */
    onMouseEnter?: Function;
    /**
     * Обработчик события снятия курсора с попапа
     */
    onMouseLeave?: Function;
    /**
     * Обработчик клика вне компонента
     */
    onClickOutside?: Function;
    /**
     * Обработчик клика по компоненту
     */
    onClick?: Function;
}



/**
 * Компонент всплывающего окна.
 */

export default class Notification extends Component<NotificationProps, any> {

}
