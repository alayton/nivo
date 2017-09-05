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

import { Motion, TransitionMotion, spring } from 'react-motion'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { degreesToRadians, radiansToDegrees } from '../../../lib/polar'
import { withTheme, withDimensions, withColors } from '../../../hocs'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import { pie as d3Pie, arc as d3Arc } from 'd3-shape'
import PieRadialLabels from './PieRadialLabels'
import PieSlicesLabels from './PieSlicesLabels'
import BasicTooltip from '../../tooltip/BasicTooltip'

var Pie = function Pie(_ref) {
    var data = _ref.data,
        margin = _ref.margin,
        width = _ref.width,
        height = _ref.height,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        _innerRadius = _ref.innerRadius,
        _padAngle = _ref.padAngle,
        cornerRadius = _ref.cornerRadius,
        borderWidth = _ref.borderWidth,
        _borderColor = _ref.borderColor,
        enableRadialLabels = _ref.enableRadialLabels,
        radialLabel = _ref.radialLabel,
        radialLabelsSkipAngle = _ref.radialLabelsSkipAngle,
        radialLabelsLinkOffset = _ref.radialLabelsLinkOffset,
        radialLabelsLinkDiagonalLength = _ref.radialLabelsLinkDiagonalLength,
        radialLabelsLinkHorizontalLength = _ref.radialLabelsLinkHorizontalLength,
        radialLabelsLinkStrokeWidth = _ref.radialLabelsLinkStrokeWidth,
        radialLabelsTextXOffset = _ref.radialLabelsTextXOffset,
        radialLabelsTextColor = _ref.radialLabelsTextColor,
        radialLabelsLinkColor = _ref.radialLabelsLinkColor,
        enableSlicesLabels = _ref.enableSlicesLabels,
        sliceLabel = _ref.sliceLabel,
        slicesLabelsSkipAngle = _ref.slicesLabelsSkipAngle,
        slicesLabelsTextColor = _ref.slicesLabelsTextColor,
        theme = _ref.theme,
        getColor = _ref.getColor,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping,
        isInteractive = _ref.isInteractive

    var centerX = width / 2
    var centerY = height / 2

    var padAngle = degreesToRadians(_padAngle)

    var borderColor = getInheritedColorGenerator(_borderColor)

    var motionProps = {
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness,
    }

    var radialLabelsProps = {
        label: getLabelGenerator(radialLabel),
        skipAngle: radialLabelsSkipAngle,
        linkOffset: radialLabelsLinkOffset,
        linkDiagonalLength: radialLabelsLinkDiagonalLength,
        linkHorizontalLength: radialLabelsLinkHorizontalLength,
        linkStrokeWidth: radialLabelsLinkStrokeWidth,
        textXOffset: radialLabelsTextXOffset,
        textColor: getInheritedColorGenerator(radialLabelsTextColor, 'labels.textColor'),
        linkColor: getInheritedColorGenerator(radialLabelsLinkColor, 'axis.tickColor'),
    }

    var slicesLabelsProps = {
        label: getLabelGenerator(sliceLabel),
        skipAngle: slicesLabelsSkipAngle,
        textColor: getInheritedColorGenerator(slicesLabelsTextColor, 'labels.textColor'),
    }

    var radius = Math.min(width, height) / 2
    var innerRadius = radius * Math.min(_innerRadius, 1)

    var pie = d3Pie()
    pie.value(function(d) {
        return d.value
    })

    var arc = d3Arc()
    arc.outerRadius(radius)

    return React.createElement(Container, { isInteractive: isInteractive, theme: theme }, function(
        _ref2
    ) {
        var showTooltip = _ref2.showTooltip,
            hideTooltip = _ref2.hideTooltip
        return React.createElement(
            SvgWrapper,
            { width: outerWidth, height: outerHeight, margin: margin },
            React.createElement(
                Motion,
                {
                    style: {
                        centerX: spring(centerX, motionProps),
                        centerY: spring(centerY, motionProps),
                        innerRadius: spring(innerRadius),
                        padAngle: spring(padAngle, motionProps),
                        cornerRadius: spring(cornerRadius, motionProps),
                    },
                },
                function(interpolatingStyle) {
                    var interpolatedPie = pie.padAngle(interpolatingStyle.padAngle)
                    var interpolatedArc = arc
                        .cornerRadius(interpolatingStyle.cornerRadius)
                        .innerRadius(interpolatingStyle.innerRadius)

                    var arcsData = interpolatedPie(data).map(function(d) {
                        var angle = d.endAngle - d.startAngle

                        return _extends({}, d, {
                            angle: angle,
                            angleDegrees: radiansToDegrees(angle),
                            data: _extends({}, d.data, {
                                color: getColor(d.data),
                            }),
                        })
                    })

                    return React.createElement(
                        'g',
                        {
                            transform:
                                'translate(' +
                                interpolatingStyle.centerX +
                                ', ' +
                                interpolatingStyle.centerY +
                                ')',
                        },
                        arcsData.map(function(d) {
                            var handleTooltip = function handleTooltip(e) {
                                return showTooltip(
                                    React.createElement(BasicTooltip, {
                                        id: d.data.label,
                                        value: d.data.value,
                                        enableChip: true,
                                        color: d.data.color,
                                        theme: theme,
                                    }),
                                    e
                                )
                            }

                            return React.createElement('path', {
                                key: d.data.id,
                                d: interpolatedArc(d),
                                fill: d.data.color,
                                strokeWidth: borderWidth,
                                stroke: borderColor(d.data),
                                onMouseEnter: handleTooltip,
                                onMouseMove: handleTooltip,
                                onMouseLeave: hideTooltip,
                            })
                        }),
                        enableSlicesLabels &&
                            React.createElement(
                                PieSlicesLabels,
                                _extends(
                                    {
                                        data: arcsData,
                                        radius: radius,
                                        innerRadius: interpolatingStyle.innerRadius,
                                        theme: theme,
                                    },
                                    slicesLabelsProps
                                )
                            ),
                        enableRadialLabels &&
                            React.createElement(
                                PieRadialLabels,
                                _extends(
                                    {
                                        data: arcsData,
                                        radius: radius,
                                        theme: theme,
                                    },
                                    radialLabelsProps
                                )
                            )
                    )
                }
            )
        )
    })
}

