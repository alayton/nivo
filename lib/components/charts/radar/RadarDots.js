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
    }

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _reactMotion = require('react-motion')

var _props2 = require('../../../props')

var _colors = require('../../../lib/colors')

var _polar = require('../../../lib/polar')

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _DotsItem = require('../../dots/DotsItem')

var _DotsItem2 = _interopRequireDefault(_DotsItem)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
            'Super expression must either be null or a function, not ' + typeof superClass
        )
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
    })
    if (superClass)
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass)
} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This file is part of the nivo project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * file that was distributed with this source code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var RadarDots = (function(_Component) {
    _inherits(RadarDots, _Component)

    function RadarDots() {
        _classCallCheck(this, RadarDots)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    RadarDots.prototype.render = function render() {
        var _props = this.props,
            data = _props.data,
            keys = _props.keys,
            getIndex = _props.getIndex,
            colorByKey = _props.colorByKey,
            radiusScale = _props.radiusScale,
            angleStep = _props.angleStep,
            symbol = _props.symbol,
            size = _props.size,
            color = _props.color,
            borderWidth = _props.borderWidth,
            borderColor = _props.borderColor,
            enableLabel = _props.enableLabel,
            label = _props.label,
            labelFormat = _props.labelFormat,
            labelYOffset = _props.labelYOffset,
            theme = _props.theme,
            animate = _props.animate,
            motionStiffness = _props.motionStiffness,
            motionDamping = _props.motionDamping

        var fillColor = (0, _colors.getInheritedColorGenerator)(color)
        var strokeColor = (0, _colors.getInheritedColorGenerator)(borderColor)
        var getLabel = (0, _propertiesConverters.getLabelGenerator)(label, labelFormat)

        var points = data.reduce(function(acc, datum, i) {
            var index = getIndex(datum)
            keys.forEach(function(key) {
                var pointData = {
                    index: index,
                    key: key,
                    value: datum[key],
                    color: colorByKey[key],
                }
                acc.push({
                    key: key + '.' + index,
                    label: enableLabel ? getLabel(pointData) : null,
                    style: _extends(
                        {
                            fill: fillColor(pointData),
                            stroke: strokeColor(pointData),
                        },
                        (0, _polar.positionFromAngle)(
                            angleStep * i - Math.PI / 2,
                            radiusScale(datum[key])
                        )
                    ),
                    data: pointData,
                })
            })

            return acc
        }, [])

        if (animate !== true) {
            return _react2.default.createElement(
                'g',
                null,
                points.map(function(point) {
                    return _react2.default.createElement(_DotsItem2.default, {
                        key: point.key,
                        x: point.style.x,
                        y: point.style.y,
                        symbol: symbol,
                        size: size,
                        color: point.style.fill,
                        borderWidth: borderWidth,
                        borderColor: point.style.stroke,
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
                            x: (0, _reactMotion.spring)(point.style.x, springConfig),
                            y: (0, _reactMotion.spring)(point.style.y, springConfig),
                            size: (0, _reactMotion.spring)(size, springConfig),
                        },
                    }
                }),
            },
            function(interpolatedStyles) {
                return _react2.default.createElement(
                    'g',
                    null,
                    interpolatedStyles.map(function(_ref) {
                        var key = _ref.key,
                            style = _ref.style,
                            point = _ref.data
                        return _react2.default.createElement(
                            _DotsItem2.default,
                            _extends(
                                {
                                    key: key,
                                },
                                style,
                                {
                                    symbol: symbol,
                                    color: point.style.fill,
                                    borderWidth: borderWidth,
                                    borderColor: point.style.stroke,
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

    return RadarDots
})(_react.Component)

RadarDots.propTypes = _extends(
    {
        data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
        keys: _propTypes2.default.arrayOf(
            _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
        ).isRequired,
        getIndex: _propTypes2.default.func.isRequired,

        colorByKey: _propTypes2.default.object.isRequired,

        radiusScale: _propTypes2.default.func.isRequired,
        angleStep: _propTypes2.default.number.isRequired,

        symbol: _propTypes2.default.func,
        size: _propTypes2.default.number.isRequired,
        color: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
            .isRequired,
        borderWidth: _propTypes2.default.number.isRequired,
        borderColor: _propTypes2.default.oneOfType([
            _propTypes2.default.string,
            _propTypes2.default.func,
        ]).isRequired,

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
    _props2.motionPropTypes
)
RadarDots.defaultProps = {
    size: 6,
    color: 'inherit',
    borderWidth: 0,
    borderColor: 'inherit',

    // labels
    enableLabel: false,
    label: 'value',
}
exports.default = RadarDots
