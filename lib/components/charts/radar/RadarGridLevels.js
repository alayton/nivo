'use strict'

exports.__esModule = true

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

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _reactMotion = require('react-motion')

var _props = require('../../../props')

var _d3Shape = require('d3-shape')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var levelWillEnter = function levelWillEnter() {
    return { r: 0 }
}

var RadarGridLevels = function RadarGridLevels(_ref) {
    var shape = _ref.shape,
        radii = _ref.radii,
        angleStep = _ref.angleStep,
        dataLength = _ref.dataLength,
        theme = _ref.theme,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping

    var springConfig = {
        motionDamping: motionDamping,
        motionStiffness: motionStiffness,
    }

    var levelsTransitionProps = {
        willEnter: levelWillEnter,
        willLeave: function willLeave() {
            return { r: (0, _reactMotion.spring)(0, springConfig) }
        },
        styles: radii.map(function(r, i) {
            return {
                key: 'level.' + i,
                style: {
                    r: (0, _reactMotion.spring)(r, springConfig),
                },
            }
        }),
    }

    if (shape === 'circular') {
        if (animate !== true) {
            return _react2.default.createElement(
                'g',
                null,
                radii.map(function(r, i) {
                    return _react2.default.createElement(
                        'circle',
                        _extends({ key: 'level.' + i, fill: 'none', r: r }, theme.grid)
                    )
                })
            )
        }

        return _react2.default.createElement(
            _reactMotion.TransitionMotion,
            levelsTransitionProps,
            function(interpolatedStyles) {
                return _react2.default.createElement(
                    'g',
                    null,
                    interpolatedStyles.map(function(_ref2) {
                        var key = _ref2.key,
                            style = _ref2.style,
                            data = _ref2.data
                        return _react2.default.createElement(
                            'circle',
                            _extends({ key: key, fill: 'none', r: style.r }, theme.grid)
                        )
                    })
                )
            }
        )
    }

    var radarLineGenerator = (0, _d3Shape.lineRadial)()
        .angle(function(i) {
            return i * angleStep
        })
        .curve(_d3Shape.curveLinearClosed)

    var points = (0, _range3.default)(dataLength)

    if (animate !== true) {
        return _react2.default.createElement(
            'g',
            null,
            radii.map(function(radius, i) {
                return _react2.default.createElement(
                    'path',
                    _extends(
                        {
                            key: 'level.' + i,
                            fill: 'none',
                            d: radarLineGenerator.radius(radius)(points),
                        },
                        theme.grid
                    )
                )
            })
        )
    }

    return _react2.default.createElement(
        _reactMotion.TransitionMotion,
        levelsTransitionProps,
        function(interpolatedStyles) {
            return _react2.default.createElement(
                'g',
                null,
                interpolatedStyles.map(function(_ref3) {
                    var key = _ref3.key,
                        style = _ref3.style,
                        data = _ref3.data
                    return _react2.default.createElement(
                        'path',
                        _extends(
                            {
                                key: key,
                                fill: 'none',
                                d: radarLineGenerator.radius(style.r)(points),
                            },
                            theme.grid
                        )
                    )
                })
            )
        }
    )
}

RadarGridLevels.propTypes = _extends(
    {
        shape: _propTypes2.default.oneOf(['circular', 'linear']).isRequired,
        radii: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,
        angleStep: _propTypes2.default.number.isRequired,
        dataLength: _propTypes2.default.number.isRequired,

        theme: _propTypes2.default.object.isRequired,
    },
    _props.motionPropTypes
)

exports.default = (0, _pure2.default)(RadarGridLevels)
