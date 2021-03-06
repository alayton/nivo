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
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import ChordArcTooltip from './ChordArcTooltip'

var ChordArcs = function ChordArcs(_ref) {
    var arcs = _ref.arcs,
        arcBorderWidth = _ref.arcBorderWidth,
        getOpacity = _ref.getOpacity,
        shapeGenerator = _ref.shapeGenerator,
        theme = _ref.theme,
        setCurrent = _ref.setCurrent,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        animate = _ref.animate,
        motionDamping = _ref.motionDamping,
        motionStiffness = _ref.motionStiffness

    var commonProps = function commonProps(arc) {
        var arcTooltip = React.createElement(ChordArcTooltip, { arc: arc, theme: theme })

        return {
            strokeWidth: arcBorderWidth,
            onMouseEnter: function onMouseEnter(e) {
                setCurrent(arc)
                showTooltip(arcTooltip, e)
            },
            onMouseMove: function onMouseMove(e) {
                showTooltip(arcTooltip, e)
            },
            onMouseLeave: function onMouseLeave() {
                setCurrent(null)
                hideTooltip()
            },
        }
    }

    if (animate !== true) {
        return React.createElement(
            'g',
            null,
            arcs.map(function(arc) {
                var opacity = getOpacity(arc)

                return React.createElement(
                    'path',
                    _extends(
                        {
                            key: arc.key,
                            d: shapeGenerator(arc),
                            fill: arc.color,
                            fillOpacity: opacity,
                            stroke: arc.color,
                            strokeOpacity: opacity,
                        },
                        commonProps(arc)
                    )
                )
            })
        )
    }

    var springConfig = {
        damping: motionDamping,
        stiffness: motionStiffness,
        precision: 0.001,
    }

    return React.createElement(
        TransitionMotion,
        {
            styles: arcs.map(function(arc) {
                return {
                    key: arc.key,
                    data: arc,
                    style: _extends(
                        {
                            startAngle: spring(arc.startAngle, springConfig),
                            endAngle: spring(arc.endAngle, springConfig),
                            opacity: spring(getOpacity(arc), springConfig),
                        },
                        colorMotionSpring(arc.color, springConfig)
                    ),
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

                    var color = getInterpolatedColor(style)

                    return React.createElement(
                        'path',
                        _extends(
                            {
                                key: key,
                                d: shapeGenerator({
                                    startAngle: style.startAngle,
                                    endAngle: style.endAngle,
                                }),
                                fill: color,
                                fillOpacity: style.opacity,
                                stroke: color,
                                strokeOpacity: style.opacity,
                            },
                            commonProps(arc)
                        )
                    )
                })
            )
        }
    )
}

ChordArcs.propTypes = {
    arcs: PropTypes.array.isRequired,
    shapeGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getOpacity: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

export default pure(ChordArcs)
