/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import Input from '../input/input';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент поля ввода номера карты по маске
 *
 * @class
 * @extends Input
 */
@cn('card-input', Input)
@performance()
class CardInput extends React.Component {
    static propTypes = {
        ...Input.propTypes,
        /** Подсказка в текстовом поле */
        placeholder: Type.string
    };

    static defaultProps = {
        placeholder: '0000 0000 0000 0000 00'
    };

    /**
     * @type {Input}
     */
    root;

    render(cn, Input) {
        return (
            <Input
                { ...this.props }
                type='tel'
                ref={ (root) => { this.root = root; } }
                mask='1111 1111 1111 1111 11'
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

export default CardInput;
