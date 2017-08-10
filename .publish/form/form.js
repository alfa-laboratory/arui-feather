'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _class3, _temp; /* This Source Code Form is subject to the terms of the Mozilla Public
                                                                  * License, v. 2.0. If a copy of the MPL was not distributed with this
                                                                  * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _coreDecorators = require('core-decorators');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

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
 * Компонент формы.
 */
var Form = (_dec = (0, _cn2.default)('form'), _dec2 = (0, _performance2.default)(), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form() {
        _classCallCheck(this, Form);

        return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
    }

    _createClass(Form, [{
        key: 'render',
        value: function render(cn) {
            return _react2.default.createElement(
                'form',
                {
                    action: this.props.action,
                    encType: this.props.enctype,
                    method: this.props.method,
                    noValidate: this.props.noValidate,
                    autoComplete: this.props.autocomplete === false ? 'off' : 'on',
                    className: cn({
                        size: this.props.size,
                        view: this.props.view
                    }),
                    id: this.props.id,
                    name: this.props.name,
                    onSubmit: this.handleSubmit
                },
                this.props.children,
                this.props.footer && _react2.default.createElement(
                    'div',
                    { className: cn('footer') },
                    this.props.footer
                )
            );
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();

            if (this.props.onSubmit) {
                this.props.onSubmit(event);
            }
        }
    }]);

    return Form;
}(_react2.default.Component), _class3.propTypes = {
    /** Способ кодирования данных формы при их отправке */
    enctype: _propTypes2.default.oneOf(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']),
    /** Адрес отправки данных на сервер */
    action: _propTypes2.default.string,
    /** Метод запроса */
    method: _propTypes2.default.oneOf(['post', 'get']),
    /** Тип формы */
    view: _propTypes2.default.oneOf(['line', 'normal']),
    /** Размер компонента */
    size: _propTypes2.default.oneOf(['s', 'm', 'l', 'xl']),
    /** Футер для формы */
    footer: _propTypes2.default.node,
    /** Управление встроенным в браузер механизмом валидации формы */
    noValidate: _propTypes2.default.bool,
    /** Управление автозаполнением формы */
    autocomplete: _propTypes2.default.bool,
    /** Дочерние элементы формы */
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    /** Тема компонента */
    theme: _propTypes2.default.oneOf(['alfa-on-color', 'alfa-on-white']),
    /** Дополнительный класс */
    className: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    /** Идентификатор компонента в DOM */
    id: _propTypes2.default.string,
    /** Имя компонента в DOM */
    name: _propTypes2.default.string,
    /** Обработчик отправки формы */
    onSubmit: _propTypes2.default.func
}, _class3.defaultProps = {
    action: '/',
    enctype: 'application/x-www-form-urlencoded',
    method: 'post',
    size: 'm',
    noValidate: false,
    autocomplete: true
}, _temp), (_applyDecoratedDescriptor(_class2.prototype, 'handleSubmit', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class2.prototype, 'handleSubmit'), _class2.prototype)), _class2)) || _class) || _class);
exports.default = Form;
//# sourceMappingURL=form.js.map
