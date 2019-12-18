/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

let scrollbarWidth;

/**
 * Возвращает ширину скроллбара.
 *
 * @returns {Number}
 */
export default function getScrollbarWidth() {
    if (typeof scrollbarWidth !== 'undefined') {
        return scrollbarWidth;
    }

    if (typeof window !== 'undefined') {
        // Calculate scroll bar width cross-browser
        // https://gist.github.com/kflorence/3086552
        const inner = document.createElement('p');

        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');

        outer.style.position = 'absolute';
        outer.style.top = 0;
        outer.style.left = 0;
        outer.style.visibility = 'hidden';
        outer.style.width = '200px';
        outer.style.height = '150px';
        outer.style.overflow = 'hidden';
        outer.appendChild(inner);

        document.body.appendChild(outer);
        const w1 = inner.offsetWidth;

        outer.style.overflow = 'scroll';
        let w2 = inner.offsetWidth;

        if (w1 === w2) {
            w2 = outer.clientWidth;
        }

        document.body.removeChild(outer);

        scrollbarWidth = w1 - w2;
    }

    return scrollbarWidth;
}
