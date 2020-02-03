/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

export type ResizeSensorProps = {
    /**
     * Callback на изменение размера родителя
     */
    onResize?: Function;

};

/**
 * Компонент позволяющий слушать изменения размера родительского элемента.
 * Для использования разместите его в элементе об изменении размера, которого
 * вы хотите знать и добавьте внешний обработчик `onResize`.
 *
 * Важно! Элемент, размер которого вы хотите измерять, должен обладать
 * css свойством `position: relative;`.
 */
export class ResizeSensor extends React.Component<ResizeSensorProps> {
    iframe: HTMLIFrameElement;

    componentDidMount() {
        if (this.iframe.contentWindow) {
            this.iframe.contentWindow.addEventListener('resize', this.handleResize);
        }
    }

    componentWillUnmount() {
        if (this.iframe.contentWindow) {
            this.iframe.contentWindow.removeEventListener('resize', this.handleResize);
        }
    }

    render() {
        const iframeStyle = {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'none',
            zIndex: -1
        };

        /* eslint-disable jsx-a11y/iframe-has-title */
        return (
            <iframe
                ref={ (iframe) => {
                    this.iframe = iframe;
                } }
                style={ iframeStyle }
                tabIndex={ -1 }
            />
        );
        /* eslint-enable jsx-a11y/iframe-has-title */
    }

    private handleResize = () => {
        if (this.props.onResize) {
            this.props.onResize();
        }
    }
}

export default ResizeSensor;
