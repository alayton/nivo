import _max from 'lodash/max' /*
                                * This file is part of the nivo project.
                                *
                                * Copyright 2016-present, Raphaël Benitte.
                                *
                                * For the full copyright and license information, please view the LICENSE
                                * file that was distributed with this source code.
                                */

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

import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import defaultProps from 'recompose/defaultProps'
import { closedCurvePropType } from '../../../props'
import { withTheme, withColors, withCurve, withDimensions, withMotion } from '../../../hocs'
import { scaleLinear } from 'd3-scale'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import RadarShapes from './RadarShapes'
import RadarGrid from './RadarGrid'
import RadarTooltip from './RadarTooltip'
import RadarDots from './RadarDots'

var Radar = function Radar(_ref) {
    var data = _ref.data,
        keys = _ref.keys,
        getIndex = _ref.getIndex,
        indices = _ref.indices,
        curveInterpolator = _ref.curveInterpolator,
        radius = _ref.radius,
        radiusScale = _ref.radiusScale,
        angleStep = _ref.angleStep,
        centerX = _ref.centerX,
        centerY = _ref.centerY,
        margin = _ref.margin,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        gridLevels = _ref.gridLevels,
        gridShape = _ref.gridShape,
        gridLabelOffset = _ref.gridLabelOffset,
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
        theme = _ref.theme,
        fillOpacity = _ref.fillOpacity,
        colorByKey = _ref.colorByKey,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping,
        isInteractive = _ref.isInteractive

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
                'g',
                { transform: 'translate(' + centerX + ', ' + centerY + ')' },
                React.createElement(
                    RadarGrid,
                    _extends(
                        {
                            levels: gridLevels,
                            shape: gridShape,
                            radius: radius,
                            angleStep: angleStep,
                            theme: theme,
                            indices: indices,
                            labelOffset: gridLabelOffset,
                        },
                        motionProps
                    )
                ),
                React.createElement(
                    RadarShapes,
                    _extends(
                        {
                            data: data,
                            keys: keys,
                            colorByKey: colorByKey,
                            radiusScale: radiusScale,
                            angleStep: angleStep,
                            curveInterpolator: curveInterpolator,
                            borderWidth: borderWidth,
                            borderColor: borderColor,
                            fillOpacity: fillOpacity,
                        },
                        motionProps
                    )
                ),
                isInteractive &&
                    React.createElement(RadarTooltip, {
                        data: data,
                        keys: keys,
                        getIndex: getIndex,
                        colorByKey: colorByKey,
                        radius: radius,
                        angleStep: angleStep,
                        theme: theme,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                    }),
                enableDots &&
                    React.createElement(
                        RadarDots,
                        _extends(
                            {
                                data: data,
                                keys: keys,
                                getIndex: getIndex,
                                radiusScale: radiusScale,
                                angleStep: angleStep,
                                symbol: dotSymbol,
                                size: dotSize,
                                colorByKey: colorByKey,
                                color: dotColor,
                                borderWidth: dotBorderWidth,
                                borderColor: dotBorderColor,
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
        )
    })
}

Radar.propTypes = {
    // data
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    indexBy: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.func]).isRequired,
    getIndex: PropTypes.func.isRequired, // computed
    indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
        .isRequired, // computed

    curve: closedCurvePropType.isRequired,
    curveInterpolator: PropTypes.func.isRequired, // computed

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // grid
    gridLevels: PropTypes.number,
    gridShape: PropTypes.oneOf(['circular', 'linear']),
    gridLabelOffset: PropTypes.number,

    // dots
    enableDots: PropTypes.bool.isRequired,
    dotSymbol: PropTypes.func,
    dotSize: PropTypes.number,
    dotColor: PropTypes.any,
    dotBorderWidth: PropTypes.number,
    dotBorderColor: PropTypes.any,
    enableDotLabel: PropTypes.bool,
    dotLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    dotLabelFormat: PropTypes.string,
    dotLabelYOffset: PropTypes.number,

    // theming
    getColor: PropTypes.func.isRequired, // computed
    colorByKey: PropTypes.object.isRequired, // computed
    fillOpacity: PropTypes.number.isRequired,

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
}

export var RadarDefaultProps = {
    curve: 'linearClosed',

    // border
    borderWidth: 2,
    borderColor: 'inherit',

    // grid
    gridLevels: 5,
    gridShape: 'circular',
    gridLabelOffset: 16,

    // dots
    enableDots: true,

    // theming
    fillOpacity: 0.15,

    // interactivity
    isInteractive: true,
}

var enhance = compose(
    defaultProps(RadarDefaultProps),
    withTheme(),
    withColors({
        defaultColorBy: 'key',
    }),
    withCurve(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['indexBy'], function(_ref3) {
        var indexBy = _ref3.indexBy
        return {
            getIndex: getAccessorFor(indexBy),
        }
    }),
    withPropsOnChange(['data', 'getIndex'], function(_ref4) {
        var data = _ref4.data,
            getIndex = _ref4.getIndex
        return {
            indices: data.map(getIndex),
        }
    }),
    withPropsOnChange(['keys', 'getColor'], function(_ref5) {
        var keys = _ref5.keys,
            getColor = _ref5.getColor
        return {
            colorByKey: keys.reduce(function(mapping, key, index) {
                mapping[key] = getColor({ key: key, index: index })
                return mapping
            }, {}),
        }
    }),
    withPropsOnChange(['keys', 'indexBy', 'data', 'width', 'height'], function(_ref6) {
        var data = _ref6.data,
            keys = _ref6.keys,
            width = _ref6.width,
            height = _ref6.height

        var maxValue = _max(
            data.reduce(function(acc, d) {
                return [].concat(
                    acc,
                    keys.map(function(key) {
                        return d[key]
                    })
                )
            }, [])
        )

        var radius = Math.min(width, height) / 2
        var radiusScale = scaleLinear()
            .range([0, radius])
            .domain([0, maxValue])

        return {
            data: data,
            radius: radius,
            radiusScale: radiusScale,
            centerX: width / 2,
            centerY: height / 2,
            angleStep: Math.PI * 2 / data.length,
        }
    }),
    pure
)

var enhancedRadar = enhance(Radar)
enhancedRadar.displayName = 'enhance(Radar)'

export default enhancedRadar
