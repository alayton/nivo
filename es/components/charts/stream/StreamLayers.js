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
import { motionPropTypes } from '../../../props'
import SmartMotion from '../../SmartMotion'
import BasicTooltip from '../../tooltip/BasicTooltip'

var StreamLayers = function StreamLayers(_ref) {
    var layers = _ref.layers,
        fillOpacity = _ref.fillOpacity,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        theme = _ref.theme,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping

    if (animate !== true) {
        return React.createElement(
            'g',
            null,
            layers.map(function(_ref2, i) {
                var id = _ref2.id,
                    path = _ref2.path,
                    color = _ref2.color

                var handleTooltip = function handleTooltip(e) {
                    return showTooltip(
                        React.createElement(BasicTooltip, {
                            id: id,
                            enableChip: true,
                            color: color,
                            theme: theme,
                        }),
                        e
                    )
                }
                return React.createElement('path', {
                    key: i,
                    onMouseMove: handleTooltip,
                    onMouseEnter: handleTooltip,
                    onMouseLeave: hideTooltip,
                    d: path,
                    fill: color,
                    fillOpacity: fillOpacity,
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
        layers.map(function(_ref3, i) {
            var id = _ref3.id,
                path = _ref3.path,
                color = _ref3.color

            var handleTooltip = function handleTooltip(e) {
                return showTooltip(
                    React.createElement(BasicTooltip, {
                        id: id,
                        enableChip: true,
                        color: color,
                        theme: theme,
                    }),
                    e
                )
            }
            return React.createElement(
                SmartMotion,
                {
                    key: i,
                    style: function style(spring) {
                        return {
                            d: spring(path, springConfig),
                            fill: spring(color, springConfig),
                            fillOpacity: spring(fillOpacity, springConfig),
                        }
                    },
                },
                function(style) {
                    return React.createElement(
                        'path',
                        _extends(
                            {
                                onMouseMove: handleTooltip,
                                onMouseEnter: handleTooltip,
                                onMouseLeave: hideTooltip,
                            },
                            style
                        )
                    )
                }
            )
        })
    )
}

StreamLayers.propTypes = _extends(
    {
        fillOpacity: PropTypes.number.isRequired,

        theme: PropTypes.object.isRequired,
    },
    motionPropTypes
)

export default StreamLayers
