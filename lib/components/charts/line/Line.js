'use strict'

exports.__esModule = true
exports.LineDefaultProps = undefined

var _sortBy2 = require('lodash/sortBy')

var _sortBy3 = _interopRequireDefault(_sortBy2)

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
    } /*
                                                                                                                                                                                                                                                                   * This file is part of the nivo project.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                   * file that was distributed with this source code.
                                                                                                                                                                                                                                                                   */

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _d3Shape = require('d3-shape')

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _props = require('../../../props')

var _colors = require('../../../lib/colors')

var _hocs = require('../../../hocs')

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _line = require('../../../lib/charts/line')

var _CartesianMarkers = require('../../cartesian/markers/CartesianMarkers')

var _CartesianMarkers2 = _interopRequireDefault(_CartesianMarkers)

var _Axes = require('../../axes/Axes')

var _Axes2 = _interopRequireDefault(_Axes)

var _Grid = require('../../axes/Grid')

var _Grid2 = _interopRequireDefault(_Grid)

var _LineLines = require('./LineLines')

var _LineLines2 = _interopRequireDefault(_LineLines)

var _LineSlices = require('./LineSlices')

var _LineSlices2 = _interopRequireDefault(_LineSlices)

var _LineDots = require('./LineDots')

var _LineDots2 = _interopRequireDefault(_LineDots)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

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

    return _react2.default.createElement(
        _Container2.default,
        { isInteractive: isInteractive, theme: theme },
        function(_ref2) {
            var showTooltip = _ref2.showTooltip,
                hideTooltip = _ref2.hideTooltip
            return _react2.default.createElement(
                _SvgWrapper2.default,
                { width: outerWidth, height: outerHeight, margin: margin },
                _react2.default.createElement(
                    _Grid2.default,
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
                _react2.default.createElement(_CartesianMarkers2.default, {
                    markers: markers,
                    width: width,
                    height: height,
                    xScale: xScale,
                    yScale: yScale,
                    theme: theme,
                }),
                _react2.default.createElement(
                    _Axes2.default,
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
                _react2.default.createElement(
                    _LineLines2.default,
                    _extends({ lines: lines, lineGenerator: lineGenerator }, motionProps)
                ),
                isInteractive &&
                    enableStackTooltip &&
                    _react2.default.createElement(_LineSlices2.default, {
                        slices: slices,
                        height: height,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        theme: theme,
                    }),
                enableDots &&
                    _react2.default.createElement(
                        _LineDots2.default,
                        _extends(
                            {
                                lines: lines,
                                symbol: dotSymbol,
                                size: dotSize,
                                color: (0, _colors.getInheritedColorGenerator)(dotColor),
                                borderWidth: dotBorderWidth,
                                borderColor: (0, _colors.getInheritedColorGenerator)(
                                    dotBorderColor
                                ),
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
        }
    )
}

Line.propTypes = {
    // data
    data: _propTypes2.default.arrayOf(
        _propTypes2.default.shape({
            id: _propTypes2.default.string.isRequired,
            data: _propTypes2.default.arrayOf(
                _propTypes2.default.shape({
                    x: _propTypes2.default.oneOfType([
                        _propTypes2.default.number,
                        _propTypes2.default.string,
                    ]).isRequired,
                    y: _propTypes2.default.oneOfType([
                        _propTypes2.default.number,
                        _propTypes2.default.string,
                    ]).isRequired,
                })
            ).isRequired,
        })
    ).isRequired,

    stacked: _propTypes2.default.bool.isRequired,
    curve: _props.lineCurvePropType.isRequired,
    lineGenerator: _propTypes2.default.func.isRequired,

    lines: _propTypes2.default.array.isRequired,
    slices: _propTypes2.default.array.isRequired,

    minY: _propTypes2.default.oneOfType([
        _propTypes2.default.number,
        _propTypes2.default.string,
        _propTypes2.default.oneOf(['auto']),
    ]).isRequired,
    maxY: _propTypes2.default.oneOfType([
        _propTypes2.default.number,
        _propTypes2.default.string,
        _propTypes2.default.oneOf(['auto']),
    ]).isRequired,
    xScale: _propTypes2.default.func.isRequired, // computed
    yScale: _propTypes2.default.func.isRequired, // computed

    // axes & grid
    axisTop: _propTypes2.default.object,
    axisRight: _propTypes2.default.object,
    axisBottom: _propTypes2.default.object,
    axisLeft: _propTypes2.default.object,
    enableGridX: _propTypes2.default.bool.isRequired,
    enableGridY: _propTypes2.default.bool.isRequired,

    // dots
    enableDots: _propTypes2.default.bool.isRequired,
    dotSymbol: _propTypes2.default.func,
    dotSize: _propTypes2.default.number.isRequired,
    dotColor: _propTypes2.default.any.isRequired,
    dotBorderWidth: _propTypes2.default.number.isRequired,
    dotBorderColor: _propTypes2.default.any.isRequired,
    enableDotLabel: _propTypes2.default.bool.isRequired,

    // markers
    markers: _propTypes2.default.arrayOf(
        _propTypes2.default.shape({
            axis: _propTypes2.default.oneOf(['x', 'y']).isRequired,
            value: _propTypes2.default.oneOfType([
                _propTypes2.default.number,
                _propTypes2.default.string,
            ]).isRequired,
            style: _propTypes2.default.object,
        })
    ),

    // theming
    getColor: _propTypes2.default.func.isRequired,

    // interactivity
    isInteractive: _propTypes2.default.bool.isRequired,

    // stack tooltip
    enableStackTooltip: _propTypes2.default.bool.isRequired,
}

var LineDefaultProps = (exports.LineDefaultProps = {
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
})

var enhance = (0, _compose2.default)(
    (0, _defaultProps2.default)(LineDefaultProps),
    (0, _hocs.withTheme)(),
    (0, _hocs.withColors)(),
    (0, _hocs.withDimensions)(),
    (0, _hocs.withMotion)(),
    (0, _withPropsOnChange2.default)(['curve'], function(_ref3) {
        var curve = _ref3.curve
        return {
            lineGenerator: (0, _d3Shape.line)()
                .x(function(d) {
                    return d.x
                })
                .y(function(d) {
                    return d.y
                })
                .curve((0, _props.curveFromProp)(curve)),
        }
    }),
    (0, _withPropsOnChange2.default)(
        ['data', 'stacked', 'width', 'height', 'minY', 'maxY'],
        function(_ref4) {
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
                scales = (0, _line.getStackedScales)(args)
            } else {
                scales = (0, _line.getScales)(args)
            }

            return _extends(
                {
                    margin: margin,
                    width: width,
                    height: height,
                },
                scales
            )
        }
    ),
    (0, _withPropsOnChange2.default)(['getColor', 'xScale', 'yScale'], function(_ref5) {
        var data = _ref5.data,
            stacked = _ref5.stacked,
            xScale = _ref5.xScale,
            yScale = _ref5.yScale,
            getColor = _ref5.getColor

        var lines = void 0
        if (stacked === true) {
            lines = (0, _line.generateStackedLines)(data, xScale, yScale, getColor)
        } else {
            lines = (0, _line.generateLines)(data, xScale, yScale, getColor)
        }

        var slices = xScale.domain().map(function(id, i) {
            var points = (0, _sortBy3.default)(
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
    _pure2.default
)

var enhancedLine = enhance(Line)
enhancedLine.displayName = 'enhance(Line)'

exports.default = enhancedLine
