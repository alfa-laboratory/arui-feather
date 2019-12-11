/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/prop-types: 0 */

import React from 'react';
import Type from 'prop-types';

import Mask from './mask';

// В эту проверку попадают IE9 и IE10, которые не могут корректно работать с кареткой на событии `input`.
const IS_IE9_10 = typeof window !== 'undefined' && !!window.ActiveXObject;

const IS_ANDROID = typeof window !== 'undefined' && /(android)/i.test(window.navigator.userAgent);

/**
 * Возвращает версию андроида в формате "4.2.1" или false, если не аднроид.
 *
 * @returns {String|false}
 */
export function getAndroidVersion() {
    if (!/android/.test(navigator.userAgent.toLowerCase())) {
        return false;
    }

    const userAgent = navigator.userAgent.toLowerCase();
    const match = userAgent.match(/android\s([\d.]*)/);

    return match ? match[1] : false;
}

// Для IE11 вместо `onChange`, используем событие `onInput`, для правильной работы copy/paste
// Issue на ошибку в React: https://github.com/facebook/react/issues/7211
// Детектим IE11: `Object.hasOwnProperty.call(window, 'ActiveXObject') && !window.ActiveXObject;`
const IS_IE11 = typeof window !== 'undefined' && Object.hasOwnProperty.call(window, 'ActiveXObject') && !window.ActiveXObject;

// Типы операции, которые пользователь может производить с текстовым полем.
const operationType = {
    ADD: 0,
    DELETE: 1,
    REPLACE: 2
};

/**
 * Возвращает количество не редактируемых символов в строке, в соответствии с указанной маской.
 *
 * @param {String} str Анализируемая строка
 * @param {Mask} mask Маска
 * @returns {Number}
 */
const getSeparatorsAmount = (str, mask) => (
    str.split('').reduce((amount, char, index) => {
        if (mask.isEditableIndex(index)) {
            return amount;
        }

        return amount + 1;
    }, 0)
);

/**
 * Компонент поля ввода с поддержкой масок.
 * Расширяет стандартный <input /> React-а.
 */
