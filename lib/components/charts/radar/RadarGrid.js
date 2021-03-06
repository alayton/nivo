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

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _props = require('../../../props')

var _polar = require('../../../lib/polar')

var _RadarGridLabels = require('./RadarGridLabels')

var _RadarGridLabels2 = _interopRequireDefault(_RadarGridLabels)

var _RadarGridLevels = require('./RadarGridLevels')

var _RadarGridLevels2 = _interopRequireDefault(_RadarGridLevels)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var RadarGrid = function RadarGrid(_ref) {
    var indices = _ref.indices,
        shape = _ref.shape,
        radius = _ref.radius,
        radii = _ref.radii,
        angles = _ref.angles,
        angleStep = _ref.angleStep,
        labelOffset = _ref.labelOffset,
        theme = _ref.theme,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping

    var motionProps = {
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness,
    }

    return _react2.default.createElement(
        'g',
        null,
        angles.map(function(angle, i) {
            var position = (0, _polar.positionFromAngle)(angle, radius)
            return _react2.default.createElement(
                'line',
                _extends(
                    {
                        key: 'axis.' + i,
                        x1: 0,
                        y1: 0,
                        x2: position.x,
                        y2: position.y,
                    },
                    theme.grid
                )
            )
        }),
        _react2.default.createElement(
            _RadarGridLevels2.default,
            _extends(
                {
                    shape: shape,
                    radii: radii,
                    angleStep: angleStep,
                    dataLength: indices.length,
                    theme: theme,
                },
                motionProps
            )
        ),
        _react2.default.createElement(
            _RadarGridLabels2.default,
            _extends(
                {
                    radius: radius,
                    angles: angles,
                    indices: indices,
                    labelOffset: labelOffset,
                    theme: theme,
                },
                motionProps
            )
        )
    )
}

RadarGrid.propTypes = _extends(
    {
        indices: _propTypes2.default.arrayOf(
            _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
        ).isRequired,
        shape: _propTypes2.default.oneOf(['circular', 'linear']).isRequired,
        radius: _propTypes2.default.number.isRequired,
        angleStep: _propTypes2.default.number.isRequired,

        labelOffset: _propTypes2.default.number.isRequired,

        theme: _propTypes2.default.object.isRequired,
    },
    _props.motionPropTypes
)

var enhance = (0, _compose2.default)(
    (0, _withPropsOnChange2.default)(['indices', 'levels', 'radius', 'angleStep'], function(props) {
        return {
            radii: (0, _range3.default)(props.levels)
                .map(function(i) {
                    return props.radius / props.levels * (i + 1)
                })
                .reverse(),
            angles: (0, _range3.default)(props.indices.length).map(function(i) {
                return i * props.angleStep - Math.PI / 2
            }),
        }
    }),
    _pure2.default
)

exports.default = enhance(RadarGrid)
