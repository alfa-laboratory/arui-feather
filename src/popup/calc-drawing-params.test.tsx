/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { calcBestDrawingParams, calcTargetDimensions, calcFitContainerDimensions } from './calc-drawing-params';

describe('calcTargetDimensions', () => {
    it('should return popup target position if popup is not in targetAnchor mode', () => {
        const fakePopup = {
            isTargetAnchor: false,
            targetPosition: { left: 0, top: 0 }
        };
        const result = calcTargetDimensions(fakePopup);

        expect(result).toEqual({
            left: 0,
            top: 0,
            width: 0,
            height: 0
        });
    });

    it('should use fit container scroll position and top/left position', () => {
        const fakePopup = {
            isTargetAnchor: false,
            targetAnchor: {
                getBoundingClientRect: () => ({
                    left: 0,
                    top: 0,
                    width: 10,
                    height: 10
                })
            },
            fitContainer: {
                getBoundingClientRect: () => ({
                    left: 5,
                    top: 5,
                    width: 100,
                    height: 100
                }),
                scrollLeft: 20,
                scrollTop: 20
            }
        };

        const result = calcTargetDimensions(fakePopup);

        expect(result).toEqual({
            left: 15,
            top: 15,
            width: 10,
            height: 10
        });
    });

    it('should add window scroll position to position', () => {
        const fakePopup = {
            isTargetAnchor: false,
            targetAnchor: {
                getBoundingClientRect: () => ({
                    left: 10,
                    top: 10,
                    width: 10,
                    height: 10
                })
            }
        };

        (window as any).pageXOffset = 10;
        (window as any).pageYOffset = 10;

        const result = calcTargetDimensions(fakePopup);

        expect(result).toEqual({
            left: 20,
            top: 20,
            width: 10,
            height: 10
        });
    });
});

describe('calcFitContainerDimensions', () => {
    it('should use container dimensions if popup has `fitContainer`', () => {
        const fakePopup = {
            fitContainer: {
                scrollLeft: 20,
                scrollTop: 20,
                offsetHeight: 10,
                offsetWidth: 10
            }
        };

        const result = calcFitContainerDimensions(fakePopup);

        expect(result).toEqual({
            left: 20,
            top: 20,
            bottom: 30,
            right: 30
        });
    });

    it('should use window as container, if no `fitContainer` given', () => {
        const result = calcFitContainerDimensions({});

        expect(result).toEqual({
            left: window.pageXOffset,
            top: window.pageYOffset,
            bottom: window.pageYOffset + window.innerHeight,
            right: window.pageXOffset + window.innerWidth
        });
    });
});

describe.only('calcBestDrawingParams', () => {
    const basePopupHash = {
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
    const baseTargetDimensions = {
        left: 0,
        top: 0,
        width: 100,
        height: 100
    };
    const baseViewportDimensions = {
        top: 0,
        left: 0,
        bottom: 600,
        right: 800
    };

    it('should draw on right side width margin by main directions = 20, by second direction = 40', () => {
        const fakePopup = {
            ...basePopupHash,
            width: 30,
            height: 30,
            offset: {
                ...basePopupHash.offset,
                main: 20,
                second: 40
            }
        };

        const result = calcBestDrawingParams(fakePopup, baseTargetDimensions, baseViewportDimensions);

        expect(result).toEqual({
            direction: 'right-top',
            left: 120,
            top: 40,
            height: 'auto',
            overflow: false
        });
    });

    it('should draw on available left side', () => {
        const fakePopup = {
            ...basePopupHash,
            width: 60,
            height: 30,
            offset: {
                ...basePopupHash.offset,
                main: 20,
                second: 40
            }
        };
        const targetDimensions = {
            ...baseTargetDimensions,
            left: 700
        };
        const result = calcBestDrawingParams(fakePopup, targetDimensions, baseViewportDimensions);

        expect(result.direction).toBe('left-top');
    });
});
