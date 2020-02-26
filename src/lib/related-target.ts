/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Get DOM element involved in event. For example:
 * with `mouseout`, indicates the element being entered,
 * with `mouseover`, indicates the element being exited.
 *
 * @param event DOM event to find related target in.
 * @returns The other DOM element involved in the event, if any.
 */
export default function getRelatedTarget(event: FocusEvent | MouseEvent): Element | null {
    // https://github.com/facebook/react/issues/2011
    // https://github.com/facebook/react/issues/3751
    // https://github.com/facebook/react/issues/6410
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/101237/
    // event.relatedTarget isn't fully supported in FF<48 & IE10
    return event.relatedTarget as Element || document.activeElement;
}
