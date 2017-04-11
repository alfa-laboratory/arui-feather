/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import styleType from 'react-style-proptype';
import Type from 'prop-types';

import IsolatedContainer from '../isolated-container/isolated-container';

import cn from '../cn';
import { HtmlElement } from '../lib/prop-types';

import './popup-container.css';

/**
 * Становится родительским элементом для всех дочерних блоков `Popup`.
 * Предполагается задавать этому элементу `position: fixed` в стилях.
 *
 * @example
 * ```javascript
 * import PopupContainerProvider from 'arui-feather/popup-container-provider';
 * import Popup from 'arui-feather/popup';
 * import Page from 'arui-feather/page';
 *
 *  <Page>
 *     <PopupContainerProvider
 *         style={
 *             {
 *                 position: 'fixed',
 *                 top: 0,
 *                 right: 0,
 *                 bottom: 0,
 *                 width: '400px',
 *                 overflow: 'auto'
 *             }
 *         }
 *     >
 *         <Popup>
 *             Попап отрендерился в PopupContainerProvider, а не в body
 *             При скролле внутри блока, попап ездит вместе с остальным контентом.
 *         </Popup>
 *     </PopupContainerProvider>
 *  </Page>
 * ```
 */
@cn('popup-container')
class PopupContainerProvider extends React.Component {
    static propTypes = {
        /** Дочерние элементы контейнера */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Объект со стилями */
        style: styleType,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white'])
    };

    static childContextTypes = {
        isInCustomContainer: Type.bool,
        renderContainerElement: HtmlElement,
        positioningContainerElement: HtmlElement
    };

    state = {
        didRender: false
    };

    getChildContext() {
        return {
            isInCustomContainer: true,
            renderContainerElement: (this.renderContainer && this.renderContainer.getNode()),
            positioningContainerElement: this.positioningContainer
        };
    }

    componentDidMount() {
        this.handleContainerDidRender();
    }

    render(cn) {
        if (this.props.children && this.props.children.length > 1) {
            throw new Error('You can provide only one child element to <PopupContainerProvider />');
        }

        return (
            <div
                className={ cn }
                ref={ (positioningContainer) => { this.positioningContainer = positioningContainer; } }
                style={ this.props.style }
            >
                {
                    this.props.children
                        ? React.cloneElement(this.props.children)
                        : null
                }
                <IsolatedContainer
                    ref={ (renderContainer) => { this.renderContainer = renderContainer; } }
                />
            </div>
        );
    }

    /**
     * Необходимо для обновления childContext сразу после получения refs.
     */
    handleContainerDidRender() {
        this.setState({
            didRender: true
        });
    }
}

export default PopupContainerProvider;
