'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                             * License, v. 2.0. If a copy of the MPL was not distributed with this
                                             * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _modernizr = require('../modernizr');

var _modernizr2 = _interopRequireDefault(_modernizr);

var _mq = require('./mq.json');

var _mq2 = _interopRequireDefault(_mq);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var IS_BROWSER = typeof window !== 'undefined';
var SUPPORTS_TOUCH = IS_BROWSER && (_modernizr2.default.pointerevents || _modernizr2.default.touchevents);

var pool = {};
var refCounters = {};

function getMatchMedia(queryProp) {
    var query = _mq2.default[queryProp] || queryProp;

    if (!pool[query]) {
        pool[query] = window.matchMedia(query);
        refCounters[query] = 1;
    } else {
        refCounters[query] += 1;
    }

    return pool[query];
}

function releaseMatchMedia(queryProp) {
    var query = _mq2.default[queryProp] || queryProp;

    refCounters[query] -= 1;

    if (pool[query] && refCounters[query] === 0) {
        delete pool[query];
        delete refCounters[query];
    }
}

/**
 * Компонент, имплементирующий поддержку медиа запросов в шаблонах.
 * Рендерит внутренние компоненты/разметку исходя из соответствия условиям запроса.
 * Для `query` используется window.matchMedia с полифиллом для IE9.
 * Можно использовать кастомные запросы из `src/mq/mq.json`, например `--small`.
 * Пока браузеры не поддерживают CSS4 Media Queries, поддержка тач-событий определяется через `touch`.
 */
var Mq = (_class = (_temp2 = _class2 = function (_React$Component) {
    _inherits(Mq, _React$Component);

    function Mq() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Mq);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mq.__proto__ || Object.getPrototypeOf(Mq)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isMatched: false
        }, _this.mql = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Mq, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.mql = getMatchMedia(this.props.query);
            this.mql.addListener(this.handleMatch);
            this.handleMatch(this.mql);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            releaseMatchMedia(this.props.query);
            this.mql.removeListener(this.handleMatch);
            this.mql = null;
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.props.children || !IS_BROWSER || !this.state.isMatched) return false;

            return this.props.children;
        }

        /**
         * @param {Object} [mql] MediaQueryList или MediaQueryListEvent
         */

    }, {
        key: 'handleMatch',
        value: function handleMatch(mql) {
            var _this2 = this;

            var queryPass = true;
            var touchPass = true;

            if (this.props.query) {
                queryPass = mql.matches;
            }
            if (this.props.touch) {
                touchPass = SUPPORTS_TOUCH;
            } else if (this.props.touch === false) {
                touchPass = !SUPPORTS_TOUCH;
            }

            this.setState({
                isMatched: queryPass && touchPass
            }, function () {
                if (_this2.props.onMatchChange) {
                    _this2.props.onMatchChange(_this2.state.isMatched);
                }
            });
        }
    }]);

    return Mq;
}(_react2.default.Component), _class2.propTypes = {
    /** Медиа запрос */
    query: _propTypes2.default.string,
    /** Запрос на поддержку тач-событий */
    touch: _propTypes2.default.bool,
    /** Дочерние элементы `Mq` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Обработчик изменений в совпадении запросов */
    onMatchChange: _propTypes2.default.func
}, _temp2), (_applyDecoratedDescriptor(_class.prototype, 'handleMatch', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'handleMatch'), _class.prototype)), _class);
exports.default = Mq;
//# sourceMappingURL=mq.js.map
