'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calcTargetDimensions = calcTargetDimensions;
exports.calcFitContainerDimensions = calcFitContainerDimensions;
exports.calcBestDrawingParams = calcBestDrawingParams;

var _vars = require('../vars');

var VIEWPORT_ACCURACY_FACTOR = 0.99; /* This Source Code Form is subject to the terms of the Mozilla Public
                                      * License, v. 2.0. If a copy of the MPL was not distributed with this
                                      * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var VIEWPORT_PADDING = 20;

var DEFAULT_DIRECTIONS = ['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right', 'right-top', 'right-center', 'right-bottom', 'left-top', 'left-center', 'left-bottom'];

/**
 * @typedef {Object} DrawingParams
 * @property {String} direction Направление отрисовки
 * @property {Number} left Положение по горизонтали
 * @property {Number} top Положение по вертикали
 */

/**
 * @typedef {Object} PopupDimension
 * @property {Number} width Ширина попапа
 * @property {Number} height Высота попапа
 * @property {Number} area Площадь попапа
 */

/**
 * @typedef {Object} Rect
 * @property {Number} top
 * @property {Number} left
 * @property {Number} [bottom]
 * @property {Number} [right]
 * @property {Number} [width]
 * @property {Number} [height]
 */

/**
 * @param {String} direction Направление отрисовки
 * @returns {String|Boolean}
 */
function getMainDirection(direction) {
    var deliveryPosition = direction.indexOf('-');
    return deliveryPosition !== -1 && direction.substr(0, deliveryPosition);
}

/**
 * @param {String} direction Направление отрисовки
 * @returns {String|Boolean}
 */
function getSecondaryDirection(direction) {
    var deliveryPosition = direction.indexOf('-');
    return deliveryPosition !== -1 && direction.substr(deliveryPosition + 1);
}

/**
 * Высчитывает координаты блока, который является таргетом поп-апа.
 *
 * @param {PopupHash} popup Набор параметров попапа
 * @returns {Rect}
 */
function calcTargetDimensions(popup) {
    if (!popup.isTargetAnchor && popup.targetPosition) {
        return {
            left: popup.targetPosition.left,
            top: popup.targetPosition.top,
            width: 0,
            height: 0
        };
    }

    var anchor = popup.targetAnchor;
    var anchorRect = anchor.getBoundingClientRect();
    var fitContainer = popup.fitContainer;


    if (fitContainer) {
        var fitContainerRect = fitContainer.getBoundingClientRect();

        return {
            left: anchorRect.left - fitContainerRect.left + fitContainer.scrollLeft,
            top: anchorRect.top - fitContainerRect.top + fitContainer.scrollTop,
            width: anchorRect.width,
            height: anchorRect.height
        };
    }

    return {
        left: anchorRect.left + window.pageXOffset,
        top: anchorRect.top + window.pageYOffset,
        width: anchorRect.width,
        height: anchorRect.height
    };
}

/**
 * Рассчитывает размеры и координаты расположения viewport.
 *
 * @returns {Rect}
 */
function calcViewportDimensions() {
    var winTop = window.pageYOffset;
    var winLeft = window.pageXOffset;
    var winWidth = window.innerWidth;
    var winHeight = window.innerHeight;

    return {
        top: winTop,
        left: winLeft,
        bottom: winTop + winHeight,
        right: winLeft + winWidth
    };
}

/**
 * Высчитывает размеры и координаты расположения контейнера, в котором рендерится Popup.
 *
 * @param {HTMLElement} container контейнер, в котором будет позиционирован Popup
 * @returns {Rect}
 */
function calcContainerDimensions(container) {
    var containerTop = container.scrollTop;
    var containerLeft = container.scrollLeft;
    var containerHeight = container.offsetHeight;
    var containerWidth = container.offsetWidth;

    return {
        top: containerTop,
        left: containerLeft,
        bottom: containerTop + containerHeight,
        right: containerLeft + containerWidth
    };
}

/**
 * Определяет контейнер, в котором рендерится Popup и возвращает его размеры и координаты.
 *
 * @param {PopupHash} popup Набор параметров попапа
 * @returns {Rect}
 */
function calcFitContainerDimensions(popup) {
    var fitContainer = popup.fitContainer;


    return fitContainer ? calcContainerDimensions(fitContainer) : calcViewportDimensions();
}

/**
 * Рассчитывает пересечения Popup и контейнера, в котором он рендерится.
 *
 * @param {Point} position Позиция
 * @param {Rect} fitContainerDimensions Размеры контейнера, в который будет рендерится Popup
 * @param {PopupDimension} popupDimensions Размеры попапа
 * @param {PopupHash} popup Набор параметров попапа
 * @returns {Number}
 */
function calcFitContainerFactor(position, fitContainerDimensions, popupDimensions, popup) {
    var fitContainerOffset = popup.offset.fitContainer;

    var intersectionLeft = Math.max(position.left, fitContainerDimensions.left + fitContainerOffset);

    var intersectionRight = Math.min(position.left + popupDimensions.width, fitContainerDimensions.right - fitContainerOffset);

    var intersectionTop = Math.max(position.top, fitContainerDimensions.top + fitContainerOffset);

    var intersectionBottom = Math.min(position.top + popupDimensions.height, fitContainerDimensions.bottom - fitContainerOffset);

    if (intersectionLeft < intersectionRight && intersectionTop < intersectionBottom) {
        return (intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop) / popupDimensions.area;
    }

    return 0;
}

