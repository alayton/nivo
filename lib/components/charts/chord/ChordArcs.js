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

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _reactMotion = require('react-motion')

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _colors = require('../../../lib/colors')

var _ChordArcTooltip = require('./ChordArcTooltip')

var _ChordArcTooltip2 = _interopRequireDefault(_ChordArcTooltip)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var ChordArcs = function ChordArcs(_ref) {
    var arcs = _ref.arcs,
        arcBorderWidth = _ref.arcBorderWidth,
        getOpacity = _ref.getOpacity,
        shapeGenerator = _ref.shapeGenerator,
        theme = _ref.theme,
        setCurrent = _ref.setCurrent,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        animate = _ref.animate,
        motionDamping = _ref.motionDamping,
        motionStiffness = _ref.motionStiffness

    var commonProps = function commonProps(arc) {
        var arcTooltip = _react2.default.createElement(_ChordArcTooltip2.default, {
            arc: arc,
            theme: theme,
        })

        return {
            strokeWidth: arcBorderWidth,
            onMouseEnter: function onMouseEnter(e) {
                setCurrent(arc)
                showTooltip(arcTooltip, e)
            },
            onMouseMove: function onMouseMove(e) {
                showTooltip(arcTooltip, e)
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
            arcs.map(function(arc) {
                var opacity = getOpacity(arc)

                return _react2.default.createElement(
                    'path',
                    _extends(
                        {
                            key: arc.key,
                            d: shapeGenerator(arc),
                            fill: arc.color,
                            fillOpacity: opacity,
                            stroke: arc.color,
                            strokeOpacity: opacity,
                        },
                        commonProps(arc)
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
            styles: arcs.map(function(arc) {
                return {
                    key: arc.key,
                    data: arc,
                    style: _extends(
                        {
                            startAngle: (0, _reactMotion.spring)(arc.startAngle, springConfig),
                            endAngle: (0, _reactMotion.spring)(arc.endAngle, springConfig),
                            opacity: (0, _reactMotion.spring)(getOpacity(arc), springConfig),
                        },
                        (0, _colors.colorMotionSpring)(arc.color, springConfig)
                    ),
                }
            }),
        },
        function(interpolatedStyles) {
            return _react2.default.createElement(
                'g',
                null,
                interpolatedStyles.map(function(_ref2) {
                    var key = _ref2.key,
                        style = _ref2.style,
                        arc = _ref2.data

                    var color = (0, _colors.getInterpolatedColor)(style)

                    return _react2.default.createElement(
                        'path',
                        _extends(
                            {
                                key: key,
                                d: shapeGenerator({
                                    startAngle: style.startAngle,
                                    endAngle: style.endAngle,
                                }),
                                fill: color,
                                fillOpacity: style.opacity,
                                stroke: color,
                                strokeOpacity: style.opacity,
                            },
                            commonProps(arc)
                        )
                    )
                })
            )
        }
    )
}

ChordArcs.propTypes = {
    arcs: _propTypes2.default.array.isRequired,
    shapeGenerator: _propTypes2.default.func.isRequired,
    borderWidth: _propTypes2.default.number.isRequired,
    getOpacity: _propTypes2.default.func.isRequired,
    setCurrent: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.object.isRequired,
    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,
}

exports.default = (0, _pure2.default)(ChordArcs)
