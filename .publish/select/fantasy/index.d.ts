
import { Component, ReactNode } from 'react';

export type SelectClassNameFieldType = Function | string;
export type SelectModeFieldType = 'check' | 'radio' | 'radio-check';
export type SelectGroupViewFieldType = 'default' | 'line';
export type SelectWidthFieldType = 'default' | 'available';
export type SelectDirectionsFieldType = 'top-left' | 'top-center' | 'top-right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export type SelectValueFieldType = string | number;
export type SelectOptionstypeFieldType = 'item' | 'group';
export type SelectOptionsvalueFieldType = string | number;
export type SelectOptionsFieldType = {

    /**
     * Тип списка вариантов
     */
    type?: SelectOptionstypeFieldType;

    /**
     * Уникальное значение, которое будет отправлено на сервер, если вариант выбран
     */
    value?: SelectOptionsvalueFieldType;

    /**
     * Текст варианта
     */
    text?: ReactNode;

    /**
     * Текст варианта для нативного режима
     */
    nativeText?: string;

    /**
     * Отображение варианта
     */
    description?: ReactNode;

    /**
     * Текст, который будет отображаться при выборе
     */
    checkedText?: string;

    /**
     * Иконка варианта
     */
    icon?: ReactNode;

    /**
     * Список вариантов, только для type='group'
     */
    content?: Array<any>
};
export type SelectSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type SelectMobileMenuModeFieldType = 'native' | 'popup';
export type SelectThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface SelectProps {

    /**
     * Дополнительный класс
     */
    className?: SelectClassNameFieldType;
    /**
     * Тип выпадающего списка
     */
    mode?: SelectModeFieldType;
    /**
     * Размещение заголовка групп: обычное или в одну строку с первым элементом группы
     */
    groupView?: SelectGroupViewFieldType;
    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: SelectWidthFieldType;
    /**
     * Направления, в которые может открываться попап компонента
     */
    directions?: Array<SelectDirectionsFieldType>;
    /**
     * Управление возможностью редактирования значения
     */
    disabled?: boolean;
    /**
     * Управление видимостью выпадающего списка
     */
    opened?: boolean;
    /**
     * Ширинa выпадающего списка равна ширине кнопки
     */
    equalPopupWidth?: boolean;
    /**
     * Список выбранных значений
     */
    value?: Array<SelectValueFieldType>;
    /**
     * Список вариантов выбора
     */
    options?: Array<SelectOptionsFieldType>;
    /**
     * Размер компонента
     */
    size?: SelectSizeFieldType;
    /**
     * Уникальный идентификатор блока
     */
    id?: string;
    /**
     * Уникальное имя блока
     */
    name?: string;
    /**
     * Лейбл для поля
     */
    label?: ReactNode;
    /**
     * Подсказка в поле
     */
    placeholder?: string;
    /**
     * Подсказка под полем
     */
    hint?: ReactNode;
    /**
     * Отображение ошибки
     */
    error?: ReactNode;
    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMenuMode?: SelectMobileMenuModeFieldType;
    /**
     * Подсказка над меню в мобильном режиме
     */
    mobileTitle?: ReactNode;
    /**
     * Тема компонента
     */
    theme?: SelectThemeFieldType;
    /**
     * Обработчик фокуса на компоненте
     */
    onFocus?: Function;
    /**
     * Обработчик потери фокуса компонентом
     */
    onBlur?: Function;
    /**
     * Обработчик фокуса на кнопке
     */
    onButtonFocus?: Function;
    /**
     * Обработчик потери у кнопки
     */
    onButtonBlur?: Function;
    /**
     * Обработчик фокуса на меню
     */
    onMenuFocus?: Function;
    /**
     * Обработчик потери фокуса у меню
     */
    onMenuBlur?: Function;
    /**
     * Обработчик клика по кнопке компонента
     */
    onClick?: Function;
    /**
     * Обработчик клика вне компонента
     */
    onClickOutside?: Function;
    /**
     * Обработчик изменения значения
     */
    onChange?: Function;
    /**
     * Обработчик нажатия на клавишу
     */
    onKeyDown?: Function;
    /**
     * Кастомный метод рендера содержимого кнопки, принимает на вход: массив элементов типа [CheckedOption](#CheckedOption)
     */
    renderButtonContent?: Function;
}



/**
 * Компонент выпадающего списка.
 */

export default class Select extends Component<SelectProps, any> {

    /**
     * Устанавливает фокус на компонент.
     */
    focus(): any;
    /**
     * Убирает фокус с компонента.
     */
    blur(): any;
    /**
     * Скроллит страницу до компонента.
     */
    scrollTo(): any;
}
