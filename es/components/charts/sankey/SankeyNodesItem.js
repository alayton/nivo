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
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withHandlers from 'recompose/withHandlers'
import pure from 'recompose/pure'
import BasicTooltip from '../../tooltip/BasicTooltip'

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
    return React.createElement('rect', {
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
    node: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        color: PropTypes.string.isRequired,
    }),

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    hoverOpacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,

    theme: PropTypes.object.isRequired,
}

var enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(['node', 'theme'], function(_ref2) {
        var node = _ref2.node,
            theme = _ref2.theme
        return {
            tooltip: React.createElement(BasicTooltip, {
                id: node.id,
                enableChip: true,
                color: node.color,
                theme: theme,
            }),
        }
    }),
    withHandlers({
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
    pure
)

export default enhance(SankeyNodesItem)
