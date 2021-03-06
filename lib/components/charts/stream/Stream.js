'use strict'

exports.__esModule = true

var _sortBy2 = require('lodash/sortBy')

var _sortBy3 = _interopRequireDefault(_sortBy2)

var _range2 = require('lodash/range')

var _range3 = _interopRequireDefault(_range2)

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

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _Axes = require('../../axes/Axes')

var _Axes2 = _interopRequireDefault(_Axes)

var _Grid = require('../../axes/Grid')

var _Grid2 = _interopRequireDefault(_Grid)

var _StreamLayers = require('./StreamLayers')

var _StreamLayers2 = _interopRequireDefault(_StreamLayers)

var _StreamSlices = require('./StreamSlices')

var _StreamSlices2 = _interopRequireDefault(_StreamSlices)

var _props = require('./props')

var _enhance = require('./enhance')

var _enhance2 = _interopRequireDefault(_enhance)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

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

    var slices = (0, _range3.default)(data.length).map(function(i) {
        return {
            index: i,
            x: enhancedLayers[0].layer[i].x,
            stack: (0, _sortBy3.default)(
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
                _react2.default.createElement(
                    _StreamLayers2.default,
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
                isInteractive &&
                    enableStackTooltip &&
                    _react2.default.createElement(_StreamSlices2.default, {
                        slices: slices,
                        height: height,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        theme: theme,
                    })
            )
        }
    )
}

Stream.propTypes = _props.StreamPropTypes

var enhancedStream = (0, _enhance2.default)(Stream)
enhancedStream.displayName = 'enhance(Stream)'

exports.default = enhancedStream
