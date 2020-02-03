/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import { Input, InputProps } from '../input/input';

export type CardInputProps = InputProps & {
    /** Подсказка в текстовом поле */
    placeholder?: string;
};

/**
 * Поле ввода номера карты с маской.
 */
export class CardInput extends React.PureComponent<CardInputProps> {
    cn = createCn('card-input');

    static defaultProps: Partial<CardInputProps> = {
        placeholder: '0000 0000 0000 0000 00'
    };

    /**
     * @type {Input}
     */
    root;

    render() {
        return (
            <Input
                { ...this.props }
                type='tel'
                ref={ (root) => {
                    this.root = root;
                } }
                mask='1111 1111 1111 1111 11'
                formNoValidate={ true }
                className={ this.cn() }
            />
        );
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

export default withTheme(CardInput);
