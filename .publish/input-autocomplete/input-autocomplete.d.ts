
import { Component, ReactNode } from 'react';

export type InputAutocompleteTypeFieldType = 'number' | 'card' | 'email' | 'file' | 'hidden' | 'money' | 'password' | 'tel' | 'text';
export type InputAutocompleteWidthFieldType = 'default' | 'available';
export type InputAutocompleteMaskFormatCharactersFieldType = {
    validate: Function;
    transform?: Function
};
export type InputAutocompleteMaskFormatCharactersFieldType = {
    [key: string]: InputAutocompleteMaskFormatCharactersFieldType;
};
export type InputAutocompleteSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type InputAutocompleteThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type InputAutocompleteClassNameFieldType = Function | string;
export type InputAutocompleteOptionstypeFieldType = 'item' | 'group';
export type InputAutocompleteOptionsFieldType = {

    /**
     * Тип списка вариантов
     */
    type?: InputAutocompleteOptionstypeFieldType;

    /**
     * Уникальное значение, которое будет отправлено на сервер, если вариант выбран
     */
    value?: string;

    /**
     * Отображение варианта
     */
    description?: ReactNode;

    /**
     * Текст, который должен быть записан в текстовое поле при выборе варианта
     */
    text?: string;

    /**
     * Список вариантов, только для type='group'
     */
    content?: Array<any>
};
export type InputAutocompleteDirectionsFieldType = 'top-left' | 'top-center' | 'top-right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right';


export interface InputAutocompleteProps {

    /**
     * Тип поля.
Внимание, тип 'number' не умеет работать с масками, в том числе с 'selectionStart' и 'selectionEnd'.
Подробнее: http://w3c.github.io/html/sec-forms.html#does-not-apply
     */
    type?: InputAutocompleteTypeFieldType;
    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: InputAutocompleteWidthFieldType;
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
    maskFormatCharacters?: InputAutocompleteMaskFormatCharactersFieldType;
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
    size?: InputAutocompleteSizeFieldType;
    /**
     * Тема компонента
     */
    theme?: InputAutocompleteThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: InputAutocompleteClassNameFieldType;
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
    /**
     * Список вариантов выбора
     */
    options?: Array<InputAutocompleteOptionsFieldType>;
    /**
     * Управление видимостью выпадающего списка
     */
    opened?: boolean;
    /**
     * Ширинa выпадающего списка равна ширине инпута
     */
    equalPopupWidth?: boolean;
    /**
     * Определяет нужно или нет обновлять значение текстового поля при выборе варианта
     */
    updateValueOnItemSelect?: boolean;
    /**
     * Направления, в которые может открываться попап компонента
     */
    directions?: Array<InputAutocompleteDirectionsFieldType>;
    /**
     * Обработчик выбора пункта в выпадающем меню
     */
    onItemSelect?: Function;
}



/**
 * Компонент поля для ввода с автокомплитом.

@extends Input
 */

export default class InputAutocomplete extends Component<InputAutocompleteProps, any> {

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
