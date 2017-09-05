import _sortBy from 'lodash/sortBy'

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

import { line } from 'd3-shape'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import { curveFromProp, lineCurvePropType } from '../../../props'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { withTheme, withColors, withDimensions, withMotion } from '../../../hocs'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import {
    getScales,
    getStackedScales,
    generateLines,
    generateStackedLines,
} from '../../../lib/charts/line'
import CartesianMarkers from '../../cartesian/markers/CartesianMarkers'
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import LineLines from './LineLines'
import LineSlices from './LineSlices'
import LineDots from './LineDots'

var Line = function Line(_ref) {
    var lines = _ref.lines,
        lineGenerator = _ref.lineGenerator,
        xScale = _ref.xScale,
        yScale = _ref.yScale,
        slices = _ref.slices,
        margin = _ref.margin,
        width = _ref.width,
        height = _ref.height,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        axisTop = _ref.axisTop,
        axisRight = _ref.axisRight,
        axisBottom = _ref.axisBottom,
        axisLeft = _ref.axisLeft,
        enableGridX = _ref.enableGridX,
        enableGridY = _ref.enableGridY,
        enableDots = _ref.enableDots,
        dotSymbol = _ref.dotSymbol,
        dotSize = _ref.dotSize,
        dotColor = _ref.dotColor,
        dotBorderWidth = _ref.dotBorderWidth,
        dotBorderColor = _ref.dotBorderColor,
        enableDotLabel = _ref.enableDotLabel,
        dotLabel = _ref.dotLabel,
        dotLabelFormat = _ref.dotLabelFormat,
        dotLabelYOffset = _ref.dotLabelYOffset,
        markers = _ref.markers,
        theme = _ref.theme,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping,
        isInteractive = _ref.isInteractive,
        enableStackTooltip = _ref.enableStackTooltip

    var motionProps = {
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness,
    }

    return React.createElement(Container, { isInteractive: isInteractive, theme: theme }, function(
        _ref2
    ) {
        var showTooltip = _ref2.showTooltip,
            hideTooltip = _ref2.hideTooltip
        return React.createElement(
            SvgWrapper,
            { width: outerWidth, height: outerHeight, margin: margin },
            React.createElement(
                Grid,
                _extends(
                    {
                        theme: theme,
                        width: width,
                        height: height,
                        xScale: enableGridX ? xScale : null,
                        yScale: enableGridY ? yScale : null,
                    },
                    motionProps
                )
            ),
            React.createElement(CartesianMarkers, {
                markers: markers,
                width: width,
                height: height,
                xScale: xScale,
                yScale: yScale,
                theme: theme,
            }),
            React.createElement(
                Axes,
                _extends(
                    {
                        xScale: xScale,
                        yScale: yScale,
                        width: width,
                        height: height,
                        theme: theme,
                        top: axisTop,
                        right: axisRight,
                        bottom: axisBottom,
                        left: axisLeft,
                    },
                    motionProps
                )
            ),
            React.createElement(
                LineLines,
                _extends({ lines: lines, lineGenerator: lineGenerator }, motionProps)
            ),
            isInteractive &&
                enableStackTooltip &&
                React.createElement(LineSlices, {
                    slices: slices,
                    height: height,
                    showTooltip: showTooltip,
                    hideTooltip: hideTooltip,
                    theme: theme,
                }),
            enableDots &&
                React.createElement(
                    LineDots,
                    _extends(
                        {
                            lines: lines,
                            symbol: dotSymbol,
                            size: dotSize,
                            color: getInheritedColorGenerator(dotColor),
                            borderWidth: dotBorderWidth,
                            borderColor: getInheritedColorGenerator(dotBorderColor),
                            enableLabel: enableDotLabel,
                            label: dotLabel,
                            labelFormat: dotLabelFormat,
                            labelYOffset: dotLabelYOffset,
                            theme: theme,
                        },
                        motionProps
                    )
                )
        )
    })
}

