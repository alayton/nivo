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
import { TransitionMotion, spring } from 'react-motion'
import { generateGroupedBars, generateStackedBars } from '../../../lib/charts/bar'
import enhance from './enhance'
import { BarPropTypes } from './props'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import Grid from '../../axes/Grid'
import CartesianMarkers from '../../cartesian/markers/CartesianMarkers'
import Axes from '../../axes/Axes'
import BarItem from './BarItem'
import BarItemLabel from './BarItemLabel'

var Bar = function Bar(_ref) {
    var data = _ref.data,
        getIndex = _ref.getIndex,
        keys = _ref.keys,
        groupMode = _ref.groupMode,
        layout = _ref.layout,
        margin = _ref.margin,
        width = _ref.width,
        height = _ref.height,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        xPadding = _ref.xPadding,
        axisTop = _ref.axisTop,
        axisRight = _ref.axisRight,
        axisBottom = _ref.axisBottom,
        axisLeft = _ref.axisLeft,
        enableGridX = _ref.enableGridX,
        enableGridY = _ref.enableGridY,
        enableLabels = _ref.enableLabels,
        getLabelsLinkColor = _ref.getLabelsLinkColor,
        getLabelsTextColor = _ref.getLabelsTextColor,
        markers = _ref.markers,
        theme = _ref.theme,
        getColor = _ref.getColor,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping,
        isInteractive = _ref.isInteractive

    var result = void 0
    if (groupMode === 'grouped') {
        result = generateGroupedBars(layout, data, getIndex, keys, width, height, getColor, {
            xPadding: xPadding,
        })
    } else if (groupMode === 'stacked') {
        result = generateStackedBars(layout, data, getIndex, keys, width, height, getColor, {
            xPadding: xPadding,
        })
    }

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

        var bars = void 0
        if (animate === true) {
            bars = React.createElement(
                TransitionMotion,
                {
                    styles: result.bars.map(function(bar) {
                        return {
                            key: bar.key,
                            data: bar,
                            style: {
                                x: spring(bar.x, motionProps),
                                y: spring(bar.y, motionProps),
                                width: spring(bar.width, motionProps),
                                height: spring(bar.height, motionProps),
                            },
                        }
                    }),
                },
                function(interpolatedStyles) {
                    return React.createElement(
                        'g',
                        null,
                        interpolatedStyles.map(function(_ref3) {
                            var key = _ref3.key,
                                style = _ref3.style,
                                data = _ref3.data
                            return React.createElement(
                                BarItem,
                                _extends(
                                    {
                                        key: key,
                                    },
                                    data,
                                    style,
                                    {
                                        showTooltip: showTooltip,
                                        hideTooltip: hideTooltip,
                                        theme: theme,
                                    }
                                )
                            )
                        })
                    )
                }
            )
        } else {
            bars = result.bars.map(function(d) {
                return React.createElement(
                    BarItem,
                    _extends(
                        {
                            key: d.key,
                        },
                        d,
                        {
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip,
                            theme: theme,
                        }
                    )
                )
            })
        }

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
                        xScale: enableGridX ? result.xScale : null,
                        yScale: enableGridY ? result.yScale : null,
                    },
                    motionProps
                )
            ),
            React.createElement(CartesianMarkers, {
                markers: markers,
                width: width,
                height: height,
                xScale: result.xScale,
                yScale: result.yScale,
                theme: theme,
            }),
            React.createElement(
                Axes,
                _extends(
                    {
                        xScale: result.xScale,
                        yScale: result.yScale,
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
            bars,
            enableLabels &&
                result.bars.map(function(d) {
                    return React.createElement(
                        BarItemLabel,
                        _extends({}, d, {
                            textColor: getLabelsTextColor(d, theme),
                            linkColor: getLabelsLinkColor(d, theme),
                        })
                    )
                })
        )
    })
}

Bar.propTypes = BarPropTypes

export default enhance(Bar)
