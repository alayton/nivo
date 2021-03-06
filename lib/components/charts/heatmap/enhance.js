'use strict'

exports.__esModule = true

var _isEqual2 = require('lodash/isEqual')

var _isEqual3 = _interopRequireDefault(_isEqual2)

var _max2 = require('lodash/max')

var _max3 = _interopRequireDefault(_max2)

var _min2 = require('lodash/min')

var _min3 = _interopRequireDefault(_min2)

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _withState = require('recompose/withState')

var _withState2 = _interopRequireDefault(_withState)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _d3Scale = require('d3-scale')

var _hocs = require('../../../hocs')

var _colors = require('../../../lib/colors')

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _props = require('./props')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var computeX = function computeX(column, cellWidth, padding) {
    return column * cellWidth + cellWidth * 0.5 + padding * column + padding
}
var computeY = function computeY(row, cellHeight, padding) {
    return row * cellHeight + cellHeight * 0.5 + padding * row + padding
}

exports.default = function(Component) {
    return (0, _compose2.default)(
        (0, _defaultProps2.default)(_props.HeatMapDefaultProps),
        (0, _withState2.default)('currentNode', 'setCurrentNode', null),
        (0, _hocs.withTheme)(),
        (0, _hocs.withDimensions)(),
        (0, _hocs.withMotion)(),
        (0, _withPropsOnChange2.default)(['colors'], function(_ref) {
            var colors = _ref.colors
            return {
                colorScale: (0, _colors.guessQuantizeColorScale)(colors),
            }
        }),
        (0, _withPropsOnChange2.default)(['indexBy'], function(_ref2) {
            var indexBy = _ref2.indexBy
            return {
                getIndex: (0, _propertiesConverters.getAccessorFor)(indexBy),
            }
        }),
        (0, _withPropsOnChange2.default)(
            ['data', 'keys', 'width', 'height', 'padding', 'forceSquare'],
            function(_ref3) {
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
            }
        ),
        (0, _withPropsOnChange2.default)(['data', 'getIndex'], function(_ref4) {
            var data = _ref4.data,
                getIndex = _ref4.getIndex
            return {
                indices: data.map(getIndex),
            }
        }),
        (0, _withPropsOnChange2.default)(
            function(prev, next) {
                return (
                    prev.keys !== next.keys ||
                    prev.cellWidth !== next.cellWidth ||
                    prev.cellHeight !== next.cellHeight ||
                    prev.padding !== next.padding ||
                    !(0, _isEqual3.default)(prev.indices, next.indices)
                )
            },
            function(_ref5) {
                var indices = _ref5.indices,
                    keys = _ref5.keys,
                    cellWidth = _ref5.cellWidth,
                    cellHeight = _ref5.cellHeight,
                    padding = _ref5.padding
                return {
                    xScale: (0, _d3Scale.scaleOrdinal)(
                        keys.map(function(key, i) {
                            return computeX(i, cellWidth, padding)
                        })
                    ).domain(keys),
                    yScale: (0, _d3Scale.scaleOrdinal)(
                        indices.map(function(d, i) {
                            return computeY(i, cellHeight, padding)
                        })
                    ).domain(indices),
                }
            }
        ),
        (0, _withPropsOnChange2.default)(['data', 'keys', 'minValue', 'maxValue'], function(_ref6) {
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

                if (minValue === 'auto') minValue = (0, _min3.default)(allValues)
                if (maxValue === 'auto') maxValue = (0, _max3.default)(allValues)
            }

            return {
                minValue: Math.min(minValue, maxValue),
                maxValue: Math.max(maxValue, minValue),
            }
        }),
        (0, _withPropsOnChange2.default)(['colorScale', 'minValue', 'maxValue'], function(_ref7) {
            var colorScale = _ref7.colorScale,
                minValue = _ref7.minValue,
                maxValue = _ref7.maxValue
            return {
                colorScale: colorScale.domain([minValue, maxValue]),
            }
        }),
        (0, _withPropsOnChange2.default)(['sizeVariation', 'minValue', 'maxValue'], function(
            _ref8
        ) {
            var sizeVariation = _ref8.sizeVariation,
                minValue = _ref8.minValue,
                maxValue = _ref8.maxValue

            var sizeScale = void 0
            if (sizeVariation > 0) {
                sizeScale = (0, _d3Scale.scaleLinear)()
                    .range([1 - sizeVariation, 1])
                    .domain([minValue, maxValue])
            }

            return { sizeScale: sizeScale }
        }),
        (0, _withPropsOnChange2.default)(['cellBorderColor'], function(_ref9) {
            var cellBorderColor = _ref9.cellBorderColor
            return {
                getCellBorderColor: (0, _colors.getInheritedColorGenerator)(cellBorderColor),
            }
        }),
        (0, _withPropsOnChange2.default)(['labelTextColor'], function(_ref10) {
            var labelTextColor = _ref10.labelTextColor
            return {
                getLabelTextColor: (0, _colors.getInheritedColorGenerator)(labelTextColor),
            }
        }),
        _pure2.default
    )(Component)
}
