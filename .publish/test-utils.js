'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.render = render;
exports.cleanUp = cleanUp;
exports.simulate = simulate;
exports.eventPersist = eventPersist;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _testUtils = require('react-dom/test-utils');

var _testUtils2 = _interopRequireDefault(_testUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint react/no-render-return-value: 0 */
/* eslint react/no-find-dom-node: 0 */

var sharedContainer = null;

/**
 * Тестовая обертка.
 *
 * @typedef {Object} TestWrapper
 * @property {React.Component} instance Ссылка на экземпляр React компонента.
 * @property {Node} node Корневой HTML узел компонента.
 * @property {Node} container HTML узел контейнера, в котором отрендерен компонент.
 */

/**
 * Рендерит компонент в настоящий DOM, возвращает тестовую обертку.
 *
 * @param {Object} jsx JSX для рендера.
 * @param {Object} [options] Опции для рендера.
 * @param {String} [options.css] Стили для рендер контейнера.
 * @param {Node} [options.container] Контейнер, в который нарендерить компонент.
 * @returns {TestWrapper}
 */
function render(jsx) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var container = options.container;

    if (!container) {
        if (!sharedContainer) {
            sharedContainer = document.createElement('div');
            document.body.appendChild(sharedContainer);
        }
        container = sharedContainer;
    }

    if (options.css) {
        container.setAttribute('style', options.css);
    }

    var instance = _reactDom2.default.render(jsx, container);

    return {
        instance: instance,
        node: _reactDom2.default.findDOMNode(instance),
        container: container
    };
}

/**
 * Очищает содержимое DOM после тестов.
 */
function cleanUp() {
    if (sharedContainer) {
        sharedContainer = null;
    }

    while (document.body.childNodes.length > 0) {
        document.body.removeChild(document.body.firstChild);
    }
}

/**
 * Симулирует событие на HTML узле.
 *
 * @param {Node} node HTML узел, на котором необходимо сгенерить событие.
 * @param {String} event Тип события.
 * @param {*} [data] Данные для прокисрования в событие.
 */
function simulate(node, event, data) {
    _testUtils2.default.Simulate[event](node, data);
}

/**
 * Обеспечивает сохранение полей события в случае SyntheticEvent.
 *
 * @param {Object} event Событие
 */
function eventPersist(event) {
    if (event.persist) {
        event.persist();
    }
}
//# sourceMappingURL=test-utils.js.map
