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
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import { TransitionMotion, spring } from 'react-motion'
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import { motionPropTypes } from '../../../props'
import SankeyNodesItem from './SankeyNodesItem'

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
        return React.createElement(
            'g',
            null,
            nodes.map(function(node) {
                return React.createElement(SankeyNodesItem, {
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

    return React.createElement(
        TransitionMotion,
        {
            styles: nodes.map(function(node) {
                return {
                    key: node.id,
                    data: node,
                    style: _extends(
                        {
                            x: spring(node.x, springProps),
                            y: spring(node.y, springProps),
                            width: spring(node.width, springProps),
                            height: spring(node.height, springProps),
                        },
                        colorMotionSpring(node.color, springProps)
                    ),
                }
            }),
        },
        function(interpolatedStyles) {
            return React.createElement(
                'g',
                null,
                interpolatedStyles.map(function(_ref2) {
                    var key = _ref2.key,
                        style = _ref2.style,
                        node = _ref2.data

                    var color = getInterpolatedColor(style)

                    return React.createElement(SankeyNodesItem, {
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
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
                width: PropTypes.number.isRequired,
                height: PropTypes.number.isRequired,
                color: PropTypes.string.isRequired,
            })
        ).isRequired,

        nodePaddingX: PropTypes.number.isRequired,
        nodeOpacity: PropTypes.number.isRequired,
        nodeHoverOpacity: PropTypes.number.isRequired,
        nodeBorderWidth: PropTypes.number.isRequired,
        getNodeBorderColor: PropTypes.func.isRequired,

        theme: PropTypes.object.isRequired,
    },
    motionPropTypes,
    {
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
    }
)

export default pure(SankeyNodes)
