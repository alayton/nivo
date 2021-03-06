'use strict'

exports.__esModule = true

var _range2 = require('lodash/range')

var _range3 = _interopRequireDefault(_range2)

var _max2 = require('lodash/max')

var _max3 = _interopRequireDefault(_max2)

var _min2 = require('lodash/min')

var _min3 = _interopRequireDefault(_min2)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _d3Shape = require('d3-shape')

var _d3Scale = require('d3-scale')

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _props = require('../../../props')

var _hocs = require('../../../hocs')

var _colors = require('../../../lib/colors')

var _props2 = require('./props')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var stackMin = function stackMin(layers) {
    return (0, _min3.default)(
        layers.reduce(function(acc, layer) {
            return [].concat(
                acc,
                layer.map(function(d) {
                    return d[0]
                })
            )
        }, [])
    )
} /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */

var stackMax = function stackMax(layers) {
    return (0, _max3.default)(
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

exports.default = function(Component) {
    return (0, _compose2.default)(
        (0, _defaultProps2.default)(_props2.StreamDefaultProps),
        (0, _hocs.withTheme)(),
        (0, _hocs.withCurve)(),
        (0, _hocs.withDimensions)(),
        (0, _hocs.withMotion)(),
        (0, _withPropsOnChange2.default)(['curveInterpolator'], function(_ref) {
            var curveInterpolator = _ref.curveInterpolator
            return {
                areaGenerator: (0, _d3Shape.area)()
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
        (0, _withPropsOnChange2.default)(['colors'], function(_ref5) {
            var colors = _ref5.colors
            return {
                getColor: (0, _colors.getColorRange)(colors),
            }
        }),
        (0, _withPropsOnChange2.default)(['keys', 'offsetType', 'order'], function(_ref6) {
            var keys = _ref6.keys,
                offsetType = _ref6.offsetType,
                order = _ref6.order
            return {
                stack: (0, _d3Shape.stack)()
                    .keys(keys)
                    .offset((0, _props.stackOffsetFromProp)(offsetType))
                    .order((0, _props.stackOrderFromProp)(order)),
            }
        }),
        (0, _withPropsOnChange2.default)(['stack', 'data', 'width', 'height'], function(_ref7) {
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
                xScale: (0, _d3Scale.scalePoint)()
                    .domain((0, _range3.default)(data.length))
                    .range([0, width]),
                yScale: (0, _d3Scale.scaleLinear)()
                    .domain([minValue, maxValue])
                    .range([height, 0]),
            }
        }),
        _pure2.default
    )(Component)
}