class MaskedInput extends React.Component {
    static propTypes = {
        /** Маска для поля ввода, использует формат https://github.com/insin/inputmask-core */
        mask: Type.string.isRequired,
        /** Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core` */
        formatCharacters: Type.objectOf(
            Type.shape({
                validate: Type.func.isRequired,
                transform: Type.func
            })
        ),
        /** Максимальное число символов */
        maxLength: Type.number,
        /**
         * Обработчик, вызываемый перед началом ввода в поле
         * @param {React.ChangeEvent} event
         */
        onProcessInputEvent: Type.func,
        /** Признак что пробелы удалять не надо */
        useWhitespaces: Type.bool,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    /**
     * @type {HTMLInputElement}
     */
    input;

    /**
     * @type {String}
     */
    maskPattern;

    /**
     * @type {Mask}
     */
    mask;

    /**
     * @type {Mask}
     */
    beforeChangeMask;

    /**
     * @type {FormatCharacters}
     */
    formatCharacters;

    /**
     * @type {String}
     */
    value = '';

    /**
     * @type {Number}
     */
    caretFixTimeout;

    /**
     * @type {{ start: Number, end: Number }}
     */
    beforeInputSelection = { start: 0, end: 0 };

    componentWillMount() {
        this.setMask(this.props.mask, this.props.formatCharacters, this.props.useWhitespaces);
        this.beforeChangeMask = this.mask;
        this.value = this.mask.format(this.props.value || '');
    }

    componentWillReceiveProps(nextProps) {
        let reformatValue = false;

        this.beforeChangeMask = this.mask;

        if (this.props.mask !== nextProps.mask || this.props.formatCharacters !== nextProps.formatCharacters) {
            this.setMask(nextProps.mask, nextProps.formatCharacters);
            reformatValue = true;
        }

        if (reformatValue || this.props.value !== nextProps.value) {
            this.value = this.mask.format(nextProps.value || '');
        }
    }

    componentWillUnmount() {
        if (this.caretFixTimeout) {
            clearTimeout(this.caretFixTimeout);
            this.caretFixTimeout = null;
        }
    }

    render() {
        const props = { ...this.props };
        const length = props.maxLength === undefined ? this.mask.length : props.maxLength;

        delete props.mask;
        delete props.formatCharacters;
        delete props.onProcessInputEvent;
        delete props.useWhitespaces;

        return (
            <input
                { ...props }
                ref={ (ref) => {
                    this.input = ref;
                } }
                maxLength={ length }
                value={ this.value }
                onBeforeInput={ this.handleBeforeInput }
                onInput={ this.handleInput }
                onChange={ this.handleChange }
            />
        );
    }

    handleBeforeInput = (event) => {
        this.beforeInputSelection = {
            start: this.input.selectionStart,
            end: this.input.selectionEnd
        };

        if (this.props.onBeforeInput) {
            this.props.onBeforeInput(event);
        }
    };

    /**
     * Обрабатывает событие «input».
     *
     * @param {React.ChangeEvent<HTMLInput>} event The Event object
     */
    handleInput = (event) => {
        const processedEvent = IS_IE9_10 ? event : this.processInputEvent(event);

        if (this.props.onInput) {
            this.props.onInput(processedEvent);
        }

        if (IS_IE11) {
            if (this.props.onChange) {
                this.props.onChange(processedEvent);
            }
        }
    };

    /**
     * Обрабатывает событие «change».
     *
     * @param {React.ChangeEvent<HTMLInput>} event The Event object
     */
    handleChange = (event) => {
        if (IS_IE11 || !this.props.onChange) {
            return;
        }

        const processedInput = IS_IE9_10 ? this.processInputEvent(event) : event;

        if (this.props.onChange) {
            this.props.onChange(processedInput);
        }
    };

    /**
     * Устанавливает фокус на поле ввода.
     *
     * @public
     */
    focus() {
        this.input.focus();
    }

    /**
     * Снимает фокус с поля ввода.
     *
     * @public
     */
    blur() {
        this.input.blur();
    }

    /**
     * Возвращает ссылку на HTMLElement инпута.
     *
     * @public
     * @returns {HTMLInputElement}
     */
    getControl() {
        return this.input;
    }

    /**
     * Синхронно обновляет маску на поле ввода.
     *
     * @public
     * @param {String} newMask Новая маска
     * @param {FormatCharacters} [formatCharacters] Форматтер маски
     * @param {Boolean} useWhitespaces использовать в маске пробелы
     */
    setMask(newMask, formatCharacters, useWhitespaces) {
        if (this.maskPattern !== newMask || this.formatCharacters !== formatCharacters) {
            this.mask = new Mask(newMask, formatCharacters, useWhitespaces);
            this.maskPattern = newMask;
            this.formatCharacters = formatCharacters;
        }
    }

    processInputEvent(event) {
        if (this.props.onProcessInputEvent) {
            this.props.onProcessInputEvent(event);
        }

        const prevSelection = this.input.selectionStart;
        const newValue = event.target.value;

        const currentValue = this.value;
        const formattedValue = this.mask.format(newValue);

        this.value = formattedValue;
        event.target.value = formattedValue;

        // Если изменение поля ввода произошло не в конце ввода,
        // то необходимо починить стандартное поведение Реакта и
        // вернуть каретку к последнему изменению.
        if (prevSelection <= currentValue.length) {
            let newSelection = prevSelection;

            // Определяем тип операции, который был произведен над текстовым полем.
            let opType = newValue.length >= currentValue.length ? operationType.ADD : operationType.DELETE;

            // На пользовательском инпуте было выделение перед операцией,
            // значит могла быть операция или удаления или замены.
            const beforeInputSelectionLength = this.beforeInputSelection.end - this.beforeInputSelection.start;

            if (beforeInputSelectionLength >= 1) {
                if (newValue.length !== currentValue.length - beforeInputSelectionLength) {
                    opType = operationType.REPLACE;
                }
            }

            const beforeChangeSeparatorsAmount = getSeparatorsAmount(
                currentValue.slice(0, prevSelection),
                this.beforeChangeMask);

            const afterChangeSeparatorsAmount = getSeparatorsAmount(
                formattedValue.slice(0, newSelection),
                this.mask);

            // Двигаем каретку вправо, если слева от каретки добавились не редактируемые символы
            const shouldShiftCaret = beforeChangeSeparatorsAmount < afterChangeSeparatorsAmount &&
                (opType === operationType.ADD || opType === operationType.REPLACE) &&
                this.beforeChangeMask.isEditableIndex(this.beforeInputSelection.start) &&
                this.mask.isEditableIndex(newSelection);

            // Двигаем каретку влево, если слева от каретки добавились не редактируемые символы
            const shouldUnshiftCaret = beforeChangeSeparatorsAmount > afterChangeSeparatorsAmount &&
                opType === operationType.DELETE &&
                (this.mask.isEditableIndex(newSelection - 1) && newSelection > 0);

            if (shouldUnshiftCaret || shouldShiftCaret) {
                newSelection += (afterChangeSeparatorsAmount - beforeChangeSeparatorsAmount);
            }

            // Для операции добавления и замены, если мы стояли на нередактируемом символе,
            // то добавляем сдвиг до ближайшего редактируемого.
            if (opType === operationType.ADD || opType === operationType.REPLACE) {
                let index = this.beforeInputSelection.start;

                while (!this.beforeChangeMask.isEditableIndex(index) && index < formattedValue.length) {
                    index += 1;
                }
                newSelection += index - this.beforeInputSelection.start;
            }

            // Если вдруг попали на нередактируемый символ маски,
            // то подвигаем курсом до ближайшего редактируемого.
            if (opType === operationType.ADD || opType === operationType.REPLACE) {
                while (!this.mask.isEditableIndex(newSelection) && newSelection < formattedValue.length) {
                    newSelection += 1;
                }
            } else if (opType === operationType.DELETE) {
                while (!this.mask.isEditableIndex(newSelection - 1) && newSelection > 0) {
                    newSelection -= 1;
                }
            }

            // Положение каретки с учетом первого и последнего редактируемого символа маски.
            const clampedSection = this.clampSelection(newSelection);

            // Фикс бага смещения каретки в браузере на андроидах Jelly Bean (c 4.1 по 4.3)
            const offsetSection = opType === operationType.ADD &&
                IS_ANDROID && parseFloat(getAndroidVersion(), 10) < 4.4 ? 1 : 0;

            this.setInputSelection(clampedSection + offsetSection);
        } else if (IS_ANDROID) {
            // Если изменение поля произошло в конце ввода.
            // Android chrome имеет дефект с автоматической установкой каретки
            // при использовании клавиатуры отличной от type="text".
            this.setInputSelectionByTimeout(event.target.selectionStart);
        }

        return event;
    }

    /**
     * Возвращает положение каретки с учетом первого и последнего редактируемого символа маски.
     *
     * @param {Number} selection Положение каретки
     * @returns {Number}
     */
    clampSelection(selection) {
        if (selection < this.mask.firstEditableIndex) {
            return this.mask.firstEditableIndex;
        }

        // +1 разрешает каретке становится в конец поля ввода при необходимости.
        if (selection > this.mask.lastEditableIndex + 1) {
            return this.mask.lastEditableIndex + 1;
        }

        return selection;
    }

    /**
     * Устанавливает каретку поля ввода в новую позицию.
     *
     * @param {Number} selection Новое положение каретки
     */
    setInputSelection(selection) {
        this.input.selectionStart = selection;
        this.input.selectionEnd = selection;

        // IE10 не умеет синхронно в событие `change` переставлять каретку.
        // Android chrome имеет дефект с автоматической установкой каретки
        // при использовании клавиатуры отличной от type="text".
        if (IS_IE9_10 || IS_ANDROID) {
            this.setInputSelectionByTimeout(selection);
        }
    }

    /**
     * Устанавливает каретку поля ввода в заданную позицию асинхронно.
     *
     * Во-избежание дефекта с установкой каретки, наблюдаемом в мобильных браузерах, а так же
     * браузерах IE9-10, установка происходит асинхронно, с минимальной задержкой,
     * с помощью [setTimeout] обертки.
     *
     * @param {Number} selection Положение каретки
     */
    setInputSelectionByTimeout(selection) {
        if (this.caretFixTimeout) {
            clearTimeout(this.caretFixTimeout);
            this.caretFixTimeout = null;
        }

        this.caretFixTimeout = setTimeout(() => {
            this.caretFixTimeout = null;
            this.input.selectionStart = selection;
            this.input.selectionEnd = selection;
        }, 0);
    }
}

export default MaskedInput;
