
import { Component, ReactNode } from 'react';

export type PopupClassNameFieldType = Function | string;
export type PopupChildrenFieldType = Array<ReactNode> | ReactNode;
export type PopupTypeFieldType = 'default' | 'tooltip';
export type PopupHeightFieldType = 'default' | 'available' | 'adaptive';
export type PopupDirectionsFieldType = 'anchor' | 'top-left' | 'top-center' | 'top-right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type PopupTargetFieldType = 'anchor' | 'position' | 'screen';
export type PopupSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type PopupThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface PopupProps {

    /**
     * Дополнительный класс
     */
    className?: PopupClassNameFieldType;
    /**
     * Дочерние элементы `Popup`
     */
    children?: PopupChildrenFieldType;
    /**
     * Тип попапа
     */
    type?: PopupTypeFieldType;
    /**
     * Подстраивание высоты попапа под край окна ('adaptive'), занятие попапом всей возможной высоты ('available'), 'default'
     */
    height?: PopupHeightFieldType;
    /**
     * Только для target='anchor', расположение (в порядке приоритета) относительно точки открытия. Первым указывается главное направление, через дефис - второстепенное направление
     */
    directions?: Array<PopupDirectionsFieldType>;
    /**
     * Привязка компонента к другому элементу на странице, или его расположение независимо от остальных: 'anchor', 'position', 'screen'
     */
    target?: PopupTargetFieldType;
    /**
     * Только для target='anchor'. Смещение в пикселях всплывающего окна относительно основного направления
     */
    mainOffset?: number;
    /**
     * Только для target='anchor'. Смещение в пикселях всплывающего окна относительно второстепенного направления
     */
    secondaryOffset?: number;
    /**
     * Только для target='anchor'. Минимально допустимое смещение в пикселях всплывающего окна от края его контейнера
     */
    fitContaiterOffset?: number;
    /**
     * Управление видимостью компонента
     */
    visible?: boolean;
    /**
     * Управление возможностью автозакрытия компонента
     */
    autoclosable?: boolean;
    /**
     * Управление выставлением модификатора для добавления внутренних отступов в стилях
     */
    padded?: boolean;
    /**
     * Элемент закреплённого заголовка для компонента
     */
    header?: ReactNode;
    /**
     * Размер компонента
     */
    size?: PopupSizeFieldType;
    /**
     * Тема компонента
     */
    theme?: PopupThemeFieldType;
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
     * Минимальная ширина попапа
     */
    minWidth?: number;
    /**
     * Максимальная ширина попапа
     */
    maxWidth?: number;
    /**
     * Указатель на родительский элемент
     */
    for?: string;
}



/**
 * Компонент popup'а.
 */

export default class Popup extends Component<PopupProps, any> {

    /**
     * Задает элемент, к которому будет привязан popup.
     */
    setTarget(target: any): any;
    /**
     * Задает положение popup.
     */
    setPosition(left: any, top: any): any;
    /**
     * Возвращает внутренний DOM узел.
     */
    getInnerNode(): any;
}
