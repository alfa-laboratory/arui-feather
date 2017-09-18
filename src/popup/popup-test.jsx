/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Popup from './index';
import { calcBestDrawingParams, calcTargetDimensions, calcFitContainerDimensions } from './calc-drawing-params';
import { POPUP_MAIN_OFFSET } from '../vars';

function renderPopup(popupProps, anchorProps) {
    let popup;
    let anchor;

    if (popupProps) {
        let popupContainer = document.createElement('div');
        document.body.appendChild(popupContainer);

        popup = render(
            <Popup { ...popupProps }>{ popupProps.children || 'Popup' }</Popup>,
            {
                container: popupContainer
            }
        );

        // Render in container workaround.
        popup.node = document.body.querySelector('.popup');
    }

    if (anchorProps) {
        let anchorContainer = document.createElement('div');
        document.body.appendChild(anchorContainer);

        anchor = render(
            <div { ...anchorProps }>Target</div>,
            {
                container: anchorContainer
            }
        );
    }

    let popupHeaderNode;
    if (popup) {
        popupHeaderNode = popup.node.querySelector('.popup__header');
    }

    let popupContentNode;
    if (popup) {
        popupContentNode = popup.node.querySelector('.popup__content');
    }

    if (popup && anchor) {
        popup.instance.setTarget(anchor.node);
    }

    return { popup, anchor, popupHeaderNode, popupContentNode };
}

function getPopupDimensions(popupNode, popupContentNode) {
    return {
        width: popupNode.offsetWidth,
        height: popupNode.offsetHeight,
        contentWidth: popupContentNode.offsetWidth,
        contentHeight: popupContentNode.offsetHeight
    };
}

