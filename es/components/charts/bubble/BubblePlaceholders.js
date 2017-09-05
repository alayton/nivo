import _omit from 'lodash/omit'
import _pick from 'lodash/pick'

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

import { TransitionMotion, spring } from 'react-motion'

import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withStateHandlers from 'recompose/withStateHandlers'
import pure from 'recompose/pure'
import { pack } from 'd3-hierarchy'
import { withHierarchy, withTheme, withColors, withDimensions, withMotion } from '../../../hocs'
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import noop from '../../../lib/noop'
import { computeNodePath } from '../../../lib/hierarchy'
import Container from '../Container'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import { bubblePropTypes, bubbleDefaultProps } from './BubbleProps'

var ignoreProps = [
    'borderWidth',
    'borderColor',
    'enableLabel',
    'label',
    'labelFormat',
    'labelTextColor',
    'labelSkipRadius',
    'labelTextDY',
    'transitionDuration',
    'transitionEasing',
]

var nodeWillEnter = function nodeWillEnter(_ref) {
    var node = _ref.data
    return _extends(
        {
            r: 0,
            x: node.x,
            y: node.y,
        },
        colorMotionSpring(node.color)
    )
}

var nodeWillLeave = function nodeWillLeave(styleThatLeft) {
    return {
        r: spring(0),
        x: spring(styleThatLeft.data.x),
        y: spring(styleThatLeft.data.y),
    }
}

var computeZoom = function computeZoom(nodes, currentNodePath, width, height) {
    var currentNode = nodes.find(function(_ref2) {
        var path = _ref2.path
        return path === currentNodePath
    })
    if (currentNode) {
        var ratio = Math.min(width, height) / (currentNode.r * 2)
        var offsetX = width / 2 - currentNode.x * ratio
        var offsetY = height / 2 - currentNode.y * ratio
        nodes.forEach(function(node) {
            node.r = node.r * ratio
            node.x = node.x * ratio + offsetX
            node.y = node.y * ratio + offsetY
        })
    }
}

