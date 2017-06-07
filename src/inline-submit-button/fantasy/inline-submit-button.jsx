/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Button from '../../button/button';

import cn from '../../cn';
import performance from '../../performance';

/**
 * Компонент сабмит кнопки для встраивания в поля ввода.
 *
 * @extends Button
 */
@cn('inline-submit-button')
@performance()
class InlineSubmitButton extends Button {
    static propTypes = {
        ...Button.propTypes
    };

    root;

    render(cn) {
        return (
            <Button
                { ...this.props }
                className={ cn }
            />
        );
    }
}

export default InlineSubmitButton;
