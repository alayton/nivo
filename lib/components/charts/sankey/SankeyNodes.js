'use strict'

exports.__esModule = true

var _extends =
    Object.assign ||
    function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i]
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    } /*
                                                                                                                                                                                                                                                                   * This file is part of the nivo project.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                   * file that was distributed with this source code.
                                                                                                                                                                                                                                                                   */

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _reactMotion = require('react-motion')

var _colors = require('../../../lib/colors')

var _props = require('../../../props')

var _SankeyNodesItem = require('./SankeyNodesItem')

var _SankeyNodesItem2 = _interopRequireDefault(_SankeyNodesItem)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var SankeyNodes = function SankeyNodes(_ref) {
    var nodes = _ref.nodes,
        nodePaddingX = _ref.nodePaddingX,
        nodeOpacity = _ref.nodeOpacity,
        nodeHoverOpacity = _ref.nodeHoverOpacity,
        nodeBorderWidth = _ref.nodeBorderWidth,
        getNodeBorderColor = _ref.getNodeBorderColor,
        animate = _ref.animate,
        motionDamping = _ref.motionDamping,
        motionStiffness = _ref.motionStiffness,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        theme = _ref.theme

    if (!animate) {
        return _react2.default.createElement(
            'g',
            null,
            nodes.map(function(node) {
                return _react2.default.createElement(_SankeyNodesItem2.default, {
                    key: node.id,
                    node: node,
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    color: node.color,
                    opacity: nodeOpacity,
                    hoverOpacity: nodeHoverOpacity,
                    borderWidth: nodeBorderWidth,
                    borderColor: getNodeBorderColor(node),
                    showTooltip: showTooltip,
                    hideTooltip: hideTooltip,
                    theme: theme,
                })
            })
        )
    }

    var springProps = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    return _react2.default.createElement(
        _reactMotion.TransitionMotion,
        {
            styles: nodes.map(function(node) {
                return {
                    key: node.id,
                    data: node,
                    style: _extends(
                        {
                            x: (0, _reactMotion.spring)(node.x, springProps),
                            y: (0, _reactMotion.spring)(node.y, springProps),
                            width: (0, _reactMotion.spring)(node.width, springProps),
                            height: (0, _reactMotion.spring)(node.height, springProps),
                        },
                        (0, _colors.colorMotionSpring)(node.color, springProps)
                    ),
                }
            }),
        },
        function(interpolatedStyles) {
            return _react2.default.createElement(
                'g',
                null,
                interpolatedStyles.map(function(_ref2) {
                    var key = _ref2.key,
                        style = _ref2.style,
                        node = _ref2.data

                    var color = (0, _colors.getInterpolatedColor)(style)

                    return _react2.default.createElement(_SankeyNodesItem2.default, {
                        key: key,
                        node: node,
                        x: style.x,
                        y: style.y,
                        width: Math.max(style.width, 0),
                        height: Math.max(style.height, 0),
                        color: color,
                        opacity: nodeOpacity,
                        hoverOpacity: nodeHoverOpacity,
                        borderWidth: nodeBorderWidth,
                        borderColor: getNodeBorderColor(_extends({}, node, { color: color })),
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        theme: theme,
                    })
                })
            )
        }
    )
}

SankeyNodes.propTypes = _extends(
    {
        nodes: _propTypes2.default.arrayOf(
            _propTypes2.default.shape({
                id: _propTypes2.default.oneOfType([
                    _propTypes2.default.string,
                    _propTypes2.default.number,
                ]).isRequired,
                x: _propTypes2.default.number.isRequired,
                y: _propTypes2.default.number.isRequired,
                width: _propTypes2.default.number.isRequired,
                height: _propTypes2.default.number.isRequired,
                color: _propTypes2.default.string.isRequired,
            })
        ).isRequired,

        nodePaddingX: _propTypes2.default.number.isRequired,
        nodeOpacity: _propTypes2.default.number.isRequired,
        nodeHoverOpacity: _propTypes2.default.number.isRequired,
        nodeBorderWidth: _propTypes2.default.number.isRequired,
        getNodeBorderColor: _propTypes2.default.func.isRequired,

        theme: _propTypes2.default.object.isRequired,
    },
    _props.motionPropTypes,
    {
        showTooltip: _propTypes2.default.func.isRequired,
        hideTooltip: _propTypes2.default.func.isRequired,
    }
)

exports.default = (0, _pure2.default)(SankeyNodes)
