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
var SunburstArc = function SunburstArc(_ref) {
    var node = _ref.node,
        path = _ref.path,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip
    return _react2.default.createElement('path', {
        d: path,
        fill: node.data.color,
        stroke: borderColor,
        strokeWidth: borderWidth,
        onMouseEnter: showTooltip,
        onMouseMove: showTooltip,
        onMouseLeave: hideTooltip,
    })
}

SunburstArc.propTypes = {
    node: _propTypes2.default.shape({}).isRequired,
    arcGenerator: _propTypes2.default.func.isRequired,
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.string.isRequired,
    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.object.isRequired,
}

var enhance = (0, _compose2.default)(
    (0, _withPropsOnChange2.default)(['node', 'arcGenerator'], function(_ref2) {
        var node = _ref2.node,
            arcGenerator = _ref2.arcGenerator
        return {
            path: arcGenerator(node),
        }
    }),
    (0, _withPropsOnChange2.default)(['node', 'showTooltip', 'theme'], function(_ref3) {
        var node = _ref3.node,
            _showTooltip = _ref3.showTooltip,
            theme = _ref3.theme
        return {
            showTooltip: function showTooltip(e) {
                _showTooltip(
                    _react2.default.createElement(_BasicTooltip2.default, {
                        id: node.data.id,
                        enableChip: true,
                        color: node.data.color,
                        value: node.data.percentage.toFixed(2) + '%',
                        theme: theme,
                    }),
                    e
                )
            },
        }
    }),
    _pure2.default
)

exports.default = enhance(SunburstArc)
