import _range from 'lodash/range'
import _max from 'lodash/max'
import _min from 'lodash/min'
/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

import { stack as d3Stack, area } from 'd3-shape'
import { scaleLinear, scalePoint } from 'd3-scale'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { stackOrderFromProp, stackOffsetFromProp } from '../../../props'
import { withTheme, withCurve, withDimensions, withMotion } from '../../../hocs'
import { getColorRange } from '../../../lib/colors'
import { StreamDefaultProps } from './props'

var stackMin = function stackMin(layers) {
    return _min(
        layers.reduce(function(acc, layer) {
            return [].concat(
                acc,
                layer.map(function(d) {
                    return d[0]
                })
            )
        }, [])
    )
}
var stackMax = function stackMax(layers) {
    return _max(
        layers.reduce(function(acc, layer) {
            return [].concat(
                acc,
                layer.map(function(d) {
                    return d[1]
                })
            )
        }, [])
    )
}

export default (function(Component) {
    return compose(
        defaultProps(StreamDefaultProps),
        withTheme(),
        withCurve(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['curveInterpolator'], function(_ref) {
            var curveInterpolator = _ref.curveInterpolator
            return {
                areaGenerator: area()
                    .x(function(_ref2) {
                        var x = _ref2.x
                        return x
                    })
                    .y0(function(_ref3) {
                        var y1 = _ref3.y1
                        return y1
                    })
                    .y1(function(_ref4) {
                        var y2 = _ref4.y2
                        return y2
                    })
                    .curve(curveInterpolator),
            }
        }),
        withPropsOnChange(['colors'], function(_ref5) {
            var colors = _ref5.colors
            return {
                getColor: getColorRange(colors),
            }
        }),
        withPropsOnChange(['keys', 'offsetType', 'order'], function(_ref6) {
            var keys = _ref6.keys,
                offsetType = _ref6.offsetType,
                order = _ref6.order
            return {
                stack: d3Stack()
                    .keys(keys)
                    .offset(stackOffsetFromProp(offsetType))
                    .order(stackOrderFromProp(order)),
            }
        }),
        withPropsOnChange(['stack', 'data', 'width', 'height'], function(_ref7) {
            var stack = _ref7.stack,
                data = _ref7.data,
                width = _ref7.width,
                height = _ref7.height

            var layers = stack(data)
            layers.forEach(function(layer) {
                layer.forEach(function(point) {
                    point.value = point.data[layer.key]
                })
            })

            var minValue = stackMin(layers)
            var maxValue = stackMax(layers)

            return {
                layers: layers,
                xScale: scalePoint()
                    .domain(_range(data.length))
                    .range([0, width]),
                yScale: scaleLinear()
                    .domain([minValue, maxValue])
                    .range([height, 0]),
            }
        }),
        pure
    )(Component)
})
