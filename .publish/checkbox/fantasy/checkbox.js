'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _class; /* This Source Code Form is subject to the terms of the Mozilla Public
                   * License, v. 2.0. If a copy of the MPL was not distributed with this
                   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _tagButton = require('../../tag-button/fantasy/tag-button');

var _tagButton2 = _interopRequireDefault(_tagButton);

var _cn = require('../../cn');

var _cn2 = _interopRequireDefault(_cn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Компонент чекбокса в обновлённом дизайне.
 *
 * @extends CheckBox
 */
var CheckBox = (_dec = (0, _cn2.default)('checkbox', _tagButton2.default), _dec(_class = function (_OriginalCheckBox) {
  _inherits(CheckBox, _OriginalCheckBox);

  function CheckBox() {
    _classCallCheck(this, CheckBox);

    return _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).apply(this, arguments));
  }

  return CheckBox;
}(_checkbox2.default)) || _class);
exports.default = CheckBox;
//# sourceMappingURL=checkbox.js.map
