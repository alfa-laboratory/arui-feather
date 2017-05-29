/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import Popup from '../popup/popup';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент сообщения.
 */
@cn('message')
@performance()
class Message extends React.Component {
    static propTypes = {
        /** Тип компонента */
        type: Type.oneOf(['text', 'popup']),
        /** Управление видимостью компонента */
        visible: Type.bool,
        /** Дочерние элементы `Message` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    static defaultProps = {
        type: 'text'
    };

    popup;
    popupTarget;

    componentDidMount() {
        if (this.popup && this.popupTarget) {
            this.popup.setTarget(this.popupTarget);
        }
    }

    render(cn) {
        return this.props.type === 'text'
            ? this.renderTextMessage(cn)
            : this.renderPopupMessage(cn);
    }

    renderTextMessage(cn) {
        return (
            <div
                className={ `${cn({
                    type: 'text',
                    showed: this.props.visible
                })} message__control` }
            >
                { this.props.children }
            </div>
        );
    }

    renderPopupMessage(cn) {
        return (
            <div>
                <div
                    className={ cn({ type: 'popup' }) }
                    ref={ (popupTarget) => { this.popupTarget = popupTarget; } }
                >
                    <Popup
                        className={ cn('control') }
                        ref={ (popup) => { this.popup = popup; } }
                        visible={ this.props.visible }
                    >
                        { this.props.children }
                    </Popup>
                </div>
            </div>
        );
    }
}

export default Message;
