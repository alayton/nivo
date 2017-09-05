'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _withState = require('recompose/withState')

var _withState2 = _interopRequireDefault(_withState)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _withHandlers = require('recompose/withHandlers')

var _withHandlers2 = _interopRequireDefault(_withHandlers)

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
var SankeyNodesItem = function SankeyNodesItem(_ref) {
    var node = _ref.node,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        color = _ref.color,
        opacity = _ref.opacity,
        hoverOpacity = _ref.hoverOpacity,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        isHover = _ref.isHover
    return _react2.default.createElement('rect', {
        x: x,
        y: y,
        width: width,
        height: height,
        fill: color,
        fillOpacity: isHover ? hoverOpacity : opacity,
        strokeWidth: borderWidth,
        stroke: borderColor,
        onMouseEnter: showTooltip,
        onMouseMove: showTooltip,
        onMouseLeave: hideTooltip,
    })
}

SankeyNodesItem.propTypes = {
    node: _propTypes2.default.shape({
        id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
            .isRequired,
        color: _propTypes2.default.string.isRequired,
    }),

    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,

    color: _propTypes2.default.string.isRequired,
    opacity: _propTypes2.default.number.isRequired,
    hoverOpacity: _propTypes2.default.number.isRequired,
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.string.isRequired,

    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,

    theme: _propTypes2.default.object.isRequired,
}

var enhance = (0, _compose2.default)(
    (0, _withState2.default)('isHover', 'setIsHover', false),
    (0, _withPropsOnChange2.default)(['node', 'theme'], function(_ref2) {
        var node = _ref2.node,
            theme = _ref2.theme
        return {
            tooltip: _react2.default.createElement(_BasicTooltip2.default, {
                id: node.id,
                enableChip: true,
                color: node.color,
                theme: theme,
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

exports.default = enhance(SankeyNodesItem)
