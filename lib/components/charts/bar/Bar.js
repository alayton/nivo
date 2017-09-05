'use strict'

exports.__esModule = true

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

var _reactMotion = require('react-motion')

var _bar = require('../../../lib/charts/bar')

var _enhance = require('./enhance')

var _enhance2 = _interopRequireDefault(_enhance)

var _props = require('./props')

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _Grid = require('../../axes/Grid')

var _Grid2 = _interopRequireDefault(_Grid)

var _CartesianMarkers = require('../../cartesian/markers/CartesianMarkers')

var _CartesianMarkers2 = _interopRequireDefault(_CartesianMarkers)

var _Axes = require('../../axes/Axes')

var _Axes2 = _interopRequireDefault(_Axes)

var _BarItem = require('./BarItem')

var _BarItem2 = _interopRequireDefault(_BarItem)

var _BarItemLabel = require('./BarItemLabel')

var _BarItemLabel2 = _interopRequireDefault(_BarItemLabel)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

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
        result = (0,
        _bar.generateGroupedBars)(layout, data, getIndex, keys, width, height, getColor, {
            xPadding: xPadding,
        })
    } else if (groupMode === 'stacked') {
        result = (0,
        _bar.generateStackedBars)(layout, data, getIndex, keys, width, height, getColor, {
            xPadding: xPadding,
        })
    }

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

            var bars = void 0
            if (animate === true) {
                bars = _react2.default.createElement(
                    _reactMotion.TransitionMotion,
                    {
                        styles: result.bars.map(function(bar) {
                            return {
                                key: bar.key,
                                data: bar,
                                style: {
                                    x: (0, _reactMotion.spring)(bar.x, motionProps),
                                    y: (0, _reactMotion.spring)(bar.y, motionProps),
                                    width: (0, _reactMotion.spring)(bar.width, motionProps),
                                    height: (0, _reactMotion.spring)(bar.height, motionProps),
                                },
                            }
                        }),
                    },
                    function(interpolatedStyles) {
                        return _react2.default.createElement(
                            'g',
                            null,
                            interpolatedStyles.map(function(_ref3) {
                                var key = _ref3.key,
                                    style = _ref3.style,
                                    data = _ref3.data
                                return _react2.default.createElement(
                                    _BarItem2.default,
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
                    return _react2.default.createElement(
                        _BarItem2.default,
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
                            xScale: enableGridX ? result.xScale : null,
                            yScale: enableGridY ? result.yScale : null,
                        },
                        motionProps
                    )
                ),
                _react2.default.createElement(_CartesianMarkers2.default, {
                    markers: markers,
                    width: width,
                    height: height,
                    xScale: result.xScale,
                    yScale: result.yScale,
                    theme: theme,
                }),
                _react2.default.createElement(
                    _Axes2.default,
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
                        return _react2.default.createElement(
                            _BarItemLabel2.default,
                            _extends({}, d, {
                                textColor: getLabelsTextColor(d, theme),
                                linkColor: getLabelsLinkColor(d, theme),
                            })
                        )
                    })
            )
        }
    )
}

Bar.propTypes = _props.BarPropTypes

exports.default = (0, _enhance2.default)(Bar)
