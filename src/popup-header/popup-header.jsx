/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import IconClose from '../icon/ui/close';
import IconButton from '../icon-button/themed';

import cn from '../cn';
import performance from '../performance';

/**
 * Заголовок в Popup.
 */
@cn('popup-header')
@performance()
class PopupHeader extends React.Component {
    static propTypes = {
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Содержимое заголовка */
        title: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /**
         * Обработчик клика по кнопке закрытия
         * @param {React.MouseEvent} event
         */
        onCloserClick: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    render(cn) {
        return (
            <div
                className={ cn({
                    size: this.props.size
                }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                <IconButton
                    className={ cn('closer') }
                    size={ this.props.size }
                    onClick={ this.handleCloserClick }
                >
                    <IconClose
                        size={ this.props.size }
                    />
                </IconButton>
                <div className={ cn('title') }>
                    { this.props.title }
                </div>
            </div>
        );
    }

    handleCloserClick = (event) => {
        if (this.props.onCloserClick) {
            this.props.onCloserClick(event);
        }
    }
}

export default PopupHeader;
