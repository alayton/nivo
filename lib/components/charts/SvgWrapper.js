'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var SvgWrapper = function SvgWrapper(_ref) {
    var width = _ref.width,
        height = _ref.height,
        margin = _ref.margin,
        children = _ref.children
    return _react2.default.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', width: width, height: height },
        _react2.default.createElement(
            'g',
            { transform: 'translate(' + margin.left + ',' + margin.top + ')' },
            children
        )
    )
} /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */
exports.default = SvgWrapper
