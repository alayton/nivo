import _mapValues from 'lodash/mapValues'

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
import { midAngle } from '../../../lib/polar'
import TableTooltip from '../../tooltip/TableTooltip'
import Chip from '../../tooltip/Chip'

/**
 * Used to get ribbon angles, instead of using source and target arcs,
 * we sort arcs by value to have smooth transitions, otherwise,
 * if source|target arc value becomes greater than the other,
 * the ribbon will be reversed.
 *
 * @param {Object}  source
 * @param {Object}  target
 * @param {boolean} useMiddleAngle
 * @param {Object}  [springConfig]
 * @return {Object}
 */
var getRibbonAngles = function getRibbonAngles(_ref, useMiddleAngle, springConfig) {
    var source = _ref.source,
        target = _ref.target

    var firstArc = void 0
    var secondArc = void 0
    if (source.startAngle < target.startAngle) {
        firstArc = source
        secondArc = target
    } else {
        firstArc = target
        secondArc = source
    }

    var angles = void 0
    if (useMiddleAngle === true) {
        var firstMiddleAngle = midAngle(firstArc)
        var secondMiddleAngle = midAngle(secondArc)

        angles = {
            sourceStartAngle: firstMiddleAngle,
            sourceEndAngle: firstMiddleAngle,
            targetStartAngle: secondMiddleAngle,
            targetEndAngle: secondMiddleAngle,
        }
    } else {
        angles = {
            sourceStartAngle: firstArc.startAngle,
            sourceEndAngle: firstArc.endAngle,
            targetStartAngle: secondArc.startAngle,
            targetEndAngle: secondArc.endAngle,
        }
    }

    if (!springConfig) return angles

    return _mapValues(angles, function(angle) {
        return spring(angle, springConfig)
    })
}

var ribbonWillEnter = function ribbonWillEnter(_ref2) {
    var ribbon = _ref2.data
    return _extends(
        {},
        getRibbonAngles(ribbon, true),
        {
            opacity: 0,
        },
        colorMotionSpring(ribbon.source.color)
    )
}

var ribbonWillLeave = function ribbonWillLeave(springConfig) {
    return function(_ref3) {
        var ribbon = _ref3.data
        return _extends(
            {},
            getRibbonAngles(ribbon, true, springConfig),
            {
                opacity: 0,
            },
            colorMotionSpring(ribbon.source.color, springConfig)
        )
    }
}

var ChordRibbons = function ChordRibbons(_ref4) {
    var ribbons = _ref4.ribbons,
        shapeGenerator = _ref4.shapeGenerator,
        ribbonBorderWidth = _ref4.ribbonBorderWidth,
        getOpacity = _ref4.getOpacity,
        theme = _ref4.theme,
        setCurrent = _ref4.setCurrent,
        showTooltip = _ref4.showTooltip,
        hideTooltip = _ref4.hideTooltip,
        animate = _ref4.animate,
        motionDamping = _ref4.motionDamping,
        motionStiffness = _ref4.motionStiffness

    var commonProps = function commonProps(ribbon) {
        var ribbonTooltip = React.createElement(TableTooltip, {
            theme: theme,
            rows: [
                [
                    React.createElement(Chip, { color: ribbon.source.color }),
                    React.createElement('strong', null, ribbon.source.id),
                    ribbon.source.value,
                ],
                [
                    React.createElement(Chip, { color: ribbon.target.color }),
                    React.createElement('strong', null, ribbon.target.id),
                    ribbon.target.value,
                ],
            ],
        })

        return {
            strokeWidth: ribbonBorderWidth,
            onMouseEnter: function onMouseEnter(e) {
                setCurrent(ribbon)
                showTooltip(ribbonTooltip, e)
            },
            onMouseMove: function onMouseMove(e) {
                showTooltip(ribbonTooltip, e)
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
            ribbons.map(function(ribbon) {
                var opacity = getOpacity(ribbon)

                return React.createElement(
                    'path',
                    _extends(
                        {
                            key: ribbon.key,
                            d: shapeGenerator(ribbon),
                            fill: ribbon.source.color,
                            fillOpacity: opacity,
                            stroke: ribbon.source.color,
                            strokeOpacity: opacity,
                        },
                        commonProps(ribbon)
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
            willEnter: ribbonWillEnter,
            willLeave: ribbonWillLeave(springConfig),
            styles: ribbons.map(function(ribbon) {
                return {
                    key: ribbon.key,
                    data: ribbon,
                    style: _extends(
                        {},
                        getRibbonAngles(ribbon, false, springConfig),
                        {
                            opacity: spring(getOpacity(ribbon), springConfig),
                        },
                        colorMotionSpring(ribbon.source.color, springConfig)
                    ),
                }
            }),
        },
        function(interpolatedStyles) {
            return React.createElement(
                'g',
                null,
                interpolatedStyles.map(function(_ref5) {
                    var key = _ref5.key,
                        style = _ref5.style,
                        ribbon = _ref5.data

                    var color = getInterpolatedColor(style)

                    return React.createElement(
                        'path',
                        _extends(
                            {
                                key: key,
                                d: shapeGenerator({
                                    source: {
                                        startAngle: style.sourceStartAngle,
                                        endAngle: Math.max(
                                            style.sourceEndAngle,
                                            style.sourceStartAngle
                                        ),
                                    },
                                    target: {
                                        startAngle: style.targetStartAngle,
                                        endAngle: Math.max(
                                            style.targetEndAngle,
                                            style.targetStartAngle
                                        ),
                                    },
                                }),
                                fill: color,
                                fillOpacity: style.opacity,
                                stroke: color,
                                strokeOpacity: style.opacity,
                            },
                            commonProps(ribbon)
                        )
                    )
                })
            )
        }
    )
}

ChordRibbons.propTypes = {
    ribbons: PropTypes.array.isRequired,
    shapeGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    getOpacity: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

export default pure(ChordRibbons)
