/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import Input, { InputProps } from '../input/input';

/**
 * Компонент поля ввода почты.
 * @extends Input
 */
export class EmailInput extends React.PureComponent<InputProps> {
    cn = createCn('email-input');

    /**
     * @type {Input}
     */
    root;

    render() {
        return (
            <Input
                { ...this.props }
                type='email'
                ref={ (root) => {
                    this.root = root;
                } }
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

export default withTheme(EmailInput);
