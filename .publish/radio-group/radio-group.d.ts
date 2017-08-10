
import { Component, ReactNode } from 'react';

export type RadioGroupTypeFieldType = 'normal' | 'button' | 'line';
export type RadioGroupWidthFieldType = 'default' | 'available';
export type RadioGroupChildrenFieldType = Array<ReactNode> | ReactNode;
export type RadioGroupThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type RadioGroupClassNameFieldType = Function | string;


export interface RadioGroupProps {

    /**
     * Тип группы кнопок
     */
    type?: RadioGroupTypeFieldType;
    /**
     * Значение выбранной радио-кнопки
     */
    value?: string;
    /**
     * Отображение попапа с ошибкой в момент когда фокус находится на компоненте
     */
    error?: ReactNode;
    /**
     * Управление шириной группы кнопок для типа 'button'. При значении 'available' растягивает группу на ширину родителя
     */
    width?: RadioGroupWidthFieldType;
    /**
     * Уникальное имя блока
     */
    name?: string;
    /**
     * Управление возможностью изменения состояния 'checked' дочерних компонентов `Radio`
     */
    disabled?: boolean;
    /**
     * Дочерние элементы `RadioGroup`, как правило, компоненты `Radio`
     */
    children?: RadioGroupChildrenFieldType;
    /**
     * Тема компонента
     */
    theme?: RadioGroupThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: RadioGroupClassNameFieldType;
    /**
     * Лейбл для группы
     */
    label?: ReactNode;
    /**
     * Обработчик фокуса радиогруппы
     */
    onFocus?: Function;
    /**
     * Обработчик снятия фокуса с радиогруппы
     */
    onBlur?: Function;
    /**
     * Обработчик изменения значения 'checked' одного из дочерних радио-кнопок
     */
    onChange?: Function;
}



/**
 * Компонент группы радио-кнопок.
 */

export default class RadioGroup extends Component<RadioGroupProps, any> {

    /**
     * Устанавливает фокус на первую радиокнопку в группе.
     */
    focus(): any;
    /**
     * Убирает фокус с группы радио-кнопок.
     */
    blur(): any;
}