Line.propTypes = {
    // data
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(
                PropTypes.shape({
                    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,

    stacked: PropTypes.bool.isRequired,
    curve: lineCurvePropType.isRequired,
    lineGenerator: PropTypes.func.isRequired,

    lines: PropTypes.array.isRequired,
    slices: PropTypes.array.isRequired,

    minY: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf(['auto'])])
        .isRequired,
    maxY: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.oneOf(['auto'])])
        .isRequired,
    xScale: PropTypes.func.isRequired, // computed
    yScale: PropTypes.func.isRequired, // computed

    // axes & grid
    axisTop: PropTypes.object,
    axisRight: PropTypes.object,
    axisBottom: PropTypes.object,
    axisLeft: PropTypes.object,
    enableGridX: PropTypes.bool.isRequired,
    enableGridY: PropTypes.bool.isRequired,

    // dots
    enableDots: PropTypes.bool.isRequired,
    dotSymbol: PropTypes.func,
    dotSize: PropTypes.number.isRequired,
    dotColor: PropTypes.any.isRequired,
    dotBorderWidth: PropTypes.number.isRequired,
    dotBorderColor: PropTypes.any.isRequired,
    enableDotLabel: PropTypes.bool.isRequired,

    // markers
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            axis: PropTypes.oneOf(['x', 'y']).isRequired,
            value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            style: PropTypes.object,
        })
    ),

    // theming
    getColor: PropTypes.func.isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,

    // stack tooltip
    enableStackTooltip: PropTypes.bool.isRequired,
}

export var LineDefaultProps = {
    indexBy: 'id',
    keys: ['value'],

    stacked: false,
    curve: 'linear',

    // scales
    minY: 0,
    maxY: 'auto',

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: true,
    enableGridY: true,

    // dots
    enableDots: true,
    dotSize: 6,
    dotColor: 'inherit',
    dotBorderWidth: 0,
    dotBorderColor: 'inherit',
    enableDotLabel: false,

    // theming
    colors: 'nivo',
    colorBy: 'id',

    // interactivity
    isInteractive: true,

    // stack tooltip
    enableStackTooltip: true,
}

var enhance = compose(
    defaultProps(LineDefaultProps),
    withTheme(),
    withColors(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['curve'], function(_ref3) {
        var curve = _ref3.curve
        return {
            lineGenerator: line()
                .x(function(d) {
                    return d.x
                })
                .y(function(d) {
                    return d.y
                })
                .curve(curveFromProp(curve)),
        }
    }),
    withPropsOnChange(['data', 'stacked', 'width', 'height', 'minY', 'maxY'], function(_ref4) {
        var data = _ref4.data,
            stacked = _ref4.stacked,
            width = _ref4.width,
            height = _ref4.height,
            margin = _ref4.margin,
            minY = _ref4.minY,
            maxY = _ref4.maxY

        var scales = void 0
        var args = { data: data, width: width, height: height, minY: minY, maxY: maxY }
        if (stacked === true) {
            scales = getStackedScales(args)
        } else {
            scales = getScales(args)
        }

        return _extends(
            {
                margin: margin,
                width: width,
                height: height,
            },
            scales
        )
    }),
    withPropsOnChange(['getColor', 'xScale', 'yScale'], function(_ref5) {
        var data = _ref5.data,
            stacked = _ref5.stacked,
            xScale = _ref5.xScale,
            yScale = _ref5.yScale,
            getColor = _ref5.getColor

        var lines = void 0
        if (stacked === true) {
            lines = generateStackedLines(data, xScale, yScale, getColor)
        } else {
            lines = generateLines(data, xScale, yScale, getColor)
        }

        var slices = xScale.domain().map(function(id, i) {
            var points = _sortBy(
                lines.map(function(line) {
                    return {
                        id: line.id,
                        value: line.points[i].value,
                        y: line.points[i].y,
                        color: line.color,
                    }
                }),
                'y'
            )

            return {
                id: id,
                x: xScale(id),
                points: points,
            }
        })

        return { lines: lines, slices: slices }
    }),
    pure
)

var enhancedLine = enhance(Line)
enhancedLine.displayName = 'enhance(Line)'

export default enhancedLine
