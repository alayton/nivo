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
var BarItem = function BarItem(_ref) {
    var data = _ref.data,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        color = _ref.color,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        theme = _ref.theme

    var handleTooltip = function handleTooltip(e) {
        return showTooltip(
            _react2.default.createElement(_BasicTooltip2.default, {
                id: data.id + ' - ' + data.indexValue,
                value: data.value,
                enableChip: true,
                color: color,
                theme: theme,
            }),
            e
        )
    }

    return _react2.default.createElement('rect', {
        className: 'nivo_bar_rect',
        x: x,
        y: y,
        width: width,
        height: height,
        style: {
            fill: color,
        },
        onMouseEnter: handleTooltip,
        onMouseMove: handleTooltip,
        onMouseLeave: hideTooltip,
    })
}

BarItem.propTypes = {
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    color: _propTypes2.default.string.isRequired,
    data: _propTypes2.default.shape({
        id: _propTypes2.default.string.isRequired,
        value: _propTypes2.default.number.isRequired,
        indexValue: _propTypes2.default.string.isRequired,
    }).isRequired,

    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,

    theme: _propTypes2.default.shape({
        tooltip: _propTypes2.default.shape({}).isRequired,
    }).isRequired,
}

exports.default = (0, _pure2.default)(BarItem)
