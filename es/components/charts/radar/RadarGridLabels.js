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

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'
import pure from 'recompose/pure'
import { motionPropTypes } from '../../../props'
import { positionFromAngle, radiansToDegrees } from '../../../lib/polar'

var textAnchorFromAngle = function textAnchorFromAngle(_angle) {
    var angle = radiansToDegrees(_angle) + 90
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
        var position = positionFromAngle(angles[i], radius + labelOffset)
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
        return React.createElement(
            'g',
            null,
            labels.map(function(label) {
                return React.createElement(
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

    return React.createElement(
        TransitionMotion,
        {
            styles: labels.map(function(label) {
                return {
                    key: label.key,
                    data: {
                        label: label.label,
                        textAnchor: label.textAnchor,
                    },
                    style: {
                        x: spring(label.x, springConfig),
                        y: spring(label.y, springConfig),
                    },
                }
            }),
        },
        function(interpolatedStyles) {
            return React.createElement(
                'g',
                null,
                interpolatedStyles.map(function(_ref2) {
                    var key = _ref2.key,
                        style = _ref2.style,
                        data = _ref2.data
                    return React.createElement(
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
        radius: PropTypes.number.isRequired,
        angles: PropTypes.arrayOf(PropTypes.number).isRequired,

        indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        labelOffset: PropTypes.number.isRequired,

        theme: PropTypes.object.isRequired,
    },
    motionPropTypes
)

export default pure(RadarGridLabels)
