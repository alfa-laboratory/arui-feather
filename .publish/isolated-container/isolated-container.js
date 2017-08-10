'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Изолирует своих детей от изменений `props`-ов, и `context`-а.
 * Используется для визуализации элементов в кастомных контейнерах,
 * о которых React не должен ничего знать.
 */
var IsolatedContainer = function (_React$Component) {
  _inherits(IsolatedContainer, _React$Component);

  function IsolatedContainer() {
    _classCallCheck(this, IsolatedContainer);

    return _possibleConstructorReturn(this, (IsolatedContainer.__proto__ || Object.getPrototypeOf(IsolatedContainer)).apply(this, arguments));
  }

  _createClass(IsolatedContainer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
    /**
     * @type {HTMLElement}
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', { ref: function ref(element) {
          _this2.element = element;
        } });
    }

    /**
     * Возвращает корневой `HTMLElement` компонента.
     *
     * @public
     * @returns {HTMLElement}
     */

  }, {
    key: 'getNode',
    value: function getNode() {
      return this.element;
    }
  }]);

  return IsolatedContainer;
}(_react2.default.Component);

exports.default = IsolatedContainer;
//# sourceMappingURL=isolated-container.js.map
