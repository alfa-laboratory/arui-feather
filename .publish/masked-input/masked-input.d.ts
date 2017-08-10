
import { Component, ReactNode } from 'react';

export type MaskedInputFormatCharactersFieldType = {
    validate: Function;
    transform?: Function
};
export type MaskedInputFormatCharactersFieldType = {
    [key: string]: MaskedInputFormatCharactersFieldType;
};


export interface MaskedInputProps {

    /**
     * Маска для поля ввода, использует формат https://github.com/insin/inputmask-core
     */
    mask: string;
    /**
     * Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core`
     */
    formatCharacters?: MaskedInputFormatCharactersFieldType;
    /**
     * Максимальное число символов
     */
    maxLength?: number;
    /**
     * Обработчик, вызываемый перед началом ввода в поле
     */
    onProcessInputEvent?: Function;
}



/**
 * Компонент поля ввода с поддержкой масок.
Расширяет стандратный <input /> React-а.
 */

export default class MaskedInput extends Component<MaskedInputProps, any> {

    /**
     * Устанавливает фокус на поле ввода.
     */
    focus(): any;
    /**
     * Снимает фокус с поля ввода.
     */
    blur(): any;
    /**
     * Возвращает ссылку на HTMLElement инпута.
     */
    getControl(): any;
    /**
     * Синхронно обновляет маску на поле ввода.
     */
    setMask(newMask: any, formatCharacters: any): any;
}
