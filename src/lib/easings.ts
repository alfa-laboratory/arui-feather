/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import bezierEasing from 'bezier-easing';

const easings = {
    easeInSine: bezierEasing(0.47, 0, 0.745, 0.715),
    easeOutSine: bezierEasing(0.39, 0.575, 0.565, 1),
    easeInOutSine: bezierEasing(0.445, 0.05, 0.55, 0.95),
    easeInQuad: bezierEasing(0.55, 0.085, 0.68, 0.53),
    easeOutQuad: bezierEasing(0.25, 0.46, 0.45, 0.94),
    easeInOutQuad: bezierEasing(0.455, 0.03, 0.515, 0.955),
    easeInCubic: bezierEasing(0.55, 0.055, 0.675, 0.19),
    easeOutCubic: bezierEasing(0.215, 0.61, 0.355, 1),
    easeInOutCubic: bezierEasing(0.645, 0.045, 0.355, 1),
    easeInQuart: bezierEasing(0.895, 0.03, 0.685, 0.22),
    easeOutQuart: bezierEasing(0.165, 0.84, 0.44, 1),
    easeInOutQuart: bezierEasing(0.77, 0, 0.175, 1),
    easeInQuint: bezierEasing(0.755, 0.05, 0.855, 0.06),
    easeOutQuint: bezierEasing(0.23, 1, 0.32, 1),
    easeInOutQuint: bezierEasing(0.86, 0, 0.07, 1),
    easeInExpo: bezierEasing(0.95, 0.05, 0.795, 0.035),
    easeOutExpo: bezierEasing(0.19, 1, 0.22, 1),
    easeInOutExpo: bezierEasing(1, 0, 0, 1),
    easeInCirc: bezierEasing(0.6, 0.04, 0.98, 0.335),
    easeOutCirc: bezierEasing(0.075, 0.82, 0.165, 1),
    easeInOutCirc: bezierEasing(0.785, 0.135, 0.15, 0.86),
    easeInBack: bezierEasing(0.6, -0.28, 0.735, 0.045),
    easeOutBack: bezierEasing(0.175, 0.885, 0.32, 1.275),
    easeInOutBack: bezierEasing(0.68, -0.55, 0.265, 1.55)
};

export type EasingType = keyof typeof easings;
export default easings;
