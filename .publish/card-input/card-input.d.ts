
import { Component, ReactNode } from 'react';

export type CardInputTypeFieldType = 'number' | 'card' | 'email' | 'file' | 'hidden' | 'money' | 'password' | 'tel' | 'text';
export type CardInputWidthFieldType = 'default' | 'available';
export type CardInputMaskFormatCharactersFieldType = {
    validate: Function;
    transform?: Function
};
export type CardInputMaskFormatCharactersFieldType = {
    [key: string]: CardInputMaskFormatCharactersFieldType;
};
export type CardInputSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type CardInputThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type CardInputClassNameFieldType = Function | string;


export interface CardInputProps {

    /**
     * Тип поля.
Внимание, тип 'number' не умеет работать с масками, в том числе с 'selectionStart' и 'selectionEnd'.
Подробнее: http://w3c.github.io/html/sec-forms.html#does-not-apply
     */
    type?: CardInputTypeFieldType;
    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: CardInputWidthFieldType;
    /**
     * Управление автозаполнением компонента
     */
    autocomplete?: boolean;
    /**
     * Управление возможностью изменения атрибута компонента, установка соответствующего класса-модификатора для оформления
     */
    disabled?: boolean;
    /**
     * Управление возможностью изменения атрибута компонента (без установки класса-модификатора для оформления)
     */
    disabledAttr?: boolean;
    /**
     * Управление возможностью изменения класса-модификатора компонента
     */
    focused?: boolean;
    /**
     * Максимальное число символов
     */
    maxLength?: number;
    /**
     * Иконка компонента
     */
    icon?: ReactNode;
    /**
     * Управление наличием крестика, сбрасывающего значение 'value'
     */
    clear?: boolean;
    /**
     * Уникальный идентификатор блока
     */
    id?: string;
    /**
     * Уникальное имя блока
     */
    name?: string;
    /**
     * Содержимое поля ввода
     */
    value?: string;
    /**
     * Содержимое поля ввода, указанное по умолчанию
     */
    defaultValue?: string;
    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;
    /**
     * Определяет маску для ввода значений. [Шаблон маски](https://github.com/insin/inputmask-core#pattern)
     */
    mask?: string;
    /**
     * Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core`
     */
    maskFormatCharacters?: CardInputMaskFormatCharactersFieldType;
    /**
     * Стандартное ствойство HTMLInputElement 'pattern'. Может быть использовано для показа корректной клавиатуры на мобильных устройствах.
     */
    pattern?: string;
    /**
     * Управление встроенной проверкой данных введённых пользователем в поле на корректность
     */
    noValidate?: boolean;
    /**
     * Добавление дополнительных элементов к инпуту слева
     */
    leftAddons?: ReactNode;
    /**
     * Добавление дополнительных элементов к инпуту справа
     */
    rightAddons?: ReactNode;
    /**
     * Лейбл для поля
     */
    label?: ReactNode;
    /**
     * Подсказка в текстовом поле
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
    size?: CardInputSizeFieldType;
    /**
     * Тема компонента
     */
    theme?: CardInputThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: CardInputClassNameFieldType;
    /**
     * Тултип, который появляется при наведении
     */
    title?: string;
    /**
     * Обработчик изменения значения 'value'
     */
    onChange?: Function;
    /**
     * Обработчик фокуса поля
     */
    onFocus?: Function;
    /**
     * Обработчик клика по полю
     */
    onClick?: Function;
    /**
     * Обработчик снятия фокуса с поля
     */
    onBlur?: Function;
    /**
     * Обработчик клика по крестику сбрасываещему значение 'value'
     */
    onClearClick?: Function;
    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyDown?: Function;
    /**
     * Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyUp?: Function;
    /**
     * Обработчик события вставки текста в поле
     */
    onPaste?: Function;
    /**
     * Обработчик события касания по полю
     */
    onTouchStart?: Function;
    /**
     * Обработчик события прекращения касания по полю
     */
    onTouchEnd?: Function;
    /**
     * Обработчик события перемещения при касании по полю
     */
    onTouchMove?: Function;
    /**
     * Обработчик события прерывания касания по полю
     */
    onTouchCancel?: Function;
    /**
     * Обработчик, вызываемый перед началом ввода в маскированное поле
     */
    onProcessMaskInputEvent?: Function;
}



/**
 * Поле ввода номера карты с маской

@class
@extends Input
 */

export default class CardInput extends Component<CardInputProps, any> {

    /**
     * Устанавливает фокус на поле ввода.
     */
    focus(): any;
    /**
     * Убирает фокус с поля ввода.
     */
    blur(): any;
    /**
     * Скроллит страницу до поля ввода.
     */
    scrollTo(): any;
}
