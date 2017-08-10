'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = scrollTo;

var _easings = require('./easings');

var _easings2 = _interopRequireDefault(_easings);

var _vars = require('../vars');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function scrollTo(options) {
    var targetY = options.targetY,
        container = options.container,
        _options$duration = options.duration,
        duration = _options$duration === undefined ? 0 : _options$duration,
        _options$easing = options.easing,
        easing = _options$easing === undefined ? _vars.SCROLL_TO_EASING : _options$easing;


    var scrollY = container ? container.scrollTop : window.pageYOffset;
    var startTime = window.performance.now();

    if (duration < 0) {
        throw new Error('Incorrect duration in options');
    }

    if (!_easings2.default[easing]) {
        throw new Error('Incorrect easing in options');
    }

    easing = _easings2.default[easing];

    return new Promise(function (resolve) {
        function scrollToTarget(y) {
            if (container) {
                container.scrollTop = y;
            } else {
                window.scrollTo(0, y);
            }
        }

        function loop(timestamp) {
            var currentTime = Math.abs(timestamp - startTime);
            var t = currentTime / duration;
            var val = easing(t);
            var currentTargetY = scrollY + (targetY - scrollY) * val;

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
//# sourceMappingURL=scroll-to.js.map
