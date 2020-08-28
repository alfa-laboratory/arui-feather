import React from 'react';

export function setRef<T>(
    ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
    value: T | null,
): void {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        /* eslint-disable no-param-reassign */
        ref.current = value;
        /* eslint-enable */
    }
}
