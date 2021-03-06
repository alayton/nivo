import _sortBy from 'lodash/sortBy'
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

import { positionFromAngle } from '../../../lib/polar'
import TableTooltip from '../../tooltip/TableTooltip'
import Chip from '../../tooltip/Chip'

var RadarTooltipItem = function RadarTooltipItem(_ref) {
    var path = _ref.path,
        tipX = _ref.tipX,
        tipY = _ref.tipY,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        isHover = _ref.isHover
    return React.createElement(
        'g',
        null,
        React.createElement('line', {
            x1: 0,
            y1: 0,
            x2: tipX,
            y2: tipY,
            stroke: '#000',
            strokeOpacity: isHover ? 0.35 : 0,
        }),
        React.createElement('path', {
            d: path,
            fill: '#F00',
            fillOpacity: 0,
            onMouseEnter: showTooltip,
            onMouseMove: showTooltip,
            onMouseLeave: hideTooltip,
        })
    )
}

RadarTooltipItem.propTypes = {
    datum: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    colorByKey: PropTypes.object.isRequired,

    startAngle: PropTypes.number.isRequired,
    endAngle: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    tipX: PropTypes.number.isRequired, // computed
    tipY: PropTypes.number.isRequired, // computed

    arcGenerator: PropTypes.func.isRequired, // computed
    path: PropTypes.string.isRequired, // computed

    theme: PropTypes.object.isRequired,

    showTooltip: PropTypes.func.isRequired, // re-computed
    hideTooltip: PropTypes.func.isRequired, // re-computed

    isHover: PropTypes.bool.isRequired, // computed
}

var enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(['datum', 'keys', 'index', 'colorByKey', 'theme'], function(_ref2) {
        var datum = _ref2.datum,
            keys = _ref2.keys,
            index = _ref2.index,
            colorByKey = _ref2.colorByKey,
            theme = _ref2.theme
        return {
            tooltip: React.createElement(TableTooltip, {
                title: React.createElement('strong', null, index),
                rows: _sortBy(
                    keys.map(function(key) {
                        return [
                            React.createElement(Chip, { color: colorByKey[key] }),
                            key,
                            datum[key],
                        ]
                    }),
                    '2'
                ).reverse(),
                theme: theme,
            }),
        }
    }),
    withPropsOnChange(['startAngle', 'endAngle', 'radius', 'arcGenerator'], function(_ref3) {
        var startAngle = _ref3.startAngle,
            endAngle = _ref3.endAngle,
            radius = _ref3.radius,
            arcGenerator = _ref3.arcGenerator

        var position = positionFromAngle(
            startAngle + (endAngle - startAngle) * 0.5 - Math.PI / 2,
            radius
        )

        return {
            path: arcGenerator({ startAngle: startAngle, endAngle: endAngle }),
            tipX: position.x,
            tipY: position.y,
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

export default enhance(RadarTooltipItem)
