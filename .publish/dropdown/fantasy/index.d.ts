
import { Component, ReactNode } from 'react';

export type DropdownSwitcherTypeFieldType = 'link' | 'button';
export type DropdownPopupPropsclassNameFieldType = Function | string;
export type DropdownPopupPropstypeFieldType = 'default' | 'tooltip';
export type DropdownPopupPropsheightFieldType = 'default' | 'available' | 'adaptive';
export type DropdownPopupPropsdirectionsFieldType = 'anchor' | 'top-left' | 'top-center' | 'top-right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type DropdownPopupPropstargetFieldType = 'anchor' | 'position';
export type DropdownPopupPropssizeFieldType = 's' | 'm' | 'l' | 'xl';
export type DropdownPopupPropsthemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type DropdownPopupPropsFieldType = {
    className?: DropdownPopupPropsclassNameFieldType;
    type?: DropdownPopupPropstypeFieldType;
    height?: DropdownPopupPropsheightFieldType;
    directions?: Array<DropdownPopupPropsdirectionsFieldType>;
    target?: DropdownPopupPropstargetFieldType;
    mainOffset?: number;
    secondaryOffset?: number;
    fitContaiterOffset?: number;
    invalid?: boolean;
    visible?: boolean;
    autoclosable?: boolean;
    padded?: boolean;
    size?: DropdownPopupPropssizeFieldType;
    theme?: DropdownPopupPropsthemeFieldType;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
    onClickOutside?: Function;
    minWidth?: number;
    maxWidth?: number
};
export type DropdownModeFieldType = 'hover' | 'normal';
export type DropdownTogglableFieldType = 'button' | 'check';
export type DropdownSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type DropdownChildrenFieldType = Array<ReactNode> | ReactNode;
export type DropdownThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type DropdownClassNameFieldType = Function | string;


export interface DropdownProps {

    /**
     * Тип компонента
     */
    switcherType?: DropdownSwitcherTypeFieldType;
    /**
     * Текст кнопки компонента
     */
    switcherText?: ReactNode;
    /**
     * Компонент [Popup](../popup/)
     */
    popupContent?: ReactNode;
    /**
     * Свойства для компонента [Popup](../popup/)
     */
    popupProps?: DropdownPopupPropsFieldType;
    /**
     * Управление возможностью отображать попап при наведении курсора
     */
    mode?: DropdownModeFieldType;
    /**
     * Управление возможностью открытия попапа
     */
    disabled?: boolean;
    /**
     * Управление состоянием открыт/закрыт попапа
     */
    opened?: boolean;
    /**
     * Только для switcherType='button'. Тип переключателя для кнопки, 'check'
     */
    togglable?: DropdownTogglableFieldType;
    /**
     * Размер компонента
     */
    size?: DropdownSizeFieldType;
    /**
     * Дочерние элементы `Dropdown`
     */
    children?: DropdownChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: DropdownThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: DropdownClassNameFieldType;
    /**
     * Обработчик клика по кнопке компонента
     */
    onSwitcherClick?: Function;
    /**
     * Обработчик события наведения курсора на кнопку компонента
     */
    onSwitcherMouseEnter?: Function;
    /**
     * Обработчик события снятия курсора с кнопки компонента
     */
    onSwitcherMouseLeave?: Function;
    /**
     * Обработчик события наведения курсора на попап
     */
    onPopupMouseEnter?: Function;
    /**
     * Обработчик события снятия курсора с попапа
     */
    onPopupMouseLeave?: Function;
    /**
     * Обработчик события клика попапа за пределами попапа
     */
    onPopupClickOutside?: Function;
}



/**
 * Компонент «выпадашка»: ссылка или кнопка. По клику показывается Popup.
 */

export default class Dropdown extends Component<DropdownProps, any> {

}
