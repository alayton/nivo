'use strict'

exports.__esModule = true
exports.RadarDefaultProps = undefined

var _max2 = require('lodash/max')

var _max3 = _interopRequireDefault(_max2)

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

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _props = require('../../../props')

var _hocs = require('../../../hocs')

var _d3Scale = require('d3-scale')

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _RadarShapes = require('./RadarShapes')

var _RadarShapes2 = _interopRequireDefault(_RadarShapes)

var _RadarGrid = require('./RadarGrid')

var _RadarGrid2 = _interopRequireDefault(_RadarGrid)

var _RadarTooltip = require('./RadarTooltip')

var _RadarTooltip2 = _interopRequireDefault(_RadarTooltip)

var _RadarDots = require('./RadarDots')

var _RadarDots2 = _interopRequireDefault(_RadarDots)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

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
                    'g',
                    { transform: 'translate(' + centerX + ', ' + centerY + ')' },
                    _react2.default.createElement(
                        _RadarGrid2.default,
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
                    _react2.default.createElement(
                        _RadarShapes2.default,
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
                        _react2.default.createElement(_RadarTooltip2.default, {
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
                        _react2.default.createElement(
                            _RadarDots2.default,
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
        }
    )
}

Radar.propTypes = {
    // data
    data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    keys: _propTypes2.default.arrayOf(
        _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
    ).isRequired,
    indexBy: _propTypes2.default.oneOfType([
        _propTypes2.default.number,
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]).isRequired,
    getIndex: _propTypes2.default.func.isRequired, // computed
    indices: _propTypes2.default.arrayOf(
        _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
    ).isRequired, // computed

    curve: _props.closedCurvePropType.isRequired,
    curveInterpolator: _propTypes2.default.func.isRequired, // computed

    // border
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]),

    // grid
    gridLevels: _propTypes2.default.number,
    gridShape: _propTypes2.default.oneOf(['circular', 'linear']),
    gridLabelOffset: _propTypes2.default.number,

    // dots
    enableDots: _propTypes2.default.bool.isRequired,
    dotSymbol: _propTypes2.default.func,
    dotSize: _propTypes2.default.number,
    dotColor: _propTypes2.default.any,
    dotBorderWidth: _propTypes2.default.number,
    dotBorderColor: _propTypes2.default.any,
    enableDotLabel: _propTypes2.default.bool,
    dotLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
    dotLabelFormat: _propTypes2.default.string,
    dotLabelYOffset: _propTypes2.default.number,

    // theming
    getColor: _propTypes2.default.func.isRequired, // computed
    colorByKey: _propTypes2.default.object.isRequired, // computed
    fillOpacity: _propTypes2.default.number.isRequired,

    // interactivity
    isInteractive: _propTypes2.default.bool.isRequired,
}

var RadarDefaultProps = (exports.RadarDefaultProps = {
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
})

var enhance = (0, _compose2.default)(
    (0, _defaultProps2.default)(RadarDefaultProps),
    (0, _hocs.withTheme)(),
    (0, _hocs.withColors)({
        defaultColorBy: 'key',
    }),
    (0, _hocs.withCurve)(),
    (0, _hocs.withDimensions)(),
    (0, _hocs.withMotion)(),
    (0, _withPropsOnChange2.default)(['indexBy'], function(_ref3) {
        var indexBy = _ref3.indexBy
        return {
            getIndex: (0, _propertiesConverters.getAccessorFor)(indexBy),
        }
    }),
    (0, _withPropsOnChange2.default)(['data', 'getIndex'], function(_ref4) {
        var data = _ref4.data,
            getIndex = _ref4.getIndex
        return {
            indices: data.map(getIndex),
        }
    }),
    (0, _withPropsOnChange2.default)(['keys', 'getColor'], function(_ref5) {
        var keys = _ref5.keys,
            getColor = _ref5.getColor
        return {
            colorByKey: keys.reduce(function(mapping, key, index) {
                mapping[key] = getColor({ key: key, index: index })
                return mapping
            }, {}),
        }
    }),
    (0, _withPropsOnChange2.default)(['keys', 'indexBy', 'data', 'width', 'height'], function(
        _ref6
    ) {
        var data = _ref6.data,
            keys = _ref6.keys,
            width = _ref6.width,
            height = _ref6.height

        var maxValue = (0, _max3.default)(
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
        var radiusScale = (0, _d3Scale.scaleLinear)()
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
    _pure2.default
)

var enhancedRadar = enhance(Radar)
enhancedRadar.displayName = 'enhance(Radar)'

exports.default = enhancedRadar
