/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import bowser from 'bowser';
import React from 'react';
import Benchmark from 'react-component-benchmark';
import { render, cleanUp } from './test-utils';

/**
 * Набор типов событий для тестирования производительности компонентов.
 */
const BENCHMARK_TYPES = [
    'mount', 'update', 'unmount'
];

/**
 * Количество прогонов в бенчмарке.
 */
const SAMPLES_QTY = 100;

const BROWSER = bowser.name;
const REACT_VERSION = React.version;

/**
 * Запускает бенчмарк.
 *
 * @param {Object} component Компонент для измерения.
 * @param {Object} componentProps Свойства для измеряемого компонента.
 * @param {Number} threshold Пороговое значение для тестирования.
 */
export default function runBenchmark(component, componentProps, threshold = 20) {
    let { name } = component;

    describe(name, () => {
        let result = 0;
        let props = {
            component,
            componentProps,
            samples: SAMPLES_QTY
        };

        afterEach(cleanUp);

        beforeEach(() => { result = 0; });

        BENCHMARK_TYPES.forEach((type) => {
            it(`should ${type} in expected time`, () => {
                props.onComplete = (results) => {
                    result = results.p99;
                    // Post results to stats collector
                    fetch('/stats', {
                        method: 'POST',
                        body: `${name},type=${type},browser=${BROWSER},react=${REACT_VERSION} value=${result}`
                    });
                };

                let component = render(<Benchmark { ...props } type={ type } />);

                component.instance.start();

                expect(result).to.be.below(threshold);
            });
        });
    });
}
