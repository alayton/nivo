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
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import withPropsOnChange from 'recompose/withPropsOnChange'
import TableTooltip from '../../tooltip/TableTooltip'

var Chip = function Chip(_ref) {
    var color = _ref.color
    return React.createElement('span', {
        style: { display: 'block', width: '12px', height: '12px', background: color },
    })
}

var LineSlicesItem = function LineSlicesItem(_ref2) {
    var slice = _ref2.slice,
        height = _ref2.height,
        showTooltip = _ref2.showTooltip,
        hideTooltip = _ref2.hideTooltip,
        isHover = _ref2.isHover
    return React.createElement(
        'g',
        { transform: 'translate(' + slice.x + ', 0)' },
        isHover &&
            React.createElement('line', {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: height,
                stroke: '#000',
                strokeOpacity: 0.35,
                strokeWidth: 1,
            }),
        React.createElement('rect', {
            x: -20,
            width: 40,
            height: height,
            fill: '#000',
            fillOpacity: 0,
            onMouseEnter: showTooltip,
            onMouseMove: showTooltip,
            onMouseLeave: hideTooltip,
        })
    )
}

LineSlicesItem.propTypes = {
    slice: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    isHover: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
}

var enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(['slice', 'theme'], function(_ref3) {
        var slice = _ref3.slice,
            theme = _ref3.theme
        return {
            tooltip: React.createElement(TableTooltip, {
                theme: theme,
                rows: slice.points.map(function(p) {
                    return [React.createElement(Chip, { color: p.color }), p.id, p.value]
                }),
            }),
        }
    }),
    withHandlers({
        showTooltip: function showTooltip(_ref4) {
            var _showTooltip = _ref4.showTooltip,
                setIsHover = _ref4.setIsHover,
                tooltip = _ref4.tooltip
            return function(e) {
                setIsHover(true)
                _showTooltip(tooltip, e)
            }
        },
        hideTooltip: function hideTooltip(_ref5) {
            var _hideTooltip = _ref5.hideTooltip,
                setIsHover = _ref5.setIsHover
            return function() {
                setIsHover(false)
                _hideTooltip()
            }
        },
    }),
    pure
)

export default enhance(LineSlicesItem)
