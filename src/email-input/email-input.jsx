/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

import Input from '../input/input';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент поля ввода почты
 * @extends Input
 */
@cn('email-input', Input)
@performance()
class EmailInput extends React.Component {
    /**
     * @type {Input}
     */
    root;

    render(cn, Input) {
        return (
            <Input
                { ...this.props }
                type='email'
                ref={ (root) => { this.root = root; } }
                noValidate={ true }
                className={ cn }
            />
        );
    }

    /**
     * Устанавливает фокус на поле ввода.
     *
     * @public
     */
    focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     *
     * @public
     */
    blur() {
        this.root.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     *
     * @public
     */
    scrollTo() {
        this.root.scrollTo();
    }
}

export default EmailInput;
