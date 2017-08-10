'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp2; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _renderInContainer = require('../render-in-container/render-in-container');

var _renderInContainer2 = _interopRequireDefault(_renderInContainer);

var _resizeSensor = require('../resize-sensor/resize-sensor');

var _resizeSensor2 = _interopRequireDefault(_resizeSensor);

var _calcDrawingParams = require('./calc-drawing-params');

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

var _scrollbarWidth = require('../lib/scrollbar-width');

var _scrollbarWidth2 = _interopRequireDefault(_scrollbarWidth);

var _propTypes3 = require('../lib/prop-types');

var _window = require('../lib/window');

var _performance = require('../performance');

var _performance2 = _interopRequireDefault(_performance);

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

/**
 * @typedef {Object} Point
 * @property {Number} left Координата по оси x
 * @property {Number} top Координата по оси y
 */

/**
 * @typedef {Object} PopupOffsetCollection
 * @property {Number} main Смещение в пикселях всплывающего окна относительно основного направления
 * @property {Number} second Смещение в пикселях всплывающего окна относительно второстепенного направления
 * @property {Number} viewport Минимально допустимое смещение в пикселях всплывающего окна от края окна браузера
 */

/**
 * @typedef {Object} PopupHash
 * @property {Array.<String>} directions Список возмножных расположений попапа
 * @property {String} bestDirection Приоритетное расположение
 * @property {Boolean} isHeightAdaptive Подстраивается ли высота попапа под край окна
 * @property {Boolean} isHeightAvailable Занимает ли попап всю возможную высоту
 * @property {Boolean} isTargetAnchor Привязал ли попап к другому элементу
 * @property {Boolean} isHaveTooltip Имеет ли попап тип "tooltip"
 * @property {Number} width Ширина попапа
 * @property {Number} height Высота попапа
 * @property {Number} contentWidth Ширина контента в попапе
 * @property {Number} contentHeight Высота контента в попапе
 * @property {PopupOffsetCollection} offset Список смещений попапа
 * @property {Point} targetPosition Координаты точки привязки попапа
 * @property {HTMLElement} targetAnchor Объект элемента, к которому привязан попап, в DOM дереве
 */

/**
 * Компонент popup'а.
 */
