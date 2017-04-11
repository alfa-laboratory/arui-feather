/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

let warned = false;

/**
 * Базовый абстрактный компонент ARUI Feather.
 * Все компоненты наследуются от него.
 *
 * @deprecated
 * @class
 * @abstract
 */
class FeatherComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        if (process.env.NODE_ENV !== 'production' && !warned) {
            // eslint-disable-next-line no-console
            console.warn('Usage of `FeatherComponent` is deprecated. Please extend `React.Component` directly.');
            warned = true;
        }
    }
}

export default FeatherComponent;
