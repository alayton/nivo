'use strict'

exports.__esModule = true
exports.PieDefaultProps = undefined

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

var _reactMotion = require('react-motion')

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _colors = require('../../../lib/colors')

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _polar = require('../../../lib/polar')

var _hocs = require('../../../hocs')

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _d3Shape = require('d3-shape')

var _PieRadialLabels = require('./PieRadialLabels')

var _PieRadialLabels2 = _interopRequireDefault(_PieRadialLabels)

var _PieSlicesLabels = require('./PieSlicesLabels')

var _PieSlicesLabels2 = _interopRequireDefault(_PieSlicesLabels)

var _BasicTooltip = require('../../tooltip/BasicTooltip')

var _BasicTooltip2 = _interopRequireDefault(_BasicTooltip)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var Pie = function Pie(_ref) {
    var data = _ref.data,
        margin = _ref.margin,
        width = _ref.width,
        height = _ref.height,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        _innerRadius = _ref.innerRadius,
        _padAngle = _ref.padAngle,
        cornerRadius = _ref.cornerRadius,
        borderWidth = _ref.borderWidth,
        _borderColor = _ref.borderColor,
        enableRadialLabels = _ref.enableRadialLabels,
        radialLabel = _ref.radialLabel,
        radialLabelsSkipAngle = _ref.radialLabelsSkipAngle,
        radialLabelsLinkOffset = _ref.radialLabelsLinkOffset,
        radialLabelsLinkDiagonalLength = _ref.radialLabelsLinkDiagonalLength,
        radialLabelsLinkHorizontalLength = _ref.radialLabelsLinkHorizontalLength,
        radialLabelsLinkStrokeWidth = _ref.radialLabelsLinkStrokeWidth,
        radialLabelsTextXOffset = _ref.radialLabelsTextXOffset,
        radialLabelsTextColor = _ref.radialLabelsTextColor,
        radialLabelsLinkColor = _ref.radialLabelsLinkColor,
        enableSlicesLabels = _ref.enableSlicesLabels,
        sliceLabel = _ref.sliceLabel,
        slicesLabelsSkipAngle = _ref.slicesLabelsSkipAngle,
        slicesLabelsTextColor = _ref.slicesLabelsTextColor,
        theme = _ref.theme,
        getColor = _ref.getColor,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping,
        isInteractive = _ref.isInteractive

    var centerX = width / 2
    var centerY = height / 2

    var padAngle = (0, _polar.degreesToRadians)(_padAngle)

    var borderColor = (0, _colors.getInheritedColorGenerator)(_borderColor)

    var motionProps = {
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness,
    }

    var radialLabelsProps = {
        label: (0, _propertiesConverters.getLabelGenerator)(radialLabel),
        skipAngle: radialLabelsSkipAngle,
        linkOffset: radialLabelsLinkOffset,
        linkDiagonalLength: radialLabelsLinkDiagonalLength,
        linkHorizontalLength: radialLabelsLinkHorizontalLength,
        linkStrokeWidth: radialLabelsLinkStrokeWidth,
        textXOffset: radialLabelsTextXOffset,
        textColor: (0, _colors.getInheritedColorGenerator)(
            radialLabelsTextColor,
            'labels.textColor'
        ),
        linkColor: (0, _colors.getInheritedColorGenerator)(radialLabelsLinkColor, 'axis.tickColor'),
    }

    var slicesLabelsProps = {
        label: (0, _propertiesConverters.getLabelGenerator)(sliceLabel),
        skipAngle: slicesLabelsSkipAngle,
        textColor: (0, _colors.getInheritedColorGenerator)(
            slicesLabelsTextColor,
            'labels.textColor'
        ),
    }

    var radius = Math.min(width, height) / 2
    var innerRadius = radius * Math.min(_innerRadius, 1)

    var pie = (0, _d3Shape.pie)()
    pie.value(function(d) {
        return d.value
    })

    var arc = (0, _d3Shape.arc)()
    arc.outerRadius(radius)

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
                    _reactMotion.Motion,
                    {
                        style: {
                            centerX: (0, _reactMotion.spring)(centerX, motionProps),
                            centerY: (0, _reactMotion.spring)(centerY, motionProps),
                            innerRadius: (0, _reactMotion.spring)(innerRadius),
                            padAngle: (0, _reactMotion.spring)(padAngle, motionProps),
                            cornerRadius: (0, _reactMotion.spring)(cornerRadius, motionProps),
                        },
                    },
                    function(interpolatingStyle) {
                        var interpolatedPie = pie.padAngle(interpolatingStyle.padAngle)
                        var interpolatedArc = arc
                            .cornerRadius(interpolatingStyle.cornerRadius)
                            .innerRadius(interpolatingStyle.innerRadius)

                        var arcsData = interpolatedPie(data).map(function(d) {
                            var angle = d.endAngle - d.startAngle

                            return _extends({}, d, {
                                angle: angle,
                                angleDegrees: (0, _polar.radiansToDegrees)(angle),
                                data: _extends({}, d.data, {
                                    color: getColor(d.data),
                                }),
                            })
                        })

                        return _react2.default.createElement(
                            'g',
                            {
                                transform:
                                    'translate(' +
                                    interpolatingStyle.centerX +
                                    ', ' +
                                    interpolatingStyle.centerY +
                                    ')',
                            },
                            arcsData.map(function(d) {
                                var handleTooltip = function handleTooltip(e) {
                                    return showTooltip(
                                        _react2.default.createElement(_BasicTooltip2.default, {
                                            id: d.data.label,
                                            value: d.data.value,
                                            enableChip: true,
                                            color: d.data.color,
                                            theme: theme,
                                        }),
                                        e
                                    )
                                }

                                return _react2.default.createElement('path', {
                                    key: d.data.id,
                                    d: interpolatedArc(d),
                                    fill: d.data.color,
                                    strokeWidth: borderWidth,
                                    stroke: borderColor(d.data),
                                    onMouseEnter: handleTooltip,
                                    onMouseMove: handleTooltip,
                                    onMouseLeave: hideTooltip,
                                })
                            }),
                            enableSlicesLabels &&
                                _react2.default.createElement(
                                    _PieSlicesLabels2.default,
                                    _extends(
                                        {
                                            data: arcsData,
                                            radius: radius,
                                            innerRadius: interpolatingStyle.innerRadius,
                                            theme: theme,
                                        },
                                        slicesLabelsProps
                                    )
                                ),
                            enableRadialLabels &&
                                _react2.default.createElement(
                                    _PieRadialLabels2.default,
                                    _extends(
                                        {
                                            data: arcsData,
                                            radius: radius,
                                            theme: theme,
                                        },
                                        radialLabelsProps
                                    )
                                )
                        )
                    }
                )
            )
        }
    )
}

