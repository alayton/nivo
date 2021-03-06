'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _withState = require('recompose/withState')

var _withState2 = _interopRequireDefault(_withState)

var _withHandlers = require('recompose/withHandlers')

var _withHandlers2 = _interopRequireDefault(_withHandlers)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _TableTooltip = require('../../tooltip/TableTooltip')

var _TableTooltip2 = _interopRequireDefault(_TableTooltip)

var _Chip = require('../../tooltip/Chip')

var _Chip2 = _interopRequireDefault(_Chip)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var StreamSlicesItem = function StreamSlicesItem(_ref) {
    var slice = _ref.slice,
        height = _ref.height,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        isHover = _ref.isHover
    return _react2.default.createElement(
        'g',
        { transform: 'translate(' + slice.x + ', 0)' },
        isHover &&
            _react2.default.createElement('line', {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: height,
                stroke: '#000',
                strokeOpacity: 0.35,
                strokeWidth: 1,
            }),
        _react2.default.createElement('rect', {
            x: -20,
            width: 40,
            height: height,
            fill: '#000',
            fillOpacity: 0,
            onMouseEnter: showTooltip,
            onMouseMove: showTooltip,
            onMouseLeave: hideTooltip,
        })
    )
} /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */

StreamSlicesItem.propTypes = {
    slice: _propTypes2.default.object.isRequired,
    height: _propTypes2.default.number.isRequired,
    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,
    isHover: _propTypes2.default.bool.isRequired,
    theme: _propTypes2.default.object.isRequired,
}

var enhance = (0, _compose2.default)(
    (0, _withState2.default)('isHover', 'setIsHover', false),
    (0, _withPropsOnChange2.default)(['slice', 'theme'], function(_ref2) {
        var slice = _ref2.slice,
            theme = _ref2.theme
        return {
            tooltip: _react2.default.createElement(_TableTooltip2.default, {
                theme: theme,
                rows: slice.stack.map(function(p) {
                    return [
                        _react2.default.createElement(_Chip2.default, { color: p.color }),
                        p.id,
                        p.value,
                    ]
                }),
            }),
        }
    }),
    (0, _withHandlers2.default)({
        showTooltip: function showTooltip(_ref3) {
            var _showTooltip = _ref3.showTooltip,
                setIsHover = _ref3.setIsHover,
                tooltip = _ref3.tooltip
            return function(e) {
                setIsHover(true)
                _showTooltip(tooltip, e)
            }
        },
        hideTooltip: function hideTooltip(_ref4) {
            var _hideTooltip = _ref4.hideTooltip,
                setIsHover = _ref4.setIsHover
            return function() {
                setIsHover(false)
                _hideTooltip()
            }
        },
    }),
    _pure2.default
)

exports.default = enhance(StreamSlicesItem)
