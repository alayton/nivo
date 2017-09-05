'use strict'

exports.__esModule = true

var _omit2 = require('lodash/omit')

var _omit3 = _interopRequireDefault(_omit2)

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

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _colors = require('../../../lib/colors')

var _BubbleProps = require('./BubbleProps')

var _BubblePlaceholders = require('./BubblePlaceholders')

var _BubblePlaceholders2 = _interopRequireDefault(_BubblePlaceholders)

var _BasicTooltip = require('../../tooltip/BasicTooltip')

var _BasicTooltip2 = _interopRequireDefault(_BasicTooltip)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var createNodes = function createNodes(_ref) {
    var borderWidth = _ref.borderWidth,
        getBorderColor = _ref.getBorderColor,
        enableLabel = _ref.enableLabel,
        getLabel = _ref.getLabel,
        labelSkipRadius = _ref.labelSkipRadius,
        getLabelTextColor = _ref.getLabelTextColor
    return function(nodes, _ref2) {
        var showTooltip = _ref2.showTooltip,
            hideTooltip = _ref2.hideTooltip,
            theme = _ref2.theme

        var renderedNodes = []

        nodes
            .filter(function(node) {
                return node.style.r > 0
            })
            .forEach(function(node) {
                var handleTooltip = function handleTooltip(e) {
                    showTooltip(
                        _react2.default.createElement(_BasicTooltip2.default, {
                            id: node.data.id,
                            value: node.data.value,
                            enableChip: true,
                            color: node.style.color,
                            theme: theme,
                        }),
                        e
                    )
                }

                renderedNodes.push(
                    _react2.default.createElement('circle', {
                        key: node.key + '.circle',
                        r: node.style.r,
                        transform: 'translate(' + node.style.x + ',' + node.style.y + ')',
                        onMouseEnter: handleTooltip,
                        onMouseMove: handleTooltip,
                        onMouseLeave: hideTooltip,
                        onClick: node.zoom,
                        style: {
                            fill: node.style.color,
                            stroke: getBorderColor(node.style),
                            strokeWidth: borderWidth,
                        },
                    })
                )
            })

        if (enableLabel === true) {
            nodes
                .filter(function(node) {
                    return (
                        node.data.height === 0 &&
                        (labelSkipRadius === 0 || node.data.r >= labelSkipRadius)
                    )
                })
                .forEach(function(node) {
                    renderedNodes.push(
                        _react2.default.createElement(
                            'text',
                            {
                                key: node.key + '.text',
                                transform: 'translate(' + node.style.x + ',' + node.style.y + ')',
                                textAnchor: 'middle',
                                alignmentBaseline: 'central',
                                style: {
                                    fill: getLabelTextColor(node.style),
                                    pointerEvents: 'none',
                                },
                            },
                            getLabel(_extends({}, node.data.data, node.data))
                        )
                    )
                })
        }

        return renderedNodes
    }
}

var Bubble = function Bubble(props) {
    return _react2.default.createElement(
        _BubblePlaceholders2.default,
        _extends({}, props, { namespace: 'svg' }),
        createNodes(props)
    )
}

Bubble.propTypes = (0, _omit3.default)(_BubbleProps.bubblePropTypes, [
    'children',
    'namespace',
    'transitionDuration',
    'transitionEasing',
])

var enhance = (0, _compose2.default)(
    (0, _defaultProps2.default)(
        (0, _omit3.default)(_BubbleProps.bubbleDefaultProps, [
            'namespace',
            'transitionDuration',
            'transitionEasing',
        ])
    ),
    (0, _withPropsOnChange2.default)(['label', 'labelFormat'], function(_ref3) {
        var label = _ref3.label,
            labelFormat = _ref3.labelFormat
        return {
            getLabel: (0, _propertiesConverters.getLabelGenerator)(label, labelFormat),
        }
    }),
    (0, _withPropsOnChange2.default)(['borderColor'], function(_ref4) {
        var borderColor = _ref4.borderColor
        return {
            getBorderColor: (0, _colors.getInheritedColorGenerator)(borderColor),
        }
    }),
    (0, _withPropsOnChange2.default)(['labelTextColor'], function(_ref5) {
        var labelTextColor = _ref5.labelTextColor
        return {
            getLabelTextColor: (0, _colors.getInheritedColorGenerator)(labelTextColor),
        }
    }),
    _pure2.default
)

var enhancedBubble = enhance(Bubble)
enhancedBubble.displayName = 'enhance(Bubble)'

exports.default = enhancedBubble
