/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

import Button from '../../button/button';

import cn from '../../cn';
import performance from '../../performance';

/**
 * Компонент сабмит кнопки для встраивания в поля ввода.
 *
 * @extends Button
 */
@cn('inline-submit-button', Button)
@performance()
class InlineSubmitButton extends React.Component {
    static propTypes = {
        ...Button.propTypes
    };

    root;

    render(cn, Button) {
        return (
            <Button
                { ...this.props }
                className={ cn }
            />
        );
    }

    /**
     * Устанавливает фокус на компонент.
     *
     * @public
     */
    focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с компонента.
     *
     * @public
     */
    blur() {
        this.root.blur();
    }

    /**
     * Скроллит страницу до компонента.
     *
     * @public
     */
    scrollTo() {
        this.root.scrollTo();
    }
}

export default InlineSubmitButton;
