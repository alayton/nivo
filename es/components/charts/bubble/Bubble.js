import _omit from 'lodash/omit'

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
    }

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps'
import BubblePlaceholders from './BubblePlaceholders'
import BasicTooltip from '../../tooltip/BasicTooltip'

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
                        React.createElement(BasicTooltip, {
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
                    React.createElement('circle', {
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
                        React.createElement(
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
    return React.createElement(
        BubblePlaceholders,
        _extends({}, props, { namespace: 'svg' }),
        createNodes(props)
    )
}

Bubble.propTypes = _omit(bubblePropTypes, [
    'children',
    'namespace',
    'transitionDuration',
    'transitionEasing',
])

var enhance = compose(
    defaultProps(
        _omit(bubbleDefaultProps, ['namespace', 'transitionDuration', 'transitionEasing'])
    ),
    withPropsOnChange(['label', 'labelFormat'], function(_ref3) {
        var label = _ref3.label,
            labelFormat = _ref3.labelFormat
        return {
            getLabel: getLabelGenerator(label, labelFormat),
        }
    }),
    withPropsOnChange(['borderColor'], function(_ref4) {
        var borderColor = _ref4.borderColor
        return {
            getBorderColor: getInheritedColorGenerator(borderColor),
        }
    }),
    withPropsOnChange(['labelTextColor'], function(_ref5) {
        var labelTextColor = _ref5.labelTextColor
        return {
            getLabelTextColor: getInheritedColorGenerator(labelTextColor),
        }
    }),
    pure
)

var enhancedBubble = enhance(Bubble)
enhancedBubble.displayName = 'enhance(Bubble)'

export default enhancedBubble
