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

var _props = require('../../../props')

var _SmartMotion = require('../../SmartMotion')

var _SmartMotion2 = _interopRequireDefault(_SmartMotion)

var _BasicTooltip = require('../../tooltip/BasicTooltip')

var _BasicTooltip2 = _interopRequireDefault(_BasicTooltip)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var StreamLayers = function StreamLayers(_ref) {
    var layers = _ref.layers,
        fillOpacity = _ref.fillOpacity,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        theme = _ref.theme,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping

    if (animate !== true) {
        return _react2.default.createElement(
            'g',
            null,
            layers.map(function(_ref2, i) {
                var id = _ref2.id,
                    path = _ref2.path,
                    color = _ref2.color

                var handleTooltip = function handleTooltip(e) {
                    return showTooltip(
                        _react2.default.createElement(_BasicTooltip2.default, {
                            id: id,
                            enableChip: true,
                            color: color,
                            theme: theme,
                        }),
                        e
                    )
                }
                return _react2.default.createElement('path', {
                    key: i,
                    onMouseMove: handleTooltip,
                    onMouseEnter: handleTooltip,
                    onMouseLeave: hideTooltip,
                    d: path,
                    fill: color,
                    fillOpacity: fillOpacity,
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
        layers.map(function(_ref3, i) {
            var id = _ref3.id,
                path = _ref3.path,
                color = _ref3.color

            var handleTooltip = function handleTooltip(e) {
                return showTooltip(
                    _react2.default.createElement(_BasicTooltip2.default, {
                        id: id,
                        enableChip: true,
                        color: color,
                        theme: theme,
                    }),
                    e
                )
            }
            return _react2.default.createElement(
                _SmartMotion2.default,
                {
                    key: i,
                    style: function style(spring) {
                        return {
                            d: spring(path, springConfig),
                            fill: spring(color, springConfig),
                            fillOpacity: spring(fillOpacity, springConfig),
                        }
                    },
                },
                function(style) {
                    return _react2.default.createElement(
                        'path',
                        _extends(
                            {
                                onMouseMove: handleTooltip,
                                onMouseEnter: handleTooltip,
                                onMouseLeave: hideTooltip,
                            },
                            style
                        )
                    )
                }
            )
        })
    )
}

StreamLayers.propTypes = _extends(
    {
        fillOpacity: _propTypes2.default.number.isRequired,

        theme: _propTypes2.default.object.isRequired,
    },
    _props.motionPropTypes
)

exports.default = StreamLayers
