import _sortBy from 'lodash/sortBy'
import _range from 'lodash/range'

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

import SvgWrapper from '../SvgWrapper'
import Container from '../Container'
import Axes from '../../axes/Axes'
import Grid from '../../axes/Grid'
import StreamLayers from './StreamLayers'
import StreamSlices from './StreamSlices'
import { StreamPropTypes } from './props'
import enhance from './enhance'

var Stream = function Stream(_ref) {
    var data = _ref.data,
        keys = _ref.keys,
        xScale = _ref.xScale,
        yScale = _ref.yScale,
        layers = _ref.layers,
        areaGenerator = _ref.areaGenerator,
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
        theme = _ref.theme,
        getColor = _ref.getColor,
        fillOpacity = _ref.fillOpacity,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping,
        isInteractive = _ref.isInteractive,
        enableStackTooltip = _ref.enableStackTooltip

    var enhancedLayers = layers.map(function(points, i) {
        var layer = points.map(function(point, i) {
            return {
                index: i,
                x: xScale(i),
                value: point.value,
                y1: yScale(point[0]),
                y2: yScale(point[1]),
            }
        })

        return {
            id: keys[i],
            layer: layer,
            path: areaGenerator(layer),
            color: getColor(i),
        }
    })

    var slices = _range(data.length).map(function(i) {
        return {
            index: i,
            x: enhancedLayers[0].layer[i].x,
            stack: _sortBy(
                enhancedLayers.map(function(layer) {
                    return _extends(
                        {
                            id: layer.id,
                            color: layer.color,
                        },
                        layer.layer[i]
                    )
                }),
                'y2'
            ),
        }
    })

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
            React.createElement(
                StreamLayers,
                _extends(
                    {
                        layers: enhancedLayers,
                        fillOpacity: fillOpacity,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        theme: theme,
                    },
                    motionProps
                )
            ),
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
            isInteractive &&
                enableStackTooltip &&
                React.createElement(StreamSlices, {
                    slices: slices,
                    height: height,
                    showTooltip: showTooltip,
                    hideTooltip: hideTooltip,
                    theme: theme,
                })
        )
    })
}

Stream.propTypes = StreamPropTypes

var enhancedStream = enhance(Stream)
enhancedStream.displayName = 'enhance(Stream)'

export default enhancedStream
