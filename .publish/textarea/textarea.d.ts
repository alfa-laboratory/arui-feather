
import { Component, ReactNode } from 'react';

export type TextareaClassNameFieldType = Function | string;
export type TextareaWidthFieldType = 'default' | 'available';
export type TextareaSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type TextareaResizeFieldType = 'both' | 'horizontal' | 'vertical' | 'none';
export type TextareaThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface TextareaProps {

    /**
     * Дополнительный класс
     */
    className?: TextareaClassNameFieldType;
    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: TextareaWidthFieldType;
    /**
     * Управление автозаполнением компонента
     */
    autocomplete?: boolean;
    /**
     * Управление возможностью изменения значения компонента
     */
    disabled?: boolean;
    /**
     * Управление возможностью подстраивать высоту компонента под высоту текста
     */
    autosize?: boolean;
    /**
     * Максимальное число символов
     */
    maxLength?: number;
    /**
     * Уникальный идентификатор блока
     */
    id?: string;
    /**
     * Уникальное имя блока
     */
    name?: string;
    /**
     * Содержимое поля ввода, указанное по умолчанию (используйте это поле если хотите использовать компонент как uncontrolled)
     */
    defaultValue?: string;
    /**
     * Содержимое поля ввода
     */
    value?: string;
    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;
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
     * Размер компонента
     */
    size?: TextareaSizeFieldType;
    /**
     * Управление возможностью изменения размеров компонента
     */
    resize?: TextareaResizeFieldType;
    /**
     * Тема компонента
     */
    theme?: TextareaThemeFieldType;
    /**
     * Обработчик изменения значения 'value'
     */
    onChange?: Function;
    /**
     * Обработчик фокуса поля
     */
    onFocus?: Function;
    /**
     * Обработчик снятия фокуса c поля
     */
    onBlur?: Function;
    /**
     * Обработчик события вставки текста в поле
     */
    onPaste?: Function;
    /**
     * Обработчик события изменения высоты компонента со значением параметра "autosize" = true
     */
    onHeightChange?: Function;
}



/**
 * Компонент многострочного текстового ввода.
 */

export default class Textarea extends Component<TextareaProps, any> {

    /**
     * Устанавливает фокус на поле ввода.
     */
    focus(): any;
    /**
     * Снимает фокус с поля ввода.
     */
    blur(): any;
    /**
     * Скроллит страницу до поля ввода.
     */
    scrollTo(): any;
}
