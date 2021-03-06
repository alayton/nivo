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
import Chip from '../../tooltip/Chip'

var StreamSlicesItem = function StreamSlicesItem(_ref) {
    var slice = _ref.slice,
        height = _ref.height,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        isHover = _ref.isHover
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

StreamSlicesItem.propTypes = {
    slice: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    isHover: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
}

var enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(['slice', 'theme'], function(_ref2) {
        var slice = _ref2.slice,
            theme = _ref2.theme
        return {
            tooltip: React.createElement(TableTooltip, {
                theme: theme,
                rows: slice.stack.map(function(p) {
                    return [React.createElement(Chip, { color: p.color }), p.id, p.value]
                }),
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

export default enhance(StreamSlicesItem)
