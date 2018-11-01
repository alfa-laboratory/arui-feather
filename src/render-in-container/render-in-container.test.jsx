/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import RenderInContainer from './render-in-container';

describe('render-in-container', () => {
    it('should place children in body when `container` prop not set', () => {
        let renderInContainer = mount(
            <RenderInContainer>
                <div>Render-test</div>
            </RenderInContainer>
        );

        let contentNode = renderInContainer.instance().getNode();

        expect(renderInContainer.children().length).toBe(0);
        expect(contentNode.parentNode).toBe(document.body);
    });


    describe('with custom container', () => {
        function getRenderContainer() {
            return document.getElementById('render_container');
        }

        beforeEach(() => {
            let renderContainerNode = document.createElement('div');
            renderContainerNode.setAttribute('id', 'render_container');
            document.body.appendChild(renderContainerNode);
        });

        afterEach(() => {
            let renderContainerNode = getRenderContainer();
            document.body.removeChild(renderContainerNode);
        });

        it('should render empty component and place it in container set via `container` prop', () => {
            let renderInContainer = mount(
                <RenderInContainer container={ getRenderContainer() }>
                    <div>Render-test</div>
                </RenderInContainer>
            );
            let contentNode = renderInContainer.instance().getNode();
            let containerNode = renderInContainer.instance().getContainer();

            expect(renderInContainer.children().length).toBe(0);
            expect(contentNode.parentNode).toBe(getRenderContainer());
            expect(containerNode).toBe(getRenderContainer());
        });
    });

    it('should call `onRender` callback after element was rendered', () => {
        let onRender = jest.fn();

        mount(
            <RenderInContainer onRender={ onRender }>
                <div>Render-test</div>
            </RenderInContainer>
        );

        expect(onRender).toHaveBeenCalled();
    });
});
