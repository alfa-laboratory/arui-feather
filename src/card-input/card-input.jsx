/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';

import Input from '../input/input';

/**
 * Поле ввода номера карты с маской.
 *
 * @class
 * @extends Input
 */
class CardInput extends React.PureComponent {
    cn = createCn('card-input');
    static propTypes = {
        ...Input.propTypes,
        /** Подсказка в текстовом поле */
        placeholder: Type.string,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
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
