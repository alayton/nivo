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

var style = { cursor: 'pointer' }

var HeatMapCellCircle = function HeatMapCellCircle(_ref) {
    var value = _ref.value,
        x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        color = _ref.color,
        opacity = _ref.opacity,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        textColor = _ref.textColor,
        onHover = _ref.onHover,
        onLeave = _ref.onLeave
    return React.createElement(
        'g',
        {
            transform: 'translate(' + x + ', ' + y + ')',
            style: style,
            onMouseEnter: onHover,
            onMouseMove: onHover,
            onMouseLeave: onLeave,
        },
        React.createElement('circle', {
            r: Math.min(width, height) / 2,
            fill: color,
            fillOpacity: opacity,
            strokeWidth: borderWidth,
            stroke: borderColor,
            strokeOpacity: opacity,
        }),
        React.createElement(
            'text',
            {
                alignmentBaseline: 'central',
                textAnchor: 'middle',
                style: { fill: textColor },
                fillOpacity: opacity,
            },
            value
        )
    )
}

HeatMapCellCircle.propTypes = {
    value: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    onHover: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired,
}

export default pure(HeatMapCellCircle)
