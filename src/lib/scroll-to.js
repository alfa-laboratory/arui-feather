/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import easings from './easings';
import { SCROLL_TO_EASING } from '../vars';

/**
 * Скроллит по элементу или странице.
 * В настоящее время доступно перемещение только по оси Y.
 *
 * @param {Options} options Список переданных опций
 * @param {Number} options.targetY Цель по оси Y
 * @param {HTMLElement} [options.container] Элемент в котором скроллим
 * @param {Number} [options.duration=0] Продолжительность анимации в миллесекундах
 * @param {String} [options.easing='easeInOutSine'] Название функции плавности для анимации
 * @returns {Promise}
 */
export default function scrollTo(options) {
    const {
        targetY,
        container,
        duration = 0,
        easing = SCROLL_TO_EASING
    } = options;

    const scrollY = container ? container.scrollTop : window.pageYOffset;
    const startTime = window.performance.now();

    if (duration < 0) {
        throw new Error('Incorrect duration in options');
    }

    if (!easings[easing]) {
        throw new Error('Incorrect easing in options');
    }

    const easingFunc = easings[easing];

    return new Promise((resolve) => {
        function scrollToTarget(y) {
            if (container) {
                container.scrollTop = y;
            } else {
                window.scrollTo(0, y);
            }
        }

        function loop(timestamp) {
            const currentTime = Math.abs(timestamp - startTime);
            const t = currentTime / duration;
            const val = easingFunc(t);
            const currentTargetY = scrollY + ((targetY - scrollY) * val);

            if (t < 1) {
                window.requestAnimationFrame(loop);
                scrollToTarget(currentTargetY);
            } else {
                scrollToTarget(targetY);
                resolve();
            }
        }

        if (duration === 0) {
            scrollToTarget(targetY);
            resolve();
        } else {
            loop(window.performance.now());
        }
    });
}
