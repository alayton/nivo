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
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '../../../props'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { positionFromAngle } from '../../../lib/polar'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import DotsItem from '../../dots/DotsItem'

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

        var fillColor = getInheritedColorGenerator(color)
        var strokeColor = getInheritedColorGenerator(borderColor)
        var getLabel = getLabelGenerator(label, labelFormat)

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
                        positionFromAngle(angleStep * i - Math.PI / 2, radiusScale(datum[key]))
                    ),
                    data: pointData,
                })
            })

            return acc
        }, [])

        if (animate !== true) {
            return React.createElement(
                'g',
                null,
                points.map(function(point) {
                    return React.createElement(DotsItem, {
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

        return React.createElement(
            TransitionMotion,
            {
                styles: points.map(function(point) {
                    return {
                        key: point.key,
                        data: point,
                        style: {
                            x: spring(point.style.x, springConfig),
                            y: spring(point.style.y, springConfig),
                            size: spring(size, springConfig),
                        },
                    }
                }),
            },
            function(interpolatedStyles) {
                return React.createElement(
                    'g',
                    null,
                    interpolatedStyles.map(function(_ref) {
                        var key = _ref.key,
                            style = _ref.style,
                            point = _ref.data
                        return React.createElement(
                            DotsItem,
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
})(Component)

RadarDots.propTypes = _extends(
    {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        getIndex: PropTypes.func.isRequired,

        colorByKey: PropTypes.object.isRequired,

        radiusScale: PropTypes.func.isRequired,
        angleStep: PropTypes.number.isRequired,

        symbol: PropTypes.func,
        size: PropTypes.number.isRequired,
        color: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

        // labels
        enableLabel: PropTypes.bool.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
        labelFormat: PropTypes.string,
        labelYOffset: PropTypes.number,

        // theming
        theme: PropTypes.shape({
            dots: PropTypes.shape({
                textColor: PropTypes.string.isRequired,
                fontSize: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    },
    motionPropTypes
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
export default RadarDots
