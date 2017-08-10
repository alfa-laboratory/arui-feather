'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _dec, _class, _class2, _temp; /* This Source Code Form is subject to the terms of the Mozilla Public
                                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _link = require('../../link/link');

var _link2 = _interopRequireDefault(_link);

var _cn = require('../../cn');

var _cn2 = _interopRequireDefault(_cn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Компонент таба. Как правило, используется совместно с `Tabs`.
 * @extends Link
 */
var TabItem = (_dec = (0, _cn2.default)('tab-item'), _dec(_class = (_temp = _class2 = function (_Link) {
    _inherits(TabItem, _Link);

    function TabItem() {
        _classCallCheck(this, TabItem);

        return _possibleConstructorReturn(this, (TabItem.__proto__ || Object.getPrototypeOf(TabItem)).apply(this, arguments));
    }

    return TabItem;
}(_link2.default), _class2.defaultProps = {
    size: 'l',
    disabled: false,
    checked: false,
    pseudo: false,
    tabIndex: 0
}, _temp)) || _class);
exports.default = TabItem;
//# sourceMappingURL=tab-item.js.map
