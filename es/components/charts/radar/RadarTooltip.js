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
import { arc as d3Arc } from 'd3-shape'
import RadarTooltipItem from './RadarTooltipItem'

var RadarTooltip = function RadarTooltip(_ref) {
    var data = _ref.data,
        keys = _ref.keys,
        getIndex = _ref.getIndex,
        colorByKey = _ref.colorByKey,
        radius = _ref.radius,
        angleStep = _ref.angleStep,
        theme = _ref.theme,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip

    var arc = d3Arc()
        .outerRadius(radius)
        .innerRadius(0)

    var halfAngleStep = angleStep * 0.5
    var rootStartAngle = -halfAngleStep

    return React.createElement(
        'g',
        null,
        data.map(function(d, i) {
            var index = getIndex(d)
            var startAngle = rootStartAngle
            var endAngle = startAngle + angleStep

            rootStartAngle += angleStep

            return React.createElement(RadarTooltipItem, {
                key: index,
                datum: d,
                keys: keys,
                index: index,
                colorByKey: colorByKey,
                startAngle: startAngle,
                endAngle: endAngle,
                radius: radius,
                arcGenerator: arc,
                theme: theme,
                showTooltip: showTooltip,
                hideTooltip: hideTooltip,
            })
        })
    )
}

RadarTooltip.propTypes = {
    data: PropTypes.array.isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    getIndex: PropTypes.func.isRequired,
    colorByKey: PropTypes.object.isRequired,

    radius: PropTypes.number.isRequired,
    angleStep: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

export default pure(RadarTooltip)
