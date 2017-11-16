/**
 * Get DOM element involved in event. For example:
 * with `mouseout`, indicates the element being entered,
 * with `mouseover`, indicates the element being exited.
 *
 * @param {Object} event DOM event to find related target in.
 * @returns {HTMLElement} The other DOM element involved in the event, if any.
 */

export default function getRelatedTarget(event) {
    return event.relatedTarget || // Not supported in FF<48 и IE10 https://github.com/facebook/react/issues/2011
        event.explicitOriginalTarget || // Not supported in IE
        document.activeElement;
}
