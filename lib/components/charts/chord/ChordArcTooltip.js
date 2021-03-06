'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _BasicTooltip = require('../../tooltip/BasicTooltip')

var _BasicTooltip2 = _interopRequireDefault(_BasicTooltip)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var ChordArcTooltip = function ChordArcTooltip(_ref) {
    var arc = _ref.arc,
        theme = _ref.theme
    return _react2.default.createElement(_BasicTooltip2.default, {
        id: arc.id,
        value: arc.value,
        color: arc.color,
        enableChip: true,
        theme: theme,
    })
}

ChordArcTooltip.propTypes = {
    arc: _propTypes2.default.object.isRequired,
    theme: _propTypes2.default.object.isRequired,
}

exports.default = (0, _pure2.default)(ChordArcTooltip)