Pie.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })
    ).isRequired,

    innerRadius: PropTypes.number.isRequired,
    padAngle: PropTypes.number.isRequired,
    cornerRadius: PropTypes.number.isRequired,

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // radial labels
    enableRadialLabels: PropTypes.bool.isRequired,
    radialLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    radialLabelsSkipAngle: PropTypes.number,
    radialLabelsTextXOffset: PropTypes.number,
    radialLabelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    radialLabelsLinkOffset: PropTypes.number,
    radialLabelsLinkDiagonalLength: PropTypes.number,
    radialLabelsLinkHorizontalLength: PropTypes.number,
    radialLabelsLinkStrokeWidth: PropTypes.number,
    radialLabelsLinkColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // slices labels
    enableSlicesLabels: PropTypes.bool.isRequired,
    sliceLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    slicesLabelsSkipAngle: PropTypes.number,
    slicesLabelsTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // interactivity
    isInteractive: PropTypes.bool,
}

export var PieDefaultProps = {
    innerRadius: 0,
    padAngle: 0,
    cornerRadius: 0,

    // border
    borderWidth: 0,
    borderColor: 'inherit:darker(1)',

    // radial labels
    enableRadialLabels: true,
    radialLabel: 'id',
    radialLabelsTextColor: 'theme',
    radialLabelsLinkColor: 'theme',

    // slices labels
    enableSlicesLabels: true,
    sliceLabel: 'value',
    slicesLabelsTextColor: 'theme',

    // interactivity
    isInteractive: true,
}

var enhance = compose(
    defaultProps(PieDefaultProps),
    withTheme(),
    withDimensions(),
    withColors(),
    pure
)

var enhancedPie = enhance(Pie)
enhancedPie.displayName = 'enhance(Pie)'

export default enhancedPie
