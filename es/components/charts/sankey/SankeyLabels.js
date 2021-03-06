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

import pure from 'recompose/pure'
import { TransitionMotion, spring } from 'react-motion'
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import { motionPropTypes } from '../../../props'

var SankeyLabels = function SankeyLabels(_ref) {
    var nodes = _ref.nodes,
        width = _ref.width,
        labelPosition = _ref.labelPosition,
        labelPadding = _ref.labelPadding,
        labelOrientation = _ref.labelOrientation,
        getLabelTextColor = _ref.getLabelTextColor,
        theme = _ref.theme,
        animate = _ref.animate,
        motionDamping = _ref.motionDamping,
        motionStiffness = _ref.motionStiffness

    var labelRotation = labelOrientation === 'vertical' ? -90 : 0
    var labels = nodes.map(function(node) {
        var x = void 0
        var textAnchor = void 0
        if (node.x < width / 2) {
            if (labelPosition === 'inside') {
                x = node.x1 + labelPadding
                textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start'
            } else {
                x = node.x - labelPadding
                textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end'
            }
        } else {
            if (labelPosition === 'inside') {
                x = node.x - labelPadding
                textAnchor = labelOrientation === 'vertical' ? 'middle' : 'end'
            } else {
                x = node.x1 + labelPadding
                textAnchor = labelOrientation === 'vertical' ? 'middle' : 'start'
            }
        }

        return {
            id: node.id,
            x: x,
            y: node.y + node.height / 2,
            textAnchor: textAnchor,
            color: getLabelTextColor(node),
        }
    })

    if (!animate) {
        return React.createElement(
            'g',
            null,
            labels.map(function(label) {
                return React.createElement(
                    'text',
                    {
                        key: label.id,
                        alignmentBaseline: 'central',
                        textAnchor: label.textAnchor,
                        transform:
                            'translate(' +
                            label.x +
                            ', ' +
                            label.y +
                            ') rotate(' +
                            labelRotation +
                            ')',
                        style: _extends({}, theme.sankey.label, { fill: label.color }),
                    },
                    label.id
                )
            })
        )
    }

    var springProps = {
        damping: motionDamping,
        stiffness: motionStiffness,
    }

    return React.createElement(
        TransitionMotion,
        {
            styles: labels.map(function(label) {
                return {
                    key: label.id,
                    data: label,
                    style: _extends(
                        {
                            x: spring(label.x, springProps),
                            y: spring(label.y, springProps),
                            rotation: spring(labelRotation, springProps),
                        },
                        colorMotionSpring(label.color, springProps)
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
                        data = _ref2.data

                    var color = getInterpolatedColor(style)

                    return React.createElement(
                        'text',
                        {
                            key: key,
                            transform:
                                'translate(' +
                                style.x +
                                ', ' +
                                style.y +
                                ') rotate(' +
                                style.rotation +
                                ')',
                            alignmentBaseline: 'central',
                            textAnchor: data.textAnchor,
                            style: _extends({}, theme.sankey.label, {
                                fill: color,
                                pointerEvents: 'none',
                            }),
                        },
                        data.id
                    )
                })
            )
        }
    )
}

SankeyLabels.propTypes = _extends(
    {
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                x1: PropTypes.number.isRequired,
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired,
                width: PropTypes.number.isRequired,
                height: PropTypes.number.isRequired,
            })
        ).isRequired,

        width: PropTypes.number.isRequired,

        labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
        labelPadding: PropTypes.number.isRequired,
        labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
        getLabelTextColor: PropTypes.func.isRequired,

        theme: PropTypes.shape({
            sankey: PropTypes.shape({
                label: PropTypes.object.isRequired,
            }).isRequired,
        }).isRequired,
    },
    motionPropTypes
)

export default pure(SankeyLabels)
