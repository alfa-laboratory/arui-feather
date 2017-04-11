/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

/**
 * Компонент позволяющий слушать изменения размера родительского элемента.
 * Для использования разместите его в элементе об изменении размера, которого
 * вы хотите знать и добавьте внешний обработчик `onResize`.
 *
 * Важно! Элемент, размер которого вы хотите измерять, должен обладать
 * css свойством `position: relative;`.
 */
class ResizeSensor extends React.Component {
    static propTypes = {
        /** Callback на изменение размера родителя */
        onResize: Type.func
    };

    /**
     * @type {HTMLIFrameElement}
     */
    iframe;

    componentDidMount() {
        this.iframe.contentWindow.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        this.iframe.contentWindow.removeEventListener('resize', this.handleResize);
    }

    render() {
        let iframeStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            zIndex: -1
        };

        return (
            <iframe
                ref={ (iframe) => { this.iframe = iframe; } }
                style={ iframeStyle }
                tabIndex='-1'
            />
        );
    }

    @autobind
    handleResize() {
        if (this.props.onResize) {
            this.props.onResize();
        }
    }
}

export default ResizeSensor;
