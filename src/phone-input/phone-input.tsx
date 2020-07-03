/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

/* eslint-disable max-len */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import Input, { InputProps } from '../input/input';

export type PhoneInputProps = InputProps & {
    /**
     * Определяет маску для ввода значений.
     * <a href="https://github.com/insin/inputmask-core#pattern" target="_blank">Шаблон маски</a>
     */
    mask?: string;
    /**
     * Подсказка в текстовом поле
     */
    placeholder?: string;
};

type PhoneInputState = {
    updatedValue?: string;
}

/**
 * Компонент ввода телефона по маске.
 */
export class PhoneInput extends React.PureComponent<PhoneInputProps, PhoneInputState> {
    protected cn = createCn('phone-input');

    static defaultProps: Partial<PhoneInputProps> = {
        mask: '+1 111 111 11 11',
        placeholder: '+7 000 000 00 00',
    };

    state = {
        updatedValue: undefined,
    };

    root;

    render() {
        const { value } = this.props;
        const { updatedValue } = this.state;

        return (
            <Input
                { ...this.props }
                type="tel"
                ref={ (root) => {
                    this.root = root;
                } }
                formNoValidate={ true }
                className={ this.cn() }
                onChange={ this.handleChange }
                value={ updatedValue === undefined ? value : updatedValue }
            />
        );
    }

    /**
     * Промежуточный обработчик value после изменения значения.
     * В value проверяется, что первый числовой символ 7,
     * если 7, то ничего не делаем
     * если 8, то происходит замена на 7
     * иначе вставляем 7, а остальное сдвигаем
     */
    private handleChange = (value?: string, event?: React.ChangeEvent<any>) => {
        const { onChange } = this.props;
        let valueForOnChange = value;

        if (value?.length > 1 && !/^\+7.*$/.test(value)) {
            const [plus, code]: [string, string] = value;

            if (code === '8') {
                valueForOnChange = value.replace(/^\+(8)(.*)$/, '+7$2');
            } else {
                valueForOnChange = `${plus}7${PhoneInput.shiftValue(value.slice(1).replace(/\s/g, ''))}`;
            }
        } else if (value?.length === 1) {
            valueForOnChange = '';
        }
        if (onChange) {
            onChange(valueForOnChange, event);
        } else {
            this.setState({ updatedValue: valueForOnChange });
        }
    };

    static shiftValue(originalValue: string, mask = ' 111 111 11 11'): string {
        let shiftedValue = '';
        let specCounter = 0;

        mask.split('').forEach((sym, index) => {
            if (sym !== '1' && originalValue[index - specCounter]) {
                shiftedValue += sym;
                specCounter += 1;
            } else {
                shiftedValue += originalValue[index - specCounter] || '';
            }
        });

        return shiftedValue;
    }

    /**
     * Устанавливает фокус на поле ввода.
     */
    public focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     */
    public blur() {
        this.root.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     */
    public scrollTo() {
        this.root.scrollTo();
    }
}

export default withTheme<PhoneInputProps, PhoneInput>(PhoneInput);
