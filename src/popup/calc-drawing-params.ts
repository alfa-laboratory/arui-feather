/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

import { POPUP_MAIN_OFFSET } from '../vars';

const VIEWPORT_ACCURACY_FACTOR = 0.99;
const VIEWPORT_PADDING = 20;

const DEFAULT_DIRECTIONS = [
    'bottom-left', 'bottom-center', 'bottom-right',
    'top-left', 'top-center', 'top-right',
    'right-top', 'right-center', 'right-bottom',
    'left-top', 'left-center', 'left-bottom'
];

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
    const deliveryPosition = direction.indexOf('-');

    return (deliveryPosition !== -1) && direction.substr(0, deliveryPosition);
}

/**
 * @param {String} direction Направление отрисовки
 * @returns {String|Boolean}
 */
function getSecondaryDirection(direction) {
    const deliveryPosition = direction.indexOf('-');

    return (deliveryPosition !== -1) && direction.substr(deliveryPosition + 1);
}

/**
 * Высчитывает координаты блока, который является таргетом поп-апа.
 *
 * @param {PopupHash} popup Набор параметров попапа
 * @returns {Rect}
 */
export function calcTargetDimensions(popup) {
    if (!popup.isTargetAnchor && popup.targetPosition) {
        return {
            left: popup.targetPosition.left,
            top: popup.targetPosition.top,
            width: 0,
            height: 0
        };
    }

    const anchor = popup.targetAnchor;
    const anchorRect = anchor.getBoundingClientRect();
    const { fitContainer } = popup;

    if (fitContainer) {
        const fitContainerRect = fitContainer.getBoundingClientRect();

        return {
            left: (anchorRect.left - fitContainerRect.left) + fitContainer.scrollLeft,
            top: (anchorRect.top - fitContainerRect.top) + fitContainer.scrollTop,
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
    const winTop = window.pageYOffset;
    const winLeft = window.pageXOffset;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

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
    const containerTop = container.scrollTop;
    const containerLeft = container.scrollLeft;
    const containerHeight = container.offsetHeight;
    const containerWidth = container.offsetWidth;

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
export function calcFitContainerDimensions(popup) {
    const { fitContainer } = popup;

    return fitContainer
        ? calcContainerDimensions(fitContainer)
        : calcViewportDimensions();
}

/**
 * Рассчитывает пересечения Popup и контейнера, в котором он рендерится.
 *
 * @param {Point} position Позиция
 * @param {Rect} fitContainerDimensions Размеры контейнера, в который будет
 * рендерится Popup
 * @param {PopupDimension} popupDimensions Размеры попапа
 * @param {PopupHash} popupOffsetFitContainer Минимально допустимое смещение в
 * пикселях всплывающего окна от края его контейнера
 * @returns {Number}
 */
function calcFitContainerFactor(
    position,
    fitContainerDimensions,
    popupDimensions,
    popupOffsetFitContainer) {
    const intersectionLeft = Math.max(
        position.left,
        fitContainerDimensions.left + popupOffsetFitContainer
    );

    const intersectionRight = Math.min(
        position.left + popupDimensions.width,
        fitContainerDimensions.right - popupOffsetFitContainer
    );

    const intersectionTop = Math.max(
        position.top,
        fitContainerDimensions.top + popupOffsetFitContainer
    );

    const intersectionBottom = Math.min(
        position.top + popupDimensions.height,
        fitContainerDimensions.bottom - popupOffsetFitContainer
    );

    if ((intersectionLeft < intersectionRight) && (intersectionTop < intersectionBottom)) {
        return (
            (intersectionRight - intersectionLeft) * (intersectionBottom - intersectionTop)
        ) / popupDimensions.area;
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
    const result = {};
    const mainOffset = popup.offset.main || (popup.isHaveTooltip && POPUP_MAIN_OFFSET) || 0;
    const secondaryOffset = popup.offset.second;

    const mainDirection = getMainDirection(direction);
    const secondaryDirection = getSecondaryDirection(direction);

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
            result.left = (targetDimensions.left + targetDimensions.width) - popupDimensions.width - secondaryOffset;
            break;
        case 'left':
            result.left = targetDimensions.left + secondaryOffset;
            break;
        case 'bottom':
            result.top = (targetDimensions.top + targetDimensions.height) - popupDimensions.height - secondaryOffset;
            break;
        case 'top':
            result.top = targetDimensions.top + secondaryOffset;
            break;
        case 'center':
            switch (mainDirection) {
                case 'top':
                case 'bottom':
                    result.left = targetDimensions.left + (
                        (targetDimensions.width / 2) - (popupDimensions.width / 2)
                    );
                    break;
                case 'left':
                case 'right':
                    result.top = targetDimensions.top + (
                        (targetDimensions.height / 2) - (popupDimensions.height / 2)
                    );
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
export function calcBestDrawingParams(popup, targetDimensions, fitContainerDimensions) {
    const popupDimensions = {
        width: popup.width,
        height: popup.height,
        area: popup.width * popup.height
    };
    const directions = popup.directions
        ? popup.directions
        : (popup.isHeightAvailable && ['top-left']) || DEFAULT_DIRECTIONS;
    let i = 0;
    let direction = '';
    let heightToEdge = 0;
    let height = 0;
    let overflow = false;
    let newPopupDimensions = {};
    let position = {};
    let fitContainerFactor = 0;
    let bestDirection = '';
    let bestPosition = {};
    let bestHeight = 0;
    let bestFitContainerFactor = 0;

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
                height,
                area: popup.width * height
            };
        }

        position = calcPos(direction, targetDimensions, height ? newPopupDimensions : popupDimensions, popup);
        fitContainerFactor = calcFitContainerFactor(
            position,
            fitContainerDimensions,
            popupDimensions,
            popup.offset.fitContainer
        );

        if (i === 1 ||
            fitContainerFactor > bestFitContainerFactor ||
            (!bestFitContainerFactor && popup.bestDirection)
        ) {
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
        overflow
    };
}
