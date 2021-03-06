import _range from 'lodash/range'

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

import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withPropsOnChange from 'recompose/withPropsOnChange'
import { motionPropTypes } from '../../../props'
import { positionFromAngle } from '../../../lib/polar'
import RadialGridLabels from './RadarGridLabels'
import RadarGridLevels from './RadarGridLevels'

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

    return React.createElement(
        'g',
        null,
        angles.map(function(angle, i) {
            var position = positionFromAngle(angle, radius)
            return React.createElement(
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
        React.createElement(
            RadarGridLevels,
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
        React.createElement(
            RadialGridLabels,
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
        indices: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
            .isRequired,
        shape: PropTypes.oneOf(['circular', 'linear']).isRequired,
        radius: PropTypes.number.isRequired,
        angleStep: PropTypes.number.isRequired,

        labelOffset: PropTypes.number.isRequired,

        theme: PropTypes.object.isRequired,
    },
    motionPropTypes
)

var enhance = compose(
    withPropsOnChange(['indices', 'levels', 'radius', 'angleStep'], function(props) {
        return {
            radii: _range(props.levels)
                .map(function(i) {
                    return props.radius / props.levels * (i + 1)
                })
                .reverse(),
            angles: _range(props.indices.length).map(function(i) {
                return i * props.angleStep - Math.PI / 2
            }),
        }
    }),
    pure
)

export default enhance(RadarGrid)
