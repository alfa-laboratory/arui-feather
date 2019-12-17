/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable max-len */

import React from 'react';
import Type from 'prop-types';

import Input from '../input/input';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

/**
 * Компонент ввода телефона по маске.
 *
 * @extends Input
 */
@cn('phone-input', Input)
class PhoneInput extends React.Component {
    cn = createCn('hoba');
    static propTypes = {
        ...Input.propTypes,
        /** Определяет маску для ввода значений. <a href="https://github.com/insin/inputmask-core#pattern" target="_blank">Шаблон маски</a> */
        mask: Type.string,
        /** Подсказка в текстовом поле */
        placeholder: Type.string
    };

    static defaultProps = {
        mask: '+1 111 111 11 11',
        placeholder: '+7 000 000 00 00'
    };

    root;

    render(Input) {
        return (
            <Input
                { ...this.props }
                type='tel'
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

export default withTheme(PhoneInput);
