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

import React from 'react' /*
                            * This file is part of the nivo project.
                            *
                            * Copyright 2016-present, Raphaël Benitte.
                            *
                            * For the full copyright and license information, please view the LICENSE
                            * file that was distributed with this source code.
                            */

import compose from 'recompose/compose'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import PropTypes from 'prop-types'

import { Motion } from 'react-motion'
import { motionPropTypes } from '../../../props'
import { getInheritedColorGenerator } from '../../../lib/colors'
import SmartMotion from '../../SmartMotion'
import { lineRadial } from 'd3-shape'

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
        return React.createElement(
            'g',
            null,
            keys.map(function(key) {
                return React.createElement('path', {
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

    return React.createElement(
        'g',
        null,
        keys.map(function(key) {
            return React.createElement(
                SmartMotion,
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
                    return React.createElement(
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
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        keys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        colorByKey: PropTypes.object.isRequired,

        radiusScale: PropTypes.func.isRequired,
        angleStep: PropTypes.number.isRequired,

        curveInterpolator: PropTypes.func.isRequired,
        lineGenerator: PropTypes.func.isRequired,

        // border
        borderWidth: PropTypes.number.isRequired,
        borderColor: PropTypes.func.isRequired,

        // theming
        fillOpacity: PropTypes.number.isRequired,
    },
    motionPropTypes
)

var enhance = compose(
    withPropsOnChange(['borderColor'], function(props) {
        return {
            borderColor: getInheritedColorGenerator(props.borderColor),
        }
    }),
    withPropsOnChange(['radiusScale', 'angleStep', 'curveInterpolator'], function(_ref2) {
        var radiusScale = _ref2.radiusScale,
            angleStep = _ref2.angleStep,
            curveInterpolator = _ref2.curveInterpolator
        return {
            lineGenerator: lineRadial()
                .radius(function(d) {
                    return radiusScale(d)
                })
                .angle(function(d, i) {
                    return i * angleStep
                })
                .curve(curveInterpolator),
        }
    }),
    pure
)

export default enhance(RadarShapes)
