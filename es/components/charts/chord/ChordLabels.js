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
import { midAngle, getPolarLabelProps } from '../../../lib/polar'

var ChordLabels = function ChordLabels(_ref) {
    var arcs = _ref.arcs,
        radius = _ref.radius,
        rotation = _ref.rotation,
        getLabel = _ref.getLabel,
        getColor = _ref.getColor,
        theme = _ref.theme,
        animate = _ref.animate,
        motionDamping = _ref.motionDamping,
        motionStiffness = _ref.motionStiffness

    if (animate !== true) {
        return React.createElement(
            'g',
            null,
            arcs.map(function(arc) {
                var color = getColor(arc, theme)
                var angle = midAngle(arc)
                var props = getPolarLabelProps(radius, angle, rotation)

                return React.createElement(
                    'text',
                    {
                        key: arc.key,
                        transform:
                            'translate(' +
                            props.x +
                            ', ' +
                            props.y +
                            ') rotate(' +
                            props.rotate +
                            ')',
                        style: { pointerEvents: 'none', fill: color },
                        textAnchor: props.align,
                        alignmentBaseline: props.baseline,
                    },
                    getLabel(arc)
                )
            })
        )
    }

    var springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    return React.createElement(
        TransitionMotion,
        {
            styles: arcs.map(function(arc) {
                var angle = midAngle(arc)

                return {
                    key: arc.key,
                    data: arc,
                    style: {
                        angle: spring(angle, springConfig),
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
                        arc = _ref2.data

                    var color = getColor(arc, theme)
                    var props = getPolarLabelProps(radius, style.angle, rotation)

                    return React.createElement(
                        'text',
                        {
                            key: key,
                            transform:
                                'translate(' +
                                props.x +
                                ', ' +
                                props.y +
                                ') rotate(' +
                                props.rotate +
                                ')',
                            style: { pointerEvents: 'none', fill: color },
                            textAnchor: props.align,
                            alignmentBaseline: props.baseline,
                        },
                        getLabel(arc)
                    )
                })
            )
        }
    )
}

ChordLabels.propTypes = {
    arcs: PropTypes.array.isRequired,
    radius: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
    getLabel: PropTypes.func.isRequired,
    getColor: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
}

export default ChordLabels
