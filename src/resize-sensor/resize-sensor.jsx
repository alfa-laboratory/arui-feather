/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import autobind from 'core-decorators/lib/autobind';
import React from 'react';
import Type from 'prop-types';

/**
 * Инстанцирует Resize Observer при наличии в браузере.
 *
 * @param {Function} onObserve Обработчик изменений в Resize Observer.
 * @returns {ResizeObserver|null}
 */
function getObserver(onObserve) {
    if (!global.ResizeObserver) return null;
    return new global.ResizeObserver(onObserve);
}

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

    /**
     * @type {ResizeObserver}
     */
    observer = getObserver(this.handleResize);

    componentDidMount() {
        if (this.root) {
            this.observer.observe(this.root);
        }

        if (this.iframe && this.iframe.contentWindow) {
            this.iframe.contentWindow.addEventListener('resize', this.handleResize);
        }
    }

    componentWillUnmount() {
        if (this.root) {
            this.observer.disconnect();
        }

        if (this.iframe && this.iframe.contentWindow) {
            this.iframe.contentWindow.removeEventListener('resize', this.handleResize);
        }
    }

    render() {
        let style = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
        };

        /* eslint-disable jsx-a11y/iframe-has-title */
        return (
            global.ResizeObserver ?
                <div
                    ref={ (root) => { this.root = root; } }
                    style={ style }
                />
                :
                <iframe
                    ref={ (iframe) => { this.iframe = iframe; } }
                    style={ {
                        ...style,
                        background: 'transparent',
                        border: 'none'
                    } }
                    tabIndex='-1'
                />
        );
        /* eslint-enable jsx-a11y/iframe-has-title */
    }

    @autobind
    handleResize() {
        if (this.props.onResize) {
            this.props.onResize();
        }
    }
}

export default ResizeSensor;
