import _range from 'lodash/range' /*
                                    * This file is part of the nivo project.
                                    *
                                    * Copyright 2016-present, Raphaël Benitte.
                                    *
                                    * For the full copyright and license information, please view the LICENSE
                                    * file that was distributed with this source code.
                                    */

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

import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import { TransitionMotion, spring } from 'react-motion'
import { motionPropTypes } from '../../../props'
import { lineRadial, curveLinearClosed } from 'd3-shape'

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
            return { r: spring(0, springConfig) }
        },
        styles: radii.map(function(r, i) {
            return {
                key: 'level.' + i,
                style: {
                    r: spring(r, springConfig),
                },
            }
        }),
    }

    if (shape === 'circular') {
        if (animate !== true) {
            return React.createElement(
                'g',
                null,
                radii.map(function(r, i) {
                    return React.createElement(
                        'circle',
                        _extends({ key: 'level.' + i, fill: 'none', r: r }, theme.grid)
                    )
                })
            )
        }

        return React.createElement(TransitionMotion, levelsTransitionProps, function(
            interpolatedStyles
        ) {
            return React.createElement(
                'g',
                null,
                interpolatedStyles.map(function(_ref2) {
                    var key = _ref2.key,
                        style = _ref2.style,
                        data = _ref2.data
                    return React.createElement(
                        'circle',
                        _extends({ key: key, fill: 'none', r: style.r }, theme.grid)
                    )
                })
            )
        })
    }

    var radarLineGenerator = lineRadial()
        .angle(function(i) {
            return i * angleStep
        })
        .curve(curveLinearClosed)

    var points = _range(dataLength)

    if (animate !== true) {
        return React.createElement(
            'g',
            null,
            radii.map(function(radius, i) {
                return React.createElement(
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

    return React.createElement(TransitionMotion, levelsTransitionProps, function(
        interpolatedStyles
    ) {
        return React.createElement(
            'g',
            null,
            interpolatedStyles.map(function(_ref3) {
                var key = _ref3.key,
                    style = _ref3.style,
                    data = _ref3.data
                return React.createElement(
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
    })
}

RadarGridLevels.propTypes = _extends(
    {
        shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
        radii: PropTypes.arrayOf(PropTypes.number).isRequired,
        angleStep: PropTypes.number.isRequired,
        dataLength: PropTypes.number.isRequired,

        theme: PropTypes.object.isRequired,
    },
    motionPropTypes
)

export default pure(RadarGridLevels)
