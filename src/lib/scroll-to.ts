/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import easings, { EasingType } from './easings';
import { SCROLL_TO_EASING } from '../vars';

type ScrollToOptions = {
    /**
    * Цель по оси Y
    */
    targetY: number;
    /**
    * Элемент в котором скроллим
    */
    container?: HTMLElement;
    /**
    * Продолжительность анимации в миллесекундах
    */
    duration?: number;
    /**
    * Название функции плавности для анимации
    */
    easing?: EasingType;
}
/**
* Скроллит по элементу или странице.
* В настоящее время доступно перемещение только по оси Y.
* TODO: Make a move on the x axis
*/
export default function scrollTo({
    targetY,
    container,
    duration = 0,
    easing = SCROLL_TO_EASING
}: ScrollToOptions): Promise<void> {

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
        function scrollToTarget(y: number): void {
            if (container) {
                container.scrollTop = y;
            } else {
                window.scrollTo(0, y);
            }
        }

        function loop(timestamp: number): void {
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
