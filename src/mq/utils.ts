/**
 * Возвращает `true`, если есть поддержка `Pointer Events`
 */
export function isPointerEventsSupported() {
    return 'PointerEvent' in window || 'msPointerEnabled' in window.navigator;
}

/**
 * Возвращает `true`, если есть поддержка `Touch Events`
 */
export function isTouchSupported() {
    return (
        'ontouchstart' in window ||
        window.navigator.maxTouchPoints > 0 ||
        window.navigator.msMaxTouchPoints > 0
    );
}

export default {
    isPointerEventsSupported,
    isTouchSupported
};
