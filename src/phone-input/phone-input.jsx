/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import Input from '../input/input';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент ввода телефона по маске.
 *
 * @extends Input
 */
@cn('phone-input', Input)
@performance()
class PhoneInput extends React.Component {
    static propTypes = {
        /** Подсказка в текстовом поле */
        placeholder: Type.string
    };

    static defaultProps = {
        placeholder: '+7 000 000 00 00'
    };

    root;

    render(cn, Input) {
        return (
            <Input
                { ...this.props }
                type='tel'
                ref={ (root) => { this.root = root; } }
                mask='+1 111 111 11 11'
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

export default PhoneInput;
