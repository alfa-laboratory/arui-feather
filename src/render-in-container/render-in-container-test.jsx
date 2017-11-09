/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import RenderInContainer from './render-in-container';

xdescribe('render-in-container', () => {
    afterEach(cleanUp);

    it('should place children in body when `container` prop not set', () => {
        let renderInContainer = render(
            <RenderInContainer>
                <div>Render-test</div>
            </RenderInContainer>
        );

        let contentNode = renderInContainer.instance.getNode();

        expect(renderInContainer.node).not.to.exist;
        expect(contentNode.parentNode).to.equal(document.body);
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
            cleanUp();
        });

        it('should render empty component and place it in container set via `container` prop', () => {
            let renderInContainer = render(
                <RenderInContainer container={ getRenderContainer() }>
                    <div>Render-test</div>
                </RenderInContainer>
            );
            let contentNode = renderInContainer.instance.getNode();
            let containerNode = renderInContainer.instance.getContainer();

            expect(renderInContainer.node).not.to.exist;
            expect(contentNode.parentNode).to.equal(getRenderContainer());
            expect(containerNode).to.equal(getRenderContainer());
        });
    });

    it('should call `onRender` callback after element was rendered', () => {
        let onRender = sinon.spy();

        render(
            <RenderInContainer onRender={ onRender }>
                <div>Render-test</div>
            </RenderInContainer>
        );

        expect(onRender).to.have.been.calledOnce;
    });
});
