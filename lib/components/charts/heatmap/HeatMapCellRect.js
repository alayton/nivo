'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var style = {
    cursor: 'pointer',
} /*
                                    * This file is part of the nivo project.
                                    *
                                    * Copyright 2016-present, Raphaël Benitte.
                                    *
                                    * For the full copyright and license information, please view the LICENSE
                                    * file that was distributed with this source code.
                                    */

var HeatMapCellRect = function HeatMapCellRect(_ref) {
    var value = _ref.value,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        color = _ref.color,
        opacity = _ref.opacity,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        textColor = _ref.textColor,
        onHover = _ref.onHover,
        onLeave = _ref.onLeave
    return _react2.default.createElement(
        'g',
        {
            transform: 'translate(' + x + ', ' + y + ')',
            onMouseEnter: onHover,
            onMouseMove: onHover,
            onMouseLeave: onLeave,
            style: style,
        },
        _react2.default.createElement('rect', {
            x: width * -0.5,
            y: height * -0.5,
            width: width,
            height: height,
            fill: color,
            fillOpacity: opacity,
            strokeWidth: borderWidth,
            stroke: borderColor,
            strokeOpacity: opacity,
        }),
        _react2.default.createElement(
            'text',
            {
                alignmentBaseline: 'central',
                textAnchor: 'middle',
                style: { fill: textColor },
                fillOpacity: opacity,
            },
            value
        )
    )
}

HeatMapCellRect.propTypes = {
    value: _propTypes2.default.number.isRequired,
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    color: _propTypes2.default.string.isRequired,
    opacity: _propTypes2.default.number.isRequired,
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.string.isRequired,
    textColor: _propTypes2.default.string.isRequired,
    onHover: _propTypes2.default.func.isRequired,
    onLeave: _propTypes2.default.func.isRequired,
}

exports.default = (0, _pure2.default)(HeatMapCellRect)