/**
 * Возвращает значения для позиционирования Popup в конкретной позиции.
 *
 * @param {String} direction Направление отрисовки
 * @param {Rect} targetDimensions Область отрисовки якорного элемента
 * @param {PopupDimension} popupDimensions Размеры попапа
 * @param {PopupHash} popup Набор параметров попапа
 * @returns {Point}
 */
function calcPos(direction, targetDimensions, popupDimensions, popup) {
    var result = {};
    var mainOffset = popup.offset.main || popup.isHaveTooltip && _vars.POPUP_MAIN_OFFSET || 0;
    var secondaryOffset = popup.offset.second;

    var mainDirection = getMainDirection(direction);
    var secondaryDirection = getSecondaryDirection(direction);

    switch (mainDirection) {
        case 'bottom':
            result.top = targetDimensions.top + targetDimensions.height + mainOffset;
            break;
        case 'top':
            result.top = targetDimensions.top - popupDimensions.height - mainOffset;
            break;
        case 'left':
            result.left = targetDimensions.left - popupDimensions.width - mainOffset;
            break;
        case 'right':
            result.left = targetDimensions.left + targetDimensions.width + mainOffset;
            break;
        default:
            break;
    }

    switch (secondaryDirection) {
        case 'right':
            result.left = targetDimensions.left + targetDimensions.width - popupDimensions.width - secondaryOffset;
            break;
        case 'left':
            result.left = targetDimensions.left + secondaryOffset;
            break;
        case 'bottom':
            result.top = targetDimensions.top + targetDimensions.height - popupDimensions.height - secondaryOffset;
            break;
        case 'top':
            result.top = targetDimensions.top + secondaryOffset;
            break;
        case 'center':
            switch (mainDirection) {
                case 'top':
                case 'bottom':
                    result.left = targetDimensions.left + (targetDimensions.width / 2 - popupDimensions.width / 2);
                    break;
                case 'left':
                case 'right':
                    result.top = targetDimensions.top + (targetDimensions.height / 2 - popupDimensions.height / 2);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }

    return result;
}

/**
 * Рассчитывает наилучшие значения для позиционирования Popup.
 *
 * @param {PopupHash} popup Набор параметров попапа
 * @param {Rect} targetDimensions Область отрисовки якорного элемента
 * @param {Rect} fitContainerDimensions Размеры вьюпорта
 * @returns {DrawingParams}
 */
function calcBestDrawingParams(popup, targetDimensions, fitContainerDimensions) {
    var popupDimensions = {
        width: popup.width,
        height: popup.height,
        area: popup.width * popup.height
    };
    var directions = popup.directions ? popup.directions : popup.isHeightAvailable && ['top-left'] || DEFAULT_DIRECTIONS;
    var i = 0;
    var direction = '';
    var heightToEdge = 0;
    var height = 0;
    var overflow = false;
    var newPopupDimensions = {};
    var position = {};
    var fitContainerFactor = 0;
    var bestDirection = '';
    var bestPosition = {};
    var bestHeight = 0;
    var bestFitContainerFactor = 0;

    while (directions[i]) {
        direction = directions[i];
        i += 1;

        if (getMainDirection(direction) === 'top') {
            heightToEdge = targetDimensions.top - fitContainerDimensions.top;
        } else if (getMainDirection(direction) === 'bottom') {
            heightToEdge = fitContainerDimensions.bottom - (targetDimensions.top + targetDimensions.height);
        }

        if (popup.isHeightAdaptive) {
            if (popup.contentHeight > heightToEdge) {
                height = heightToEdge;
                overflow = true;
            } else {
                height = popup.contentHeight;
                overflow = false;
            }

            newPopupDimensions = {
                width: popup.width,
                height: height,
                area: popup.width * height
            };
        }

        position = calcPos(direction, targetDimensions, height ? newPopupDimensions : popupDimensions, popup);
        fitContainerFactor = calcFitContainerFactor(position, fitContainerDimensions, popupDimensions, popup);

        if (i === 1 || fitContainerFactor > bestFitContainerFactor || !bestFitContainerFactor && popup.bestDirection) {
            bestFitContainerFactor = fitContainerFactor;
            bestDirection = direction;
            bestPosition = position;
            bestHeight = height;
        }

        if (bestFitContainerFactor > VIEWPORT_ACCURACY_FACTOR) {
            break;
        }
    }

    if (popup.isHeightAdaptive && popup.contentHeight > heightToEdge) {
        if (getMainDirection(bestDirection) === 'top') {
            bestPosition.top += VIEWPORT_PADDING;
            bestHeight -= VIEWPORT_PADDING;
        } else if (getMainDirection(bestDirection) === 'bottom') {
            bestHeight -= VIEWPORT_PADDING;
        }
    }

    return {
        direction: bestDirection,
        left: bestPosition.left,
        top: bestPosition.top,
        height: bestHeight || 'auto',
        overflow: overflow
    };
}
//# sourceMappingURL=calc-drawing-params.js.map
