import _isEqual from 'lodash/isEqual'
import _max from 'lodash/max'
import _min from 'lodash/min' /*
                                * This file is part of the nivo project.
                                *
                                * Copyright 2016-present, Raphaël Benitte.
                                *
                                * For the full copyright and license information, please view the LICENSE
                                * file that was distributed with this source code.
                                */

import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withState from 'recompose/withState'
import pure from 'recompose/pure'
import { scaleOrdinal, scaleLinear } from 'd3-scale'
import { withTheme, withDimensions, withMotion } from '../../../hocs'
import { getInheritedColorGenerator, guessQuantizeColorScale } from '../../../lib/colors'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import { HeatMapDefaultProps } from './props'

var computeX = function computeX(column, cellWidth, padding) {
    return column * cellWidth + cellWidth * 0.5 + padding * column + padding
}
var computeY = function computeY(row, cellHeight, padding) {
    return row * cellHeight + cellHeight * 0.5 + padding * row + padding
}

export default (function(Component) {
    return compose(
        defaultProps(HeatMapDefaultProps),
        withState('currentNode', 'setCurrentNode', null),
        withTheme(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['colors'], function(_ref) {
            var colors = _ref.colors
            return {
                colorScale: guessQuantizeColorScale(colors),
            }
        }),
        withPropsOnChange(['indexBy'], function(_ref2) {
            var indexBy = _ref2.indexBy
            return {
                getIndex: getAccessorFor(indexBy),
            }
        }),
        withPropsOnChange(['data', 'keys', 'width', 'height', 'padding', 'forceSquare'], function(
            _ref3
        ) {
            var data = _ref3.data,
                keys = _ref3.keys,
                width = _ref3.width,
                height = _ref3.height,
                padding = _ref3.padding,
                forceSquare = _ref3.forceSquare

            var columns = keys.length
            var rows = data.length

            var cellWidth = Math.max((width - padding * (columns + 1)) / columns, 0)
            var cellHeight = Math.max((height - padding * (rows + 1)) / rows, 0)

            var offsetX = 0
            var offsetY = 0
            if (forceSquare === true) {
                var cellSize = Math.min(cellWidth, cellHeight)
                cellWidth = cellSize
                cellHeight = cellSize

                offsetX = (width - ((cellWidth + padding) * columns + padding)) / 2
                offsetY = (height - ((cellHeight + padding) * rows + padding)) / 2
            }

            return {
                cellWidth: cellWidth,
                cellHeight: cellHeight,
                offsetX: offsetX,
                offsetY: offsetY,
            }
        }),
        withPropsOnChange(['data', 'getIndex'], function(_ref4) {
            var data = _ref4.data,
                getIndex = _ref4.getIndex
            return {
                indices: data.map(getIndex),
            }
        }),
        withPropsOnChange(
            function(prev, next) {
                return (
                    prev.keys !== next.keys ||
                    prev.cellWidth !== next.cellWidth ||
                    prev.cellHeight !== next.cellHeight ||
                    prev.padding !== next.padding ||
                    !_isEqual(prev.indices, next.indices)
                )
            },
            function(_ref5) {
                var indices = _ref5.indices,
                    keys = _ref5.keys,
                    cellWidth = _ref5.cellWidth,
                    cellHeight = _ref5.cellHeight,
                    padding = _ref5.padding
                return {
                    xScale: scaleOrdinal(
                        keys.map(function(key, i) {
                            return computeX(i, cellWidth, padding)
                        })
                    ).domain(keys),
                    yScale: scaleOrdinal(
                        indices.map(function(d, i) {
                            return computeY(i, cellHeight, padding)
                        })
                    ).domain(indices),
                }
            }
        ),
        withPropsOnChange(['data', 'keys', 'minValue', 'maxValue'], function(_ref6) {
            var data = _ref6.data,
                keys = _ref6.keys,
                _minValue = _ref6.minValue,
                _maxValue = _ref6.maxValue

            var minValue = _minValue
            var maxValue = _maxValue
            if (minValue === 'auto' || maxValue === 'auto') {
                var allValues = data.reduce(function(acc, row) {
                    return acc.concat(
                        keys.map(function(key) {
                            return row[key]
                        })
                    )
                }, [])

                if (minValue === 'auto') minValue = _min(allValues)
                if (maxValue === 'auto') maxValue = _max(allValues)
            }

            return {
                minValue: Math.min(minValue, maxValue),
                maxValue: Math.max(maxValue, minValue),
            }
        }),
        withPropsOnChange(['colorScale', 'minValue', 'maxValue'], function(_ref7) {
            var colorScale = _ref7.colorScale,
                minValue = _ref7.minValue,
                maxValue = _ref7.maxValue
            return {
                colorScale: colorScale.domain([minValue, maxValue]),
            }
        }),
        withPropsOnChange(['sizeVariation', 'minValue', 'maxValue'], function(_ref8) {
            var sizeVariation = _ref8.sizeVariation,
                minValue = _ref8.minValue,
                maxValue = _ref8.maxValue

            var sizeScale = void 0
            if (sizeVariation > 0) {
                sizeScale = scaleLinear()
                    .range([1 - sizeVariation, 1])
                    .domain([minValue, maxValue])
            }

            return { sizeScale: sizeScale }
        }),
        withPropsOnChange(['cellBorderColor'], function(_ref9) {
            var cellBorderColor = _ref9.cellBorderColor
            return {
                getCellBorderColor: getInheritedColorGenerator(cellBorderColor),
            }
        }),
        withPropsOnChange(['labelTextColor'], function(_ref10) {
            var labelTextColor = _ref10.labelTextColor
            return {
                getLabelTextColor: getInheritedColorGenerator(labelTextColor),
            }
        }),
        pure
    )(Component)
})
