/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import ReactDOM from 'react-dom';
import Type from 'prop-types';

import { HtmlElement } from '../lib/prop-types';

/**
 * Компонент, позволяющий визуализировать другие компоненты в произвольном контейнере.
 */
class RenderInContainer extends React.Component {
    static propTypes = {
        /** Дочерние элементы контейнера */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Дополнительный класс */
        className: Type.string,
        /** Контейнер, в котором будет визуализирован компонент */
        container: HtmlElement,
        /** Callback на рендер компонента */
        onRender: Type.func
    };

    componentDidMount() {
        // this.buildElements();
        // this.renderLayer();
    }

    componentDidUpdate() {
        if (this.container !== this.getContainer()) {
            this.buildElements();
        }
        this.renderLayer();
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this.element);
        this.container.removeChild(this.element);
    }

    render() {
        // eslint-disable-next-line max-len, no-console
        console.error('Component RenderInContainer is depricated. Use ReactDOM.createPortal instead. https://reactjs.org/docs/portals.html');

        return false;
    }

    renderLayer() {
        if (this.props.className) {
            this.element.className = this.props.className.toString();
        }

        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            this.props.children,
            this.element,
            this.handleRender
        );
    }

    @autobind
    handleRender() {
        if (this.props.onRender) {
            this.props.onRender();
        }
    }

    /**
     * Возвращает HTMLElement враппера компонента.
     *
     * @public
     * @returns {HTMLElement}
     */
    getNode() {
        return this.element;
    }

    /**
     * Возвращает HTMLElement контейнера, в который отрендерился компонент.
     *
     * @public
     * @returns {HTMLElement}
     */
    getContainer() {
        return this.props.container || document.body;
    }

    buildElements() {
        if (this.element && this.container) {
            ReactDOM.unmountComponentAtNode(this.element);
            this.container.removeChild(this.element);
        }

        this.container = this.getContainer();
        this.element = document.createElement('div');

        this.container.appendChild(this.element);
    }
}

export default RenderInContainer;
