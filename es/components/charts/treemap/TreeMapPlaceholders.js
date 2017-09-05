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

import { TransitionMotion, spring } from 'react-motion'
import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { treemap } from 'd3-hierarchy'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import { treeMapTileFromProp } from '../../../props'
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps'
import { withHierarchy, withDimensions, withTheme, withColors, withMotion } from '../../../hocs'
import { colorMotionSpring } from '../../../lib/colors'
import Container from '../Container'

var nodeWillEnter = function nodeWillEnter(_ref) {
    var node = _ref.data

    var width = node.x1 - node.x0
    var height = node.y1 - node.y0

    return _extends(
        {
            x: node.x0 + width / 2,
            y: node.y0 + height / 2,
            width: 0,
            height: 0,
        },
        colorMotionSpring(node.color)
    )
}

var TreeMapPlaceholders = function TreeMapPlaceholders(_ref2) {
    var root = _ref2.root,
        getIdentity = _ref2.getIdentity,
        namespace = _ref2.namespace,
        margin = _ref2.margin,
        outerWidth = _ref2.outerWidth,
        outerHeight = _ref2.outerHeight,
        treemap = _ref2.treemap,
        leavesOnly = _ref2.leavesOnly,
        animate = _ref2.animate,
        motionStiffness = _ref2.motionStiffness,
        motionDamping = _ref2.motionDamping,
        theme = _ref2.theme,
        getColor = _ref2.getColor,
        isInteractive = _ref2.isInteractive,
        children = _ref2.children

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
        containerProps.style = {
            position: 'absolute',
            top: margin.top,
            left: margin.left,
        }
    }

    treemap(root)

    var nodes = leavesOnly ? root.leaves() : root.descendants()
    nodes = nodes.map(function(d) {
        d.color = getColor(_extends({}, d.data, { depth: d.depth }))

        d.data.id = getIdentity(d.data)
        d.data.value = d.value
        d.data.color = d.color
        d.data.key = d
            .ancestors()
            .map(function(a) {
                return getIdentity(a.data)
            })
            .join('.')

        return d
    })

    return React.createElement(Container, { isInteractive: isInteractive, theme: theme }, function(
        _ref3
    ) {
        var showTooltip = _ref3.showTooltip,
            hideTooltip = _ref3.hideTooltip

        if (animate === false) {
            return React.createElement(
                wrapperTag,
                wrapperProps,
                React.createElement(
                    containerTag,
                    containerProps,
                    children(
                        nodes.map(function(node) {
                            return {
                                key: node.data.key,
                                data: node.data,
                                style: {
                                    x: node.x0,
                                    y: node.y0,
                                    width: node.x1 - node.x0,
                                    height: node.y1 - node.y0,
                                    color: node.color,
                                },
                            }
                        }),
                        { showTooltip: showTooltip, hideTooltip: hideTooltip, theme: theme }
                    )
                )
            )
        }

        var springConfig = {
            stiffness: motionStiffness,
            damping: motionDamping,
        }

        return React.createElement(
            wrapperTag,
            wrapperProps,
            React.createElement(
                TransitionMotion,
                {
                    willEnter: nodeWillEnter,
                    styles: nodes.map(function(node) {
                        return {
                            key: node.data.key,
                            data: node.data,
                            style: _extends(
                                {
                                    x: spring(node.x0, springConfig),
                                    y: spring(node.y0, springConfig),
                                    width: spring(node.x1 - node.x0, springConfig),
                                    height: spring(node.y1 - node.y0, springConfig),
                                },
                                colorMotionSpring(node.color, springConfig)
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
                                var _interpolatedStyle$st = interpolatedStyle.style,
                                    x = _interpolatedStyle$st.x,
                                    y = _interpolatedStyle$st.y,
                                    width = _interpolatedStyle$st.width,
                                    height = _interpolatedStyle$st.height,
                                    colorR = _interpolatedStyle$st.colorR,
                                    colorG = _interpolatedStyle$st.colorG,
                                    colorB = _interpolatedStyle$st.colorB

                                return _extends({}, interpolatedStyle, {
                                    style: {
                                        x: x,
                                        y: y,
                                        width: Math.max(0, width),
                                        height: Math.max(0, height),
                                        color:
                                            'rgb(' +
                                            Math.round(colorR) +
                                            ',' +
                                            Math.round(colorG) +
                                            ',' +
                                            Math.round(colorB) +
                                            ')',
                                    },
                                })
                            }),
                            { showTooltip: showTooltip, hideTooltip: hideTooltip, theme: theme }
                        )
                    )
                }
            )
        )
    })
}

TreeMapPlaceholders.propTypes = _omit(treeMapPropTypes, [
    'orientLabels',
    'skipVMin',
    'transitionDuration',
    'transitionEasing',
])

TreeMapPlaceholders.defaultProps = _omit(treeMapDefaultProps, [
    'orientLabels',
    'skipVMin',
    'transitionDuration',
    'transitionEasing',
])

var enhance = compose(
    withHierarchy(),
    withDimensions(),
    withColors({ defaultColorBy: 'depth' }),
    withTheme(),
    withMotion(),
    withPropsOnChange(['identity'], function(_ref4) {
        var identity = _ref4.identity
        return {
            getIdentity: getAccessorFor(identity),
        }
    }),
    withPropsOnChange(['width', 'height', 'tile', 'innerPadding', 'outerPadding'], function(_ref5) {
        var width = _ref5.width,
            height = _ref5.height,
            tile = _ref5.tile,
            innerPadding = _ref5.innerPadding,
            outerPadding = _ref5.outerPadding
        return {
            treemap: treemap()
                .size([width, height])
                .tile(treeMapTileFromProp(tile))
                .round(true)
                .paddingInner(innerPadding)
                .paddingOuter(outerPadding),
        }
    }),
    pure
)

export default enhance(TreeMapPlaceholders)
