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

var _props = require('../../../props')

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _DotsItem = require('../../dots/DotsItem')

var _DotsItem2 = _interopRequireDefault(_DotsItem)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var LineDots = function LineDots(_ref) {
    var lines = _ref.lines,
        symbol = _ref.symbol,
        size = _ref.size,
        color = _ref.color,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        enableLabel = _ref.enableLabel,
        label = _ref.label,
        labelFormat = _ref.labelFormat,
        labelYOffset = _ref.labelYOffset,
        theme = _ref.theme,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping

    var getLabel = (0, _propertiesConverters.getLabelGenerator)(label, labelFormat)

    var points = lines.reduce(function(acc, line) {
        var id = line.id,
            points = line.points

        return [].concat(
            acc,
            points.map(function(point) {
                var pointData = {
                    serie: { id: id },
                    x: point.key,
                    y: point.value,
                }

                return {
                    key: id + '.' + point.x,
                    x: point.x,
                    y: point.y,
                    fill: color(line),
                    stroke: borderColor(line),
                    label: enableLabel ? getLabel(pointData) : null,
                }
            })
        )
    }, [])

    if (animate !== true) {
        return _react2.default.createElement(
            'g',
            null,
            points.map(function(point) {
                return _react2.default.createElement(_DotsItem2.default, {
                    key: point.key,
                    x: point.x,
                    y: point.y,
                    symbol: symbol,
                    size: size,
                    color: point.fill,
                    borderWidth: borderWidth,
                    borderColor: point.stroke,
                    label: point.label,
                    labelYOffset: labelYOffset,
                    theme: theme,
                })
            })
        )
    }
    var springConfig = {
        motionDamping: motionDamping,
        motionStiffness: motionStiffness,
    }

    return _react2.default.createElement(
        _reactMotion.TransitionMotion,
        {
            styles: points.map(function(point) {
                return {
                    key: point.key,
                    data: point,
                    style: {
                        x: (0, _reactMotion.spring)(point.x, springConfig),
                        y: (0, _reactMotion.spring)(point.y, springConfig),
                        size: (0, _reactMotion.spring)(size, springConfig),
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
                        point = _ref2.data
                    return _react2.default.createElement(
                        _DotsItem2.default,
                        _extends(
                            {
                                key: key,
                            },
                            style,
                            {
                                symbol: symbol,
                                color: point.fill,
                                borderWidth: borderWidth,
                                borderColor: point.stroke,
                                label: point.label,
                                labelYOffset: labelYOffset,
                                theme: theme,
                            }
                        )
                    )
                })
            )
        }
    )
}

LineDots.propTypes = _extends(
    {
        lines: _propTypes2.default.arrayOf(
            _propTypes2.default.shape({
                id: _propTypes2.default.string.isRequired,
            })
        ),

        symbol: _propTypes2.default.func,
        size: _propTypes2.default.number.isRequired,
        color: _propTypes2.default.func.isRequired,
        borderWidth: _propTypes2.default.number.isRequired,
        borderColor: _propTypes2.default.func.isRequired,

        // labels
        enableLabel: _propTypes2.default.bool.isRequired,
        label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
            .isRequired,
        labelFormat: _propTypes2.default.string,
        labelYOffset: _propTypes2.default.number,

        // theming
        theme: _propTypes2.default.shape({
            dots: _propTypes2.default.shape({
                textColor: _propTypes2.default.string.isRequired,
                fontSize: _propTypes2.default.string.isRequired,
            }).isRequired,
        }).isRequired,
    },
    _props.motionPropTypes
)

LineDots.defaultProps = {
    // labels
    enableLabel: false,
    label: 'y',
}

exports.default = LineDots