var BubblePlaceholders = function BubblePlaceholders(_ref3) {
    var root = _ref3.root,
        getIdentity = _ref3.getIdentity,
        leavesOnly = _ref3.leavesOnly,
        namespace = _ref3.namespace,
        pack = _ref3.pack,
        width = _ref3.width,
        height = _ref3.height,
        margin = _ref3.margin,
        outerWidth = _ref3.outerWidth,
        outerHeight = _ref3.outerHeight,
        theme = _ref3.theme,
        getColor = _ref3.getColor,
        animate = _ref3.animate,
        motionStiffness = _ref3.motionStiffness,
        motionDamping = _ref3.motionDamping,
        isInteractive = _ref3.isInteractive,
        children = _ref3.children,
        isZoomable = _ref3.isZoomable,
        zoomToNode = _ref3.zoomToNode,
        currentNodePath = _ref3.currentNodePath

    // assign a unique id depending on node path to each node
    root.each(function(node) {
        node.id = getIdentity(node.data)
        node.path = computeNodePath(node, getIdentity)
    })

    pack(root)

    var nodes = leavesOnly ? root.leaves() : root.descendants()
    nodes = nodes.map(function(node) {
        node.color = getColor(_extends({}, node.data, { depth: node.depth }))
        // if (d.depth > 1) {
        //     d.color = color(d.parentId)
        // } else {
        //     d.color = color(identity(d.data))
        // }

        return node
    })

    if (currentNodePath) computeZoom(nodes, currentNodePath, width, height)

    var wrapperTag = void 0
    var containerTag = void 0

    var wrapperProps = {}
    var containerProps = {}

    if (namespace === 'svg') {
        wrapperTag = 'svg'
        containerTag = 'g'

        wrapperProps.width = outerWidth
        wrapperProps.height = outerHeight
        wrapperProps.xmlns = 'http://www.w3.org/2000/svg'
        containerProps.transform = 'translate(' + margin.left + ',' + margin.top + ')'
    } else {
        wrapperTag = 'div'
        containerTag = 'div'

        wrapperProps.style = {
            position: 'relative',
            width: outerWidth,
            height: outerHeight,
        }
        containerProps.style = Object.assign({}, margin, {
            position: 'absolute',
        })
    }

    if (!animate) {
        return React.createElement(
            Container,
            { isInteractive: isInteractive, theme: theme },
            function(_ref4) {
                var showTooltip = _ref4.showTooltip,
                    hideTooltip = _ref4.hideTooltip
                return React.createElement(
                    wrapperTag,
                    wrapperProps,
                    React.createElement(
                        containerTag,
                        containerProps,
                        children(
                            nodes.map(function(node) {
                                return {
                                    key: node.path,
                                    data: node,
                                    style: _pick(node, ['r', 'x', 'y', 'color']),
                                    zoom:
                                        isInteractive && isZoomable
                                            ? function() {
                                                  return zoomToNode(node.path)
                                              }
                                            : noop,
                                }
                            }),
                            { showTooltip: showTooltip, hideTooltip: hideTooltip, theme: theme }
                        )
                    )
                )
            }
        )
    }

    var motionProps = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return React.createElement(Container, { isInteractive: isInteractive, theme: theme }, function(
        _ref5
    ) {
        var showTooltip = _ref5.showTooltip,
            hideTooltip = _ref5.hideTooltip
        return React.createElement(
            wrapperTag,
            wrapperProps,
            React.createElement(
                TransitionMotion,
                {
                    willEnter: nodeWillEnter,
                    willLeave: nodeWillLeave,
                    styles: nodes.map(function(node) {
                        return {
                            key: node.path,
                            data: node,
                            style: _extends(
                                {
                                    r: spring(node.r, motionProps),
                                    x: spring(node.x, motionProps),
                                    y: spring(node.y, motionProps),
                                },
                                colorMotionSpring(node.color, motionProps)
                            ),
                        }
                    }),
                },
                function(interpolatedStyles) {
                    return React.createElement(
                        containerTag,
                        containerProps,
                        children(
                            interpolatedStyles.map(function(interpolatedStyle) {
                                interpolatedStyle.style.color = getInterpolatedColor(
                                    interpolatedStyle.style
                                )

                                if (isInteractive && isZoomable) {
                                    interpolatedStyle.zoom = function() {
                                        return zoomToNode(interpolatedStyle.data.path)
                                    }
                                } else {
                                    interpolatedStyle.zoom = noop
                                }

                                return interpolatedStyle
                            }),
                            { showTooltip: showTooltip, hideTooltip: hideTooltip, theme: theme }
                        )
                    )
                }
            )
        )
    })
}

BubblePlaceholders.propTypes = _omit(bubblePropTypes, ignoreProps)

export var BubblePlaceholdersDefaultProps = _omit(bubbleDefaultProps, ignoreProps)

BubblePlaceholders.defaultProps = BubblePlaceholdersDefaultProps

var enhance = compose(
    withHierarchy(),
    withDimensions(),
    withTheme(),
    withMotion(),
    withColors({ defaultColorBy: 'depth' }),
    withPropsOnChange(['identity'], function(_ref6) {
        var identity = _ref6.identity
        return {
            getIdentity: getAccessorFor(identity),
        }
    }),
    withPropsOnChange(['width', 'height', 'padding'], function(_ref7) {
        var width = _ref7.width,
            height = _ref7.height,
            padding = _ref7.padding
        return {
            pack: pack()
                .size([width, height])
                .padding(padding),
        }
    }),
    withStateHandlers(
        function(_ref8) {
            var _ref8$currentNodePath = _ref8.currentNodePath,
                currentNodePath = _ref8$currentNodePath === undefined ? null : _ref8$currentNodePath
            return {
                currentNodePath: currentNodePath,
            }
        },
        {
            zoomToNode: function zoomToNode(_ref9) {
                var currentNodePath = _ref9.currentNodePath
                return function(path) {
                    if (path === currentNodePath) return { currentNodePath: null }
                    return { currentNodePath: path }
                }
            },
        }
    ),
    pure
)

export default enhance(BubblePlaceholders)
