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

var _props = require('../../../props')

var _polar = require('../../../lib/polar')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var textAnchorFromAngle = function textAnchorFromAngle(_angle) {
    var angle = (0, _polar.radiansToDegrees)(_angle) + 90
    if (angle <= 10 || angle >= 350 || (angle >= 170 && angle <= 190)) return 'middle'
    if (angle > 180) return 'end'
    return 'start'
}

var RadarGridLabels = function RadarGridLabels(_ref) {
    var radius = _ref.radius,
        angles = _ref.angles,
        indices = _ref.indices,
        labelOffset = _ref.labelOffset,
        theme = _ref.theme,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping

    var springConfig = {
        motionDamping: motionDamping,
        motionStiffness: motionStiffness,
    }

    var labels = indices.map(function(index, i) {
        var position = (0, _polar.positionFromAngle)(angles[i], radius + labelOffset)
        var textAnchor = textAnchorFromAngle(angles[i])

        return _extends(
            {
                key: 'label.' + i,
                label: index,
                textAnchor: textAnchor,
            },
            position
        )
    })

    if (animate !== true) {
        return _react2.default.createElement(
            'g',
            null,
            labels.map(function(label) {
                return _react2.default.createElement(
                    'text',
                    _extends(
                        {
                            style: {
                                fill: theme.axis.textColor,
                                fontSize: theme.axis.fontSize,
                            },
                            dy: '0.5em',
                        },
                        label
                    ),
                    label.label
                )
            })
        )
    }

    return _react2.default.createElement(
        _reactMotion.TransitionMotion,
        {
            styles: labels.map(function(label) {
                return {
                    key: label.key,
                    data: {
                        label: label.label,
                        textAnchor: label.textAnchor,
                    },
                    style: {
                        x: (0, _reactMotion.spring)(label.x, springConfig),
                        y: (0, _reactMotion.spring)(label.y, springConfig),
                    },
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
                        data = _ref2.data
                    return _react2.default.createElement(
                        'text',
                        _extends(
                            {
                                key: key,
                                dy: '0.5em',
                                textAnchor: data.textAnchor,
                                style: {
                                    fill: theme.axis.textColor,
                                    fontSize: theme.axis.fontSize,
                                },
                            },
                            style
                        ),
                        data.label
                    )
                })
            )
        }
    )
}

RadarGridLabels.propTypes = _extends(
    {
        radius: _propTypes2.default.number.isRequired,
        angles: _propTypes2.default.arrayOf(_propTypes2.default.number).isRequired,

        indices: _propTypes2.default.arrayOf(
            _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
        ).isRequired,
        labelOffset: _propTypes2.default.number.isRequired,

        theme: _propTypes2.default.object.isRequired,
    },
    _props.motionPropTypes
)

exports.default = (0, _pure2.default)(RadarGridLabels)
