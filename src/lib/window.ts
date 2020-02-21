/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import deprecated from 'deprecated-decorator';

/**
 * Check that mouse was outside element.
 */
export const isEventOusideBounds = deprecated({
    name: 'isEventOusideBounds',
    alternative: 'isEventOutsideClientBounds',
    version: '12.0.1'
} as any, (event: MouseEvent, element: Element): boolean => {
    const rect = element.getBoundingClientRect();

    return ((event.pageX < rect.left || event.pageX > rect.right) ||
            (event.pageY < rect.top || event.pageY > rect.bottom));
});

/**
 * Check that node is outside given element.
 */
export function isNodeOutsideElement(node: Element, element: Element): boolean {
    return !(element.contains(node) || element === node);
}

/**
 * Check that mouse was outside element.
 */
export function isEventOutsideClientBounds(event: MouseEvent, element: Element): boolean {
    const rect = element.getBoundingClientRect();

    return event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom;
}