describe('popup', () => {
    afterEach(cleanUp);

    it('should set anchor target', () => {
        let { popup, anchor } = renderPopup({ visible: true }, {});

        popup.instance.setTarget(anchor.node);

        expect(popup.instance.anchor).to.equal(anchor.node);
    });

    it('should throw Error without setting anchor target', () => {
        let { popup } = renderPopup({ visible: true }, null);

        expect(popup.instance.redraw).to.throw('Cannot show popup without target or position');
    });

    it('should set position', () => {
        let { popup } = renderPopup({ visible: true, target: 'position' }, null);

        popup.instance.setPosition(100, 200);

        expect(popup.instance.position).to.deep.equal({ left: 100, top: 200 });
    });

    it('should throw Error with target=`position` but without setting position', () => {
        let { popup } = renderPopup({ visible: true, target: 'position' }, null);

        expect(popup.instance.redraw).to.throw('Cannot show popup without target or position');
    });

    it('should render text inside', () => {
        let { popup } = renderPopup({ visible: true }, {});

        expect(popup.node).to.have.text('Popup');
    });

    it('should set data-for when `for` prop is set', () => {
        let { popup } = renderPopup({ for: 'example', visible: true }, {});

        expect(popup.node.dataset.for).to.equal('example');
    });

    it('should have tooltip with target=`anchor` and type=`tooltip`', () => {
        let { popup } = renderPopup({ type: 'tooltip', visible: true }, {});

        expect(popup.node).to.have.class('popup_type_tooltip');
    });

    it('should not have tooltip with target=`position` and type=`tooltip`', () => {
        let { popup } = renderPopup({
            target: 'position',
            position: [0, 0],
            type: 'tooltip',
            visible: true
        }, null);

        popup.instance.setPosition(100, 200);

        expect(popup.node).to.not.have.class('popup_type_tooltip');
    });

    it('should set/unset class on popup hovered/unhovered', () => {
        let { popup } = renderPopup({ visible: true }, {});

        simulate(popup.node, 'mouseEnter');
        expect(popup.node).to.have.class('popup_hovered');

        simulate(popup.node, 'mouseLeave');
        expect(popup.node).to.not.have.class('popup_hovered');
    });

    it('should call `onMouseEnter` callback after popup was hovered', () => {
        let onMouseEnter = sinon.spy();
        let { popup } = renderPopup({ onMouseEnter, visible: true }, {});

        simulate(popup.node, 'mouseEnter');

        expect(onMouseEnter).to.have.been.calledOnce;
    });

    it('should call `onMouseLeave` callback after popup was unhovered', () => {
        let onMouseLeave = sinon.spy();
        let { popup } = renderPopup({ onMouseLeave, visible: true }, {});

        simulate(popup.node, 'mouseLeave');

        expect(onMouseLeave).to.have.been.calledOnce;
    });

    it('should call `onClickOutside` callback after click outside popup', (done) => {
        let onClickOutside = sinon.spy();
        renderPopup({ onClickOutside, autoclosable: true, visible: true }, {});

        let outsideElement = document.createElement('div');
        outsideElement.setAttribute('style',
            'width: 100px; height: 100px; position: absolute; left: 500px; top: 500px;'
        );
        outsideElement.setAttribute('id', 'outside');
        document.body.appendChild(outsideElement);

        setTimeout(() => {
            outsideElement.click();
            expect(onClickOutside).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should not call `onClickOutside` callback after click inside popup', (done) => {
        let onClickOutside = sinon.spy();
        let { popupContentNode } = renderPopup({ onClickOutside, autoclosable: true, visible: true }, {});

        setTimeout(() => {
            popupContentNode.click();
            expect(onClickOutside).to.not.have.been.called;
            done();
        }, 0);
    });

    it('should not render a header element by default', () => {
        let { popupHeaderNode } = renderPopup({ visible: true }, {});

        expect(popupHeaderNode).to.not.exist;
    });

    it('should render a header element when header parameter is present', () => {
        let { popupHeaderNode } = renderPopup({ header: <div />, visible: true }, {});

        expect(popupHeaderNode).to.exist;
    });

    describe('popup calculate drawing params', () => {
        document.body.style.margin = '0';

        let popupHash = {
            directions: ['top-center', 'left-top', 'right-top', 'bottom-center'],
            bestDirection: null,
            isHeightAdaptive: false,
            isHeightAvailable: false,
            isTargetAnchor: true,
            isHaveTooltip: false,
            width: 0,
            height: 0,
            contentWidth: 0,
            contentHeight: 0,
            offset: {
                main: 0,
                second: 0,
                fitContainer: 0
            },
            targetPosition: null,
            targetAnchor: null
        };

        it('should draw on right side width margin by main directions = 20, by second direction = 40', () => {
            let popupProps = { visible: true };
            let targetProps = { style: { width: 100, height: 100 } };
            let { popup, anchor, popupContentNode } = renderPopup(popupProps, targetProps);
            let popupDimensions = getPopupDimensions(popup.node, popupContentNode);

            popupHash.targetAnchor = anchor.node;
            popupHash.offset = {
                main: 20,
                second: 40,
                fitContainer: 0
            };

            let expectedParams = {
                direction: 'right-top',
                left: 120,
                top: 40,
                height: 'auto',
                overflow: false
            };

            let resultPopupHash = { ...popupHash, ...popupDimensions };
            let bestDrawingParams = calcBestDrawingParams(
                resultPopupHash,
                calcTargetDimensions(resultPopupHash),
                calcFitContainerDimensions(resultPopupHash)
            );

            expect(bestDrawingParams).to.deep.equal(expectedParams);
        });

        it('should draw on available left side', () => {
            let popupProps = { visible: true };
            let targetProps = { style: { float: 'right', width: 100, height: 100 } };
            let { popup, anchor, popupContentNode } = renderPopup(popupProps, targetProps);
            let popupDimensions = getPopupDimensions(popup.node, popupContentNode);

            popupHash.targetAnchor = anchor.node;

            let resultPopupHash = { ...popupHash, ...popupDimensions };
            let bestDrawingParams = calcBestDrawingParams(
                resultPopupHash,
                calcTargetDimensions(resultPopupHash),
                calcFitContainerDimensions(resultPopupHash)
            );

            expect(bestDrawingParams.direction).to.deep.equal('left-top');
        });

        it('should draw with margin=POPUP_MAIN_OFFSET by main direction when type=`tooltip` & mainOffset=null', () => {
            let popupProps = { visible: true, type: 'tooltip' };
            let targetProps = { style: { width: 100, height: 100 } };
            let { popup, anchor, popupContentNode } = renderPopup(popupProps, targetProps);
            let popupDimensions = getPopupDimensions(popup.node, popupContentNode);

            popupHash.targetAnchor = anchor.node;
            popupHash.isHaveTooltip = true;
            popupHash.offset = {
                main: null,
                second: 0,
                fitContainer: 0
            };

            let expectedParams = {
                direction: 'right-top',
                left: 100 + POPUP_MAIN_OFFSET,
                top: 0,
                height: 'auto',
                overflow: false
            };

            let resultPopupHash = { ...popupHash, ...popupDimensions };
            let bestDrawingParams = calcBestDrawingParams(
                resultPopupHash,
                calcTargetDimensions(resultPopupHash),
                calcFitContainerDimensions(resultPopupHash)
            );

            expect(bestDrawingParams).to.deep.equal(expectedParams);
        });

        it('should draw adaptive to the bottom window edge popup', () => {
            let popupProps = {
                height: 'adaptive',
                padded: false,
                visible: true,
                children: <div style={ { height: 2000 } }>Popup</div>
            };
            let targetProps = { style: { width: 100, height: 100 } };
            let { popup, anchor, popupContentNode } = renderPopup(popupProps, targetProps);
            let popupDimensions = getPopupDimensions(popup.node, popupContentNode);
            let viewportDimensions = {
                top: 0,
                left: 0,
                bottom: 500,
                right: 500
            };

            popupHash.directions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
            popupHash.targetAnchor = anchor.node;
            popupHash.isHeightAdaptive = true;

            let resultPopupHash = { ...popupHash, ...popupDimensions };
            let bestDrawingParams = calcBestDrawingParams(
                resultPopupHash, calcTargetDimensions(resultPopupHash), viewportDimensions
            );

            expect(bestDrawingParams.height).to.equal(380);
        });

        it('should draw adaptive to the top window edge popup', () => {
            let popupProps = {
                height: 'adaptive',
                padded: false,
                visible: true,
                children: <div style={ { height: 2000 } }>Popup</div>
            };
            let targetProps = { style: { width: 100, height: 100, marginTop: 400 } };
            let { popup, anchor, popupContentNode } = renderPopup(popupProps, targetProps);
            let popupDimensions = getPopupDimensions(popup.node, popupContentNode);
            let viewportDimensions = {
                top: 100,
                left: 0,
                bottom: 500,
                right: 500
            };

            popupHash.directions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
            popupHash.targetAnchor = anchor.node;
            popupHash.isHeightAdaptive = true;

            let resultPopupHash = { ...popupHash, ...popupDimensions };
            let bestDrawingParams = calcBestDrawingParams(
                resultPopupHash, calcTargetDimensions(resultPopupHash), viewportDimensions
            );

            expect(bestDrawingParams.height).to.equal(280);
        });

        it('should draw overflowed popup when content height > height to window edge', () => {
            let popupProps = {
                height: 'adaptive',
                padded: false,
                visible: true,
                children: <div style={ { height: 2000 } }>Popup</div>
            };
            let targetProps = { style: { width: 100, height: 100 } };
            let { popup, anchor, popupContentNode } = renderPopup(popupProps, targetProps);
            let popupDimensions = getPopupDimensions(popup.node, popupContentNode);
            let viewportDimensions = {
                top: 0,
                left: 0,
                bottom: 500,
                right: 500
            };

            popupHash.directions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
            popupHash.targetAnchor = anchor.node;
            popupHash.isHeightAdaptive = true;

            let resultPopupHash = { ...popupHash, ...popupDimensions };
            let bestDrawingParams = calcBestDrawingParams(
                resultPopupHash,
                calcTargetDimensions(resultPopupHash),
                viewportDimensions
            );

            expect(bestDrawingParams.overflow).to.be.true;
        });
    });
});
