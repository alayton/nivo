'use strict'

exports.__esModule = true

var _mapValues2 = require('lodash/mapValues')

var _mapValues3 = _interopRequireDefault(_mapValues2)

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

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _colors = require('../../../lib/colors')

var _polar = require('../../../lib/polar')

var _TableTooltip = require('../../tooltip/TableTooltip')

var _TableTooltip2 = _interopRequireDefault(_TableTooltip)

var _Chip = require('../../tooltip/Chip')

var _Chip2 = _interopRequireDefault(_Chip)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Used to get ribbon angles, instead of using source and target arcs,
 * we sort arcs by value to have smooth transitions, otherwise,
 * if source|target arc value becomes greater than the other,
 * the ribbon will be reversed.
 *
 * @param {Object}  source
 * @param {Object}  target
 * @param {boolean} useMiddleAngle
 * @param {Object}  [springConfig]
 * @return {Object}
 */
var getRibbonAngles = function getRibbonAngles(_ref, useMiddleAngle, springConfig) {
    var source = _ref.source,
        target = _ref.target

    var firstArc = void 0
    var secondArc = void 0
    if (source.startAngle < target.startAngle) {
        firstArc = source
        secondArc = target
    } else {
        firstArc = target
        secondArc = source
    }

    var angles = void 0
    if (useMiddleAngle === true) {
        var firstMiddleAngle = (0, _polar.midAngle)(firstArc)
        var secondMiddleAngle = (0, _polar.midAngle)(secondArc)

        angles = {
            sourceStartAngle: firstMiddleAngle,
            sourceEndAngle: firstMiddleAngle,
            targetStartAngle: secondMiddleAngle,
            targetEndAngle: secondMiddleAngle,
        }
    } else {
        angles = {
            sourceStartAngle: firstArc.startAngle,
            sourceEndAngle: firstArc.endAngle,
            targetStartAngle: secondArc.startAngle,
            targetEndAngle: secondArc.endAngle,
        }
    }

    if (!springConfig) return angles

    return (0, _mapValues3.default)(angles, function(angle) {
        return (0, _reactMotion.spring)(angle, springConfig)
    })
}

var ribbonWillEnter = function ribbonWillEnter(_ref2) {
    var ribbon = _ref2.data
    return _extends(
        {},
        getRibbonAngles(ribbon, true),
        {
            opacity: 0,
        },
        (0, _colors.colorMotionSpring)(ribbon.source.color)
    )
}

var ribbonWillLeave = function ribbonWillLeave(springConfig) {
    return function(_ref3) {
        var ribbon = _ref3.data
        return _extends(
            {},
            getRibbonAngles(ribbon, true, springConfig),
            {
                opacity: 0,
            },
            (0, _colors.colorMotionSpring)(ribbon.source.color, springConfig)
        )
    }
}

var ChordRibbons = function ChordRibbons(_ref4) {
    var ribbons = _ref4.ribbons,
        shapeGenerator = _ref4.shapeGenerator,
        ribbonBorderWidth = _ref4.ribbonBorderWidth,
        getOpacity = _ref4.getOpacity,
        theme = _ref4.theme,
        setCurrent = _ref4.setCurrent,
        showTooltip = _ref4.showTooltip,
        hideTooltip = _ref4.hideTooltip,
        animate = _ref4.animate,
        motionDamping = _ref4.motionDamping,
        motionStiffness = _ref4.motionStiffness

    var commonProps = function commonProps(ribbon) {
        var ribbonTooltip = _react2.default.createElement(_TableTooltip2.default, {
            theme: theme,
            rows: [
                [
                    _react2.default.createElement(_Chip2.default, { color: ribbon.source.color }),
                    _react2.default.createElement('strong', null, ribbon.source.id),
                    ribbon.source.value,
                ],
                [
                    _react2.default.createElement(_Chip2.default, { color: ribbon.target.color }),
                    _react2.default.createElement('strong', null, ribbon.target.id),
                    ribbon.target.value,
                ],
            ],
        })

        return {
            strokeWidth: ribbonBorderWidth,
            onMouseEnter: function onMouseEnter(e) {
                setCurrent(ribbon)
                showTooltip(ribbonTooltip, e)
            },
            onMouseMove: function onMouseMove(e) {
                showTooltip(ribbonTooltip, e)
            },
            onMouseLeave: function onMouseLeave() {
                setCurrent(null)
                hideTooltip()
            },
        }
    }

    if (animate !== true) {
        return _react2.default.createElement(
            'g',
            null,
            ribbons.map(function(ribbon) {
                var opacity = getOpacity(ribbon)

                return _react2.default.createElement(
                    'path',
                    _extends(
                        {
                            key: ribbon.key,
                            d: shapeGenerator(ribbon),
                            fill: ribbon.source.color,
                            fillOpacity: opacity,
                            stroke: ribbon.source.color,
                            strokeOpacity: opacity,
                        },
                        commonProps(ribbon)
                    )
                )
            })
        )
    }

    var springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
        precision: 0.001,
    }

    return _react2.default.createElement(
        _reactMotion.TransitionMotion,
        {
            willEnter: ribbonWillEnter,
            willLeave: ribbonWillLeave(springConfig),
            styles: ribbons.map(function(ribbon) {
                return {
                    key: ribbon.key,
                    data: ribbon,
                    style: _extends(
                        {},
                        getRibbonAngles(ribbon, false, springConfig),
                        {
                            opacity: (0, _reactMotion.spring)(getOpacity(ribbon), springConfig),
                        },
                        (0, _colors.colorMotionSpring)(ribbon.source.color, springConfig)
                    ),
                }
            }),
        },
        function(interpolatedStyles) {
            return _react2.default.createElement(
                'g',
                null,
                interpolatedStyles.map(function(_ref5) {
                    var key = _ref5.key,
                        style = _ref5.style,
                        ribbon = _ref5.data

                    var color = (0, _colors.getInterpolatedColor)(style)

                    return _react2.default.createElement(
                        'path',
                        _extends(
                            {
                                key: key,
                                d: shapeGenerator({
                                    source: {
                                        startAngle: style.sourceStartAngle,
                                        endAngle: Math.max(
                                            style.sourceEndAngle,
                                            style.sourceStartAngle
                                        ),
                                    },
                                    target: {
                                        startAngle: style.targetStartAngle,
                                        endAngle: Math.max(
                                            style.targetEndAngle,
                                            style.targetStartAngle
                                        ),
                                    },
                                }),
                                fill: color,
                                fillOpacity: style.opacity,
                                stroke: color,
                                strokeOpacity: style.opacity,
                            },
                            commonProps(ribbon)
                        )
                    )
                })
            )
        }
    )
}

ChordRibbons.propTypes = {
    ribbons: _propTypes2.default.array.isRequired,
    shapeGenerator: _propTypes2.default.func.isRequired,
    borderWidth: _propTypes2.default.number.isRequired,
    getOpacity: _propTypes2.default.func.isRequired,
    setCurrent: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.object.isRequired,
    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,
}

exports.default = (0, _pure2.default)(ChordRibbons)
