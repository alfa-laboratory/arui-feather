/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Check that node is outside given element.
 *
 * @param {Node} node Node to search
 * @param {Node} element Element that shouldn't contain node
 * @returns {Boolean}
 */
export function isNodeOutsideElement(node, element) {
    return !(element.contains(node) || element === node);
}

/**
 * Check that mouse was outside element.
 *
 * @param {Object} event - MouseEvent
 * @param {React.Element} element - Element to check bounds
 * @returns {Boolean}
 */
export function isEventOutsideClientBounds(event, element) {
    let rect = element.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right
        || event.clientY < rect.top || event.clientY > rect.bottom;
}
