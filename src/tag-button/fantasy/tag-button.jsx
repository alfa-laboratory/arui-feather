/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

import Button from '../../button/button';

import cn from '../../cn';
import performance from '../../performance';

/**
 * Компонент тэг.
 *
 * @extends Button
 */
@cn('tag-button', Button)
@performance()
class TagButton extends React.Component {
    static propTypes = {
        ...Button.propTypes
    };

    root;

    render(cn, Button) {
        return (
            <Button
                { ...this.props }
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

export default TagButton;