Pie.propTypes = {
    data: _propTypes2.default.arrayOf(
        _propTypes2.default.shape({
            id: _propTypes2.default.string.isRequired,
            value: _propTypes2.default.number.isRequired,
        })
    ).isRequired,

    innerRadius: _propTypes2.default.number.isRequired,
    padAngle: _propTypes2.default.number.isRequired,
    cornerRadius: _propTypes2.default.number.isRequired,

    // border
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]),

    // radial labels
    enableRadialLabels: _propTypes2.default.bool.isRequired,
    radialLabel: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]),
    radialLabelsSkipAngle: _propTypes2.default.number,
    radialLabelsTextXOffset: _propTypes2.default.number,
    radialLabelsTextColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]),
    radialLabelsLinkOffset: _propTypes2.default.number,
    radialLabelsLinkDiagonalLength: _propTypes2.default.number,
    radialLabelsLinkHorizontalLength: _propTypes2.default.number,
    radialLabelsLinkStrokeWidth: _propTypes2.default.number,
    radialLabelsLinkColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]),

    // slices labels
    enableSlicesLabels: _propTypes2.default.bool.isRequired,
    sliceLabel: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]),
    slicesLabelsSkipAngle: _propTypes2.default.number,
    slicesLabelsTextColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]),

    // interactivity
    isInteractive: _propTypes2.default.bool,
}

var PieDefaultProps = (exports.PieDefaultProps = {
    innerRadius: 0,
    padAngle: 0,
    cornerRadius: 0,

    // border
    borderWidth: 0,
    borderColor: 'inherit:darker(1)',

    // radial labels
    enableRadialLabels: true,
    radialLabel: 'id',
    radialLabelsTextColor: 'theme',
    radialLabelsLinkColor: 'theme',

    // slices labels
    enableSlicesLabels: true,
    sliceLabel: 'value',
    slicesLabelsTextColor: 'theme',

    // interactivity
    isInteractive: true,
})

var enhance = (0, _compose2.default)(
    (0, _defaultProps2.default)(PieDefaultProps),
    (0, _hocs.withTheme)(),
    (0, _hocs.withDimensions)(),
    (0, _hocs.withColors)(),
    _pure2.default
)

var enhancedPie = enhance(Pie)
enhancedPie.displayName = 'enhance(Pie)'

exports.default = enhancedPie