var Popup = (_dec = (0, _cn2.default)('popup'), _dec2 = (0, _performance2.default)(true), _dec(_class = _dec2(_class = (_class2 = (_temp2 = _class3 = function (_React$Component) {
    _inherits(Popup, _React$Component);

    function Popup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Popup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Popup.__proto__ || Object.getPrototypeOf(Popup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            direction: null,
            hasScrollbar: false,
            hovered: false,
            receivedContainer: false,
            styles: {
                top: 0,
                left: 0,
                height: 'auto'
            },
            gradientStyles: {
                right: 0
            }
        }, _this.anchor = null, _this.clickEventBindTimeout = null, _this.domElemPopup = null, _this.domElemPopupContent = null, _this.isWindowClickBinded = false, _this.position = null, _this.handleResizeWindow = (0, _lodash2.default)(function () {
            if (_this.isPropsToPositionCorrect()) {
                _this.redraw();
            }
        }, 200), _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Popup, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.context.isInCustomContainer && this.context.renderContainerElement && this.context.positioningContainerElement) {
                this.setState({
                    receivedContainer: true
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.autoclosable) {
                this.ensureClickEvent();
            }

            if (this.props.height === 'adaptive' || this.props.target === 'screen') {
                this.setGradientStyles();
            }

            window.addEventListener('resize', this.handleResizeWindow);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            var _this2 = this;

            if (!this.state.receivedContainer && nextContext.renderContainerElement && nextContext.positioningContainerElement) {
                this.setState({
                    receivedContainer: true
                }, function () {
                    if (_this2.props.visible) {
                        _this2.redraw();
                    }
                });

                return;
            }

            if (nextProps.visible !== this.props.visible) {
                this.redraw();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.autoclosable) {
                if (prevProps.onClickOutside !== this.props.onClickOutside) {
                    this.ensureClickEvent();
                } else if (prevProps.visible !== this.props.visible) {
                    this.ensureClickEvent(!this.props.visible);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.autoclosable) {
                this.ensureClickEvent(true);
            }

            window.removeEventListener('resize', this.handleResizeWindow);
        }
    }, {
        key: 'render',
        value: function render(cn) {
            var _this3 = this;

            if (!this.isContainerReady()) {
                return false;
            }

            return _react2.default.createElement(
                _renderInContainer2.default,
                { container: this.getRenderContainer() },
                _react2.default.createElement(
                    'div',
                    {
                        ref: function ref(popup) {
                            _this3.popup = popup;
                        },
                        'data-for': this.props.for,
                        className: cn({
                            direction: this.state.direction,
                            type: this.props.target === 'anchor' && this.props.type === 'tooltip' && this.props.type,
                            target: this.props.target,
                            size: this.props.size,
                            visible: this.props.visible,
                            height: this.props.height,
                            hovered: this.state.hovered,
                            autoclosable: this.props.autoclosable,
                            padded: this.props.padded
                        }),
                        style: _extends({}, this.state.styles, {
                            minWidth: this.getMinWidth(),
                            maxWidth: this.getMaxWidth()
                        }),
                        onMouseEnter: this.handleMouseEnter,
                        onMouseLeave: this.handleMouseLeave
                    },
                    _react2.default.createElement(
                        'div',
                        { className: cn('container') },
                        this.props.header && _react2.default.createElement(
                            'div',
                            { className: cn('header') },
                            this.props.header
                        ),
                        _react2.default.createElement(
                            'div',
                            {
                                ref: function ref(inner) {
                                    _this3.inner = inner;
                                },
                                className: cn('inner'),
                                onScroll: this.handleInnerScroll
                            },
                            _react2.default.createElement(
                                'div',
                                { className: cn('content'), ref: function ref(content) {
                                        _this3.content = content;
                                    } },
                                this.props.children,
                                _react2.default.createElement(_resizeSensor2.default, { onResize: this.handleResize })
                            )
                        ),
                        this.state.hasScrollbar && _react2.default.createElement('div', { className: cn('gradient'), style: this.state.gradientStyles })
                    )
                )
            );
        }
    }, {
        key: 'handleInnerScroll',
        value: function handleInnerScroll(event) {
            var _event$target = event.target,
                scrollTop = _event$target.scrollTop,
                offsetHeight = _event$target.offsetHeight,
                scrollHeight = _event$target.scrollHeight;

            var isBottomReached = Math.round(scrollTop) + offsetHeight === scrollHeight;

            if (this.props.height === 'adaptive' || this.props.target === 'screen') {
                var gradientStyles = {
                    right: this.state.gradientStyles.right
                };

                if (isBottomReached) {
                    gradientStyles.height = 0;
                }

                this.setState({
                    gradientStyles: gradientStyles
                });
            }
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter() {
            this.setState({ hovered: true });

            if (this.props.onMouseEnter) {
                this.props.onMouseEnter();
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            this.setState({ hovered: false });

            if (this.props.onMouseLeave) {
                this.props.onMouseLeave();
            }
        }
    }, {
        key: 'handleWindowClick',
        value: function handleWindowClick(event) {
            if (this.props.autoclosable && !!this.domElemPopup && (0, _window.isNodeOutsideElement)(event.target, this.domElemPopup)) {
                if (this.props.onClickOutside) {
                    this.props.onClickOutside(event);
                }
            }
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            if (!this.props.visible) {
                return;
            }

            this.redraw();
        }

        /**
         * Задает элемент, к которому будет привязан popup.
         *
         * @public
         * @param {HTMLElement} target Элемент, к которому будет привязан popup
         */

    }, {
        key: 'setTarget',
        value: function setTarget(target) {
            if (this.anchor === target) {
                return;
            }

            this.anchor = target;
            this.redraw();
        }

        /**
         * Задает положение popup.
         *
         * @public
         * @param {Number} left x-coordinate
         * @param {Number} top y-coordinate
         */

    }, {
        key: 'setPosition',
        value: function setPosition(left, top) {
            this.position = { left: left, top: top };
            this.redraw();
        }

        /**
         * Возвращает внутренний DOM узел.
         *
         * @public
         * @returns {HTMLElement}
         */

    }, {
        key: 'getInnerNode',
        value: function getInnerNode() {
            return this.inner;
        }

        /**
         * Возвращает контейнер, в котором отрендерится попап.
         *
         * @returns {HTMLElement}
         */

    }, {
        key: 'getRenderContainer',
        value: function getRenderContainer() {
            if (!this.context.isInCustomContainer) {
                return null;
            }

            return this.context.renderContainerElement;
        }

        /**
         * Возвращает контейнер, внутрь которого надо вписать элемент.
         *
         * @returns {HTMLElement}
         */

    }, {
        key: 'getPositioningContainer',
        value: function getPositioningContainer() {
            if (!this.context.isInCustomContainer) {
                return null;
            }

            return this.context.positioningContainerElement;
        }

        /**
         * Возвращает `true`, если контейнер, в котором должен быть отрисован
         * `Popup` уже находится в DOM. Для `Popup` без кастомного контейнера
         * роль контейнера выполняет `document.body` и этот для них этот метод
         * всегда вернете `true`.
         *
         * @returns {Boolean}
         */

    }, {
        key: 'isContainerReady',
        value: function isContainerReady() {
            if (!this.context.isInCustomContainer) {
                return true;
            }

            return this.context.isInCustomContainer && this.state.receivedContainer;
        }

        /**
         * Возвращает `true`, если все необходимые для расчета положения `Popup`
         * внешние props заданы.
         *
         * @returns {Boolean}
         */

    }, {
        key: 'isPropsToPositionCorrect',
        value: function isPropsToPositionCorrect() {
            return this.props.target === 'anchor' && this.anchor || this.props.target === 'position' && this.position || this.props.target === 'screen';
        }
    }, {
        key: 'redraw',
        value: function redraw() {
            if (!this.isContainerReady()) {
                return;
            }

            if (!this.isPropsToPositionCorrect()) {
                throw new Error('Cannot show popup without target or position');
            }

            if (!this.domElemPopup) {
                this.domElemPopup = this.popup;
                this.domElemPopupContent = this.content;
            }

            var popupHash = this.getPopupHash();
            var bestDrawingParams = void 0;

            switch (this.props.target) {
                case 'position':
                    bestDrawingParams = { top: this.position.top, left: this.position.left };
                    break;

                case 'screen':
                    bestDrawingParams = {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        overflow: this.inner.scrollHeight > this.inner.clientHeight
                    };
                    break;

                case 'anchor':
                    bestDrawingParams = (0, _calcDrawingParams.calcBestDrawingParams)(popupHash, (0, _calcDrawingParams.calcTargetDimensions)(popupHash), (0, _calcDrawingParams.calcFitContainerDimensions)(popupHash));
                    break;
            }

            this.setState({
                direction: bestDrawingParams.direction,
                hasScrollbar: bestDrawingParams.overflow,
                styles: this.getDrawingCss(bestDrawingParams)
            });
        }
    }, {
        key: 'ensureClickEvent',
        value: function ensureClickEvent(isDestroy) {
            var _this4 = this;

            var isNeedBindEvent = isDestroy !== undefined ? !isDestroy : this.props.visible;

            // We need timeouts to not to catch the event that causes
            // popup opening (because it propagates to the `window`).
            if (this.clickEventBindTimeout) {
                clearTimeout(this.clickEventBindTimeout);
                this.clickEventBindTimeout = null;
            }

            this.clickEventBindTimeout = setTimeout(function () {
                if (!_this4.isWindowClickBinded && isNeedBindEvent) {
                    window.addEventListener('click', _this4.handleWindowClick);
                    window.addEventListener('touchend', _this4.handleWindowClick);
                    _this4.isWindowClickBinded = true;
                } else if (_this4.isWindowClickBinded && !isNeedBindEvent) {
                    window.removeEventListener('click', _this4.handleWindowClick);
                    window.removeEventListener('touchend', _this4.handleWindowClick);
                    _this4.isWindowClickBinded = false;
                }
            }, 0);
        }
    }, {
        key: 'getDrawingCss',
        value: function getDrawingCss(drawingParams) {
            return {
                top: drawingParams.top,
                left: drawingParams.left,
                right: drawingParams.right,
                bottom: drawingParams.bottom,
                height: this.props.height === 'adaptive' ? drawingParams.height : 'auto'
            };
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'getMinWidth',
        value: function getMinWidth() {
            return this.props.minWidth !== undefined ? this.props.minWidth : 0;
        }

        /**
         * @returns {Number}
         */

    }, {
        key: 'getMaxWidth',
        value: function getMaxWidth() {
            return this.props.maxWidth !== undefined ? this.props.maxWidth : 'none';
        }

        /**
         * Get collection of popup properties.
         *
         * @returns {PopupHash}
         */

    }, {
        key: 'getPopupHash',
        value: function getPopupHash() {
            return {
                directions: this.props.directions,
                bestDirection: this.state.direction,
                isHeightAdaptive: this.props.height === 'adaptive',
                isHeightAvailable: this.props.height === 'available',
                isTargetAnchor: this.props.target === 'anchor',
                isHaveTooltip: this.props.type === 'tooltip',
                width: this.domElemPopup.offsetWidth,
                height: this.domElemPopup.offsetHeight,
                contentWidth: this.domElemPopupContent.offsetWidth,
                contentHeight: this.domElemPopupContent.offsetHeight,
                offset: {
                    main: this.props.mainOffset,
                    second: this.props.secondaryOffset,
                    fitContainer: this.props.fitContaiterOffset
                },
                targetPosition: this.position,
                targetAnchor: this.anchor,
                fitContainer: this.getPositioningContainer()
            };
        }
    }, {
        key: 'setGradientStyles',
        value: function setGradientStyles() {
            this.setState({
                gradientStyles: {
                    right: (0, _scrollbarWidth2.default)()
                }
            });
        }
    }]);

    return Popup;
}(_react2.default.Component), _class3.propTypes = {
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Дочерние элементы `Popup` */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тип попапа */
    type: _propTypes2.default.oneOf(['default', 'tooltip']),
    /** Подстраивание высоты попапа под край окна ('adaptive'), занятие попапом всей возможной высоты ('available'), 'default' */
    height: _propTypes2.default.oneOf(['default', 'available', 'adaptive']),
    /** Только для target='anchor', расположение (в порядке приоритета) относительно точки открытия. Первым указывается главное направление, через дефис - второстепенное направление */
    directions: _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'])),
    /** Привязка компонента к другому элементу на странице, или его расположение независимо от остальных: 'anchor', 'position', 'screen' */
    target: _propTypes2.default.oneOf(['anchor', 'position', 'screen']),
    /** Только для target='anchor'. Смещение в пикселях всплывающего окна относительно основного направления */
    mainOffset: _propTypes2.default.number,
    /** Только для target='anchor'. Смещение в пикселях всплывающего окна относительно второстепенного направления */
    secondaryOffset: _propTypes2.default.number,
    /** Только для target='anchor'. Минимально допустимое смещение в пикселях всплывающего окна от края его контейнера */
    fitContaiterOffset: _propTypes2.default.number,
    /** Управление видимостью компонента */
    visible: _propTypes2.default.bool,
    /** Управление возможностью автозакрытия компонента */
    autoclosable: _propTypes2.default.bool,
    /** Управление выставлением модификатора для добавления внутренних отступов в стилях */
    padded: _propTypes2.default.bool,
    /** Элемент закреплённого заголовка для компонента */
    header: _propTypes2.default.node,
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Обработчик события наведения курсора на попап */
    onMouseEnter: _propTypes2.default.func,
    /** Обработчик события снятия курсора с попапа */
    onMouseLeave: _propTypes2.default.func,
    /** Обработчик клика вне компонента */
    onClickOutside: _propTypes2.default.func,
    /** Минимальная ширина попапа */
    minWidth: _propTypes2.default.number,
    /** Максимальная ширина попапа */
    maxWidth: _propTypes2.default.number,
    /** Указатель на родительский элемент */
    for: _propTypes2.default.string
}, _class3.defaultProps = {
    visible: false,
    autoclosable: false,
    padded: true,
    secondaryOffset: 0,
    fitContaiterOffset: 0,
    target: 'anchor',
    size: 's'
}, _class3.contextTypes = {
    isInCustomContainer: _propTypes2.default.bool,
    renderContainerElement: _propTypes3.HtmlElement,
    positioningContainerElement: _propTypes3.HtmlElement
}, _temp2), (_applyDecoratedDescriptor(_class2.prototype, 'handleInnerScroll', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleInnerScroll'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseEnter', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseEnter'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleMouseLeave', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleMouseLeave'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleWindowClick', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleWindowClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'handleResize', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleResize'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'redraw', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'redraw'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Popup;
//# sourceMappingURL=popup.js.map
