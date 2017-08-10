'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp; /* This Source Code Form is subject to the terms of the Mozilla Public
                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _appContent = require('../app-content/app-content');

var _appContent2 = _interopRequireDefault(_appContent);

var _appTitle = require('../app-title/app-title');

var _appTitle2 = _interopRequireDefault(_appTitle);

var _heading = require('../heading/heading');

var _heading2 = _interopRequireDefault(_heading);

var _link = require('../link/link');

var _link2 = _interopRequireDefault(_link);

var _page = require('../page/page');

var _page2 = _interopRequireDefault(_page);

var _cn = require('../cn');

var _cn2 = _interopRequireDefault(_cn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Компонент страницы ошибки.
 * Как правило является корневым компонентом страницы.
 * Используется вместо компонента Page.
 *
 * ```javascript
 * import ErrorPage from 'arui-feather/error-page';
 * import Header from 'arui-feather/header';
 *
 * <ErrorPage
 *      returnUrl='/login'
 *      header={ <Header /> }
 * />
 * ```
 */
var ErrorPage = (_dec = (0, _cn2.default)('error-page'), _dec(_class = (_temp = _class2 = function (_React$Component) {
    _inherits(ErrorPage, _React$Component);

    function ErrorPage() {
        _classCallCheck(this, ErrorPage);

        return _possibleConstructorReturn(this, (ErrorPage.__proto__ || Object.getPrototypeOf(ErrorPage)).apply(this, arguments));
    }

    _createClass(ErrorPage, [{
        key: 'render',
        value: function render(cn) {
            return _react2.default.createElement(
                _page2.default,
                {
                    header: this.props.header,
                    className: cn
                },
                _react2.default.createElement(
                    _appTitle2.default,
                    null,
                    _react2.default.createElement(
                        _heading2.default,
                        null,
                        this.props.title
                    )
                ),
                _react2.default.createElement(
                    _appContent2.default,
                    null,
                    _react2.default.createElement(
                        _heading2.default,
                        { size: 'm' },
                        this.props.text
                    ),
                    this.props.returnUrl && _react2.default.createElement(_link2.default, {
                        className: cn('return-link'),
                        size: 'l',
                        text: this.props.returnTitle,
                        url: this.props.returnUrl
                    })
                )
            );
        }
    }]);

    return ErrorPage;
}(_react2.default.Component), _class2.propTypes = {
    /** Заголовок ошибки */
    title: _propTypes2.default.string,
    /** Сообщение ошибки */
    text: _propTypes2.default.string,
    /** Шапка страницы */
    header: _propTypes2.default.node,
    /** href для ссылки 'Вернуться в интернет-банк' */
    returnUrl: _propTypes2.default.string,
    /** Альтернативный текст для ссылки 'Вернуться в интернет-банк' */
    returnTitle: _propTypes2.default.string
}, _class2.defaultProps = {
    title: 'Произошла ошибка',
    text: 'Пожалуйста, повторите операцию через некоторое время.',
    returnTitle: 'Вернуться в интернет-банк'
}, _temp)) || _class);
exports.default = ErrorPage;
//# sourceMappingURL=error-page.js.map
