/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import styleType from 'react-style-proptype';
import Type from 'prop-types';

import IsolatedContainer from '../isolated-container/isolated-container';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';
import { HtmlElement } from '../lib/prop-types';

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
class PopupContainerProvider extends React.PureComponent {
    cn = createCn('popup-container');
    static propTypes = {
        /** Дочерние элементы контейнера */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Объект со стилями */
        style: styleType,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static childContextTypes = {
        isInCustomContainer: Type.bool,
        renderContainerElement: HtmlElement,
        positioningContainerElement: HtmlElement
    };

    state = {
        didRender: false // eslint-disable-line react/no-unused-state
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

    render() {
        return (
            <div
                className={ this.cn() }
                id={ this.props.id }
                ref={ (positioningContainer) => {
                    this.positioningContainer = positioningContainer;
                } }
                style={ this.props.style }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.props.children }
                <IsolatedContainer
                    ref={ (renderContainer) => {
                        this.renderContainer = renderContainer;
                    } }
                />
            </div>
        );
    }

    /**
     * Необходимо для обновления childContext сразу после получения refs.
     */
    handleContainerDidRender() {
        this.setState({
            didRender: true // eslint-disable-line react/no-unused-state
        });
    }

    /**
     * Возвращает корневой `HTMLElement` компонента.
     *
     * @public
     * @returns {HTMLElement}
     */
    getNode() {
        return this.positioningContainer;
    }
}

export default withTheme(PopupContainerProvider);
