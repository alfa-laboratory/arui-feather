/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';

import { IsolatedContainer } from '../isolated-container/isolated-container';

export type PopupContainerProviderProps = {
    /**
     * Дочерние элементы контейнера
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Объект со стилями
     */
    style?: any/* Не нашёлся встроенный тип для типа {"name":"custom","raw":"styleType","params":[],"returns":null}
                  * https://github.com/alfa-laboratory/library-utils/issues/new
                  */;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

}

type PopupContainerProviderState = {
    didRender: boolean;
}

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
class PopupContainerProvider extends
    React.PureComponent<PopupContainerProviderProps, PopupContainerProviderState> {
    cn = createCn('popup-container');

    state = {
        didRender: false // eslint-disable-line react/no-unused-state
    };

    renderContainer: IsolatedContainer;
    positioningContainer: HTMLElement;

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
    private handleContainerDidRender() {
        this.setState({
            didRender: true // eslint-disable-line react/no-unused-state
        });
    }

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    public getNode(): HTMLElement {
        return this.positioningContainer;
    }
}

export default PopupContainerProvider;
