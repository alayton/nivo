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

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _reactMotion = require('react-motion')

var _props = require('../../../props')

var _colors = require('../../../lib/colors')

var _SmartMotion = require('../../SmartMotion')

var _SmartMotion2 = _interopRequireDefault(_SmartMotion)

var _d3Shape = require('d3-shape')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var RadarShapes = function RadarShapes(_ref) {
    var data = _ref.data,
        keys = _ref.keys,
        colorByKey = _ref.colorByKey,
        lineGenerator = _ref.lineGenerator,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        fillOpacity = _ref.fillOpacity,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping

    if (animate !== true) {
        return _react2.default.createElement(
            'g',
            null,
            keys.map(function(key) {
                return _react2.default.createElement('path', {
                    key: key,
                    d: lineGenerator(
                        data.map(function(d) {
                            return d[key]
                        })
                    ),
                    fill: colorByKey[key],
                    fillOpacity: fillOpacity,
                    stroke: borderColor({ key: key, color: colorByKey[key] }),
                    strokeWidth: borderWidth,
                })
            })
        )
    }

    var springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return _react2.default.createElement(
        'g',
        null,
        keys.map(function(key) {
            return _react2.default.createElement(
                _SmartMotion2.default,
                {
                    key: key,
                    style: function style(spring) {
                        return {
                            d: spring(
                                lineGenerator(
                                    data.map(function(d) {
                                        return d[key]
                                    })
                                ),
                                springConfig
                            ),
                            fill: spring(colorByKey[key], springConfig),
                            stroke: spring(
                                borderColor({ key: key, color: colorByKey[key] }),
                                springConfig
                            ),
                        }
                    },
                },
                function(style) {
                    return _react2.default.createElement(
                        'path',
                        _extends({ fillOpacity: fillOpacity, strokeWidth: borderWidth }, style)
                    )
                }
            )
        })
    )
}

RadarShapes.propTypes = _extends(
    {
        // data
        data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
        keys: _propTypes2.default.arrayOf(
            _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
        ).isRequired,
        colorByKey: _propTypes2.default.object.isRequired,

        radiusScale: _propTypes2.default.func.isRequired,
        angleStep: _propTypes2.default.number.isRequired,

        curveInterpolator: _propTypes2.default.func.isRequired,
        lineGenerator: _propTypes2.default.func.isRequired,

        // border
        borderWidth: _propTypes2.default.number.isRequired,
        borderColor: _propTypes2.default.func.isRequired,

        // theming
        fillOpacity: _propTypes2.default.number.isRequired,
    },
    _props.motionPropTypes
)

var enhance = (0, _compose2.default)(
    (0, _withPropsOnChange2.default)(['borderColor'], function(props) {
        return {
            borderColor: (0, _colors.getInheritedColorGenerator)(props.borderColor),
        }
    }),
    (0, _withPropsOnChange2.default)(['radiusScale', 'angleStep', 'curveInterpolator'], function(
        _ref2
    ) {
        var radiusScale = _ref2.radiusScale,
            angleStep = _ref2.angleStep,
            curveInterpolator = _ref2.curveInterpolator
        return {
            lineGenerator: (0, _d3Shape.lineRadial)()
                .radius(function(d) {
                    return radiusScale(d)
                })
                .angle(function(d, i) {
                    return i * angleStep
                })
                .curve(curveInterpolator),
        }
    }),
    _pure2.default
)

exports.default = enhance(RadarShapes)
