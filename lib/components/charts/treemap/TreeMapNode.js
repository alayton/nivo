'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

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
var TreeMapNode = function TreeMapNode(_ref) {
    var x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        color = _ref.color,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        hasLabel = _ref.hasLabel,
        label = _ref.label,
        labelRotation = _ref.labelRotation,
        labelTextColor = _ref.labelTextColor,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip
    return _react2.default.createElement(
        'g',
        { transform: 'translate(' + x + ',' + y + ')' },
        _react2.default.createElement('rect', {
            width: width,
            height: height,
            fill: color,
            strokeWidth: borderWidth,
            stroke: borderColor,
            onMouseEnter: showTooltip,
            onMouseMove: showTooltip,
            onMouseLeave: hideTooltip,
        }),
        hasLabel &&
            _react2.default.createElement(
                'text',
                {
                    textAnchor: 'middle',
                    alignmentBaseline: 'central',
                    style: { fill: labelTextColor, pointerEvents: 'none' },
                    transform:
                        'translate(' +
                        width / 2 +
                        ',' +
                        height / 2 +
                        ') rotate(' +
                        labelRotation +
                        ')',
                },
                label
            )
    )
}

TreeMapNode.propTypes = {
    id: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.number.isRequired,
    dataColor: _propTypes2.default.string.isRequired,

    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    color: _propTypes2.default.string.isRequired,

    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.string.isRequired,

    hasLabel: _propTypes2.default.bool.isRequired,
    label: _propTypes2.default.node,
    orientLabel: _propTypes2.default.bool.isRequired,
    labelRotation: _propTypes2.default.number.isRequired, // computed
    labelTextColor: _propTypes2.default.string.isRequired,

    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,

    theme: _propTypes2.default.object.isRequired,
}

var enhance = (0, _compose2.default)(
    (0, _withPropsOnChange2.default)(['orientLabel', 'width', 'height'], function(_ref2) {
        var orientLabel = _ref2.orientLabel,
            width = _ref2.width,
            height = _ref2.height
        return {
            labelRotation: orientLabel && height > width ? -90 : 0,
        }
    }),
    (0, _withPropsOnChange2.default)(['id', 'value', 'dataColor', 'showTooltip', 'theme'], function(
        _ref3
    ) {
        var id = _ref3.id,
            value = _ref3.value,
            dataColor = _ref3.dataColor,
            _showTooltip = _ref3.showTooltip,
            theme = _ref3.theme

        var tooltip = _react2.default.createElement(_BasicTooltip2.default, {
            id: id,
            value: value,
            enableChip: true,
            color: dataColor,
            theme: theme,
        })

        return {
            showTooltip: function showTooltip(e) {
                return _showTooltip(tooltip, e)
            },
        }
    }),
    _pure2.default
)

exports.default = enhance(TreeMapNode)
