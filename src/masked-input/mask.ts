/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import InputMask from 'inputmask-core';

// Стандартный плейсхолдер буквы равный по ширине цифровому символу.
const PLACEHOLDER_CHAR = '\u2007';

// Стандартные formatCharacters из inputmask-core.
const DIGIT_RE = /^\d$/;
const LETTER_RE = /^[A-Za-z]$/;
const ALPHANNUMERIC_RE = /^[\dA-Za-z]$/;

type CharFormatter = {
    validate: (char: string) => boolean;
    transform?: (char: string) => string;
};

export type FormatCharacters = {
    [key: string]: CharFormatter;
};

const DEFAULT_FORMAT_CHARACTERS: FormatCharacters = {
    '*': {
        validate(char) {
            return ALPHANNUMERIC_RE.test(char);
        }
    },
    1: {
        validate(char) {
            return DIGIT_RE.test(char);
        }
    },
    a: {
        validate(char) {
            return LETTER_RE.test(char);
        }
    },
    A: {
        validate(char) {
            return LETTER_RE.test(char);
        },
        transform(char) {
            return char.toUpperCase();
        }
    },
    '#': {
        validate(char) {
            return ALPHANNUMERIC_RE.test(char);
        },
        transform(char) {
            return char.toUpperCase();
        }
    }
};

/**
 * Класс маски. Позволяет форматировать строку по заданной маске.
 *
 * @class
 * @param {String} mask Маска в формате: https://github.com/insin/inputmask-core
 * @param {FormatCharacters} [formatCharacters] Форматтеры маски в формате `inputmask-core`
 */
class Mask {
    /**
     * Длина маски.
     */
    length: number;

    /**
     * Индекс первого редактируемого символа.
     */
    firstEditableIndex: number;

    /**
     * Индекс последнего редактируемого символа.
     */
    lastEditableIndex: number;

    // TODO: install InputMask typings
    pattern: any;

    /**
     * Признак что пробелы удалять не надо
     */
    useWhitespaces: boolean;

    constructor(mask: string, formatCharacters?: FormatCharacters, useWhitespaces?: boolean) {
        this.pattern = new InputMask.Pattern(
            mask,
            { ...DEFAULT_FORMAT_CHARACTERS, ...formatCharacters },
            PLACEHOLDER_CHAR
        );

        this.length = this.pattern.length;
        this.firstEditableIndex = this.pattern.firstEditableIndex;
        this.lastEditableIndex = this.pattern.lastEditableIndex;
        this.useWhitespaces = useWhitespaces || false;
    }

    /**
     * Проверяет является ли символ в заданном индексе редактируемым.
     *
     * @param {Number} index Индекс символа.
     * @returns {Boolean}
     */
    isEditableIndex(index) {
        return this.pattern.isEditableIndex(index);
    }

    /**
     * Форматирует значение введенное в поле ввода по маске.
     *
     * @param {String} value Неформатированное значение из поля ввода.
     * @returns {String}
     */
    format(value) {
        let formattedValue = '';

        const cleanValue = this.useWhitespaces ? value : value.replace(/\s+/g, '');
        const cleanValueLength = cleanValue.length;
        let cleanValueIndex = 0;
        let cleanValueChar;

        let patternIndex = 0;
        let patternChar;
        const patternLength = this.pattern.length;

        while (patternIndex < patternLength && cleanValueIndex < cleanValueLength) {
            if (this.pattern.isEditableIndex(patternIndex)) {
                // eslint-disable-next-line no-cond-assign
                while ((cleanValueChar = cleanValue.charAt(cleanValueIndex)) !== '') {
                    if (this.pattern.isValidAtIndex(cleanValueChar, patternIndex)) {
                        formattedValue += this.pattern.transform(cleanValueChar, patternIndex);
                        patternIndex += 1;
                        cleanValueIndex += 1;
                        break;
                    } else {
                        cleanValueIndex += 1;
                    }
                }
            } else {
                patternChar = this.pattern.pattern[patternIndex];
                formattedValue += patternChar;
                patternIndex += 1;
                if (cleanValue.charAt(cleanValueIndex) === patternChar) {
                    cleanValueIndex += 1;
                }
            }
        }

        return formattedValue;
    }
}

export default Mask;
