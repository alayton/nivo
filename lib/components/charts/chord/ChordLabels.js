'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _reactMotion = require('react-motion')

var _polar = require('../../../lib/polar')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
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
        return _react2.default.createElement(
            'g',
            null,
            arcs.map(function(arc) {
                var color = getColor(arc, theme)
                var angle = (0, _polar.midAngle)(arc)
                var props = (0, _polar.getPolarLabelProps)(radius, angle, rotation)

                return _react2.default.createElement(
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

    return _react2.default.createElement(
        _reactMotion.TransitionMotion,
        {
            styles: arcs.map(function(arc) {
                var angle = (0, _polar.midAngle)(arc)

                return {
                    key: arc.key,
                    data: arc,
                    style: {
                        angle: (0, _reactMotion.spring)(angle, springConfig),
                    },
                }
            }),
        },
        function(interpolatedStyles) {
            return _react2.default.createElement(
                'g',
                null,
                interpolatedStyles.map(function(_ref2) {
                    var key = _ref2.key,
                        style = _ref2.style,
                        arc = _ref2.data

                    var color = getColor(arc, theme)
                    var props = (0, _polar.getPolarLabelProps)(radius, style.angle, rotation)

                    return _react2.default.createElement(
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
    arcs: _propTypes2.default.array.isRequired,
    radius: _propTypes2.default.number.isRequired,
    rotation: _propTypes2.default.number.isRequired,
    getLabel: _propTypes2.default.func.isRequired,
    getColor: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.object.isRequired,
}

exports.default = ChordLabels
