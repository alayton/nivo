'use strict'

exports.__esModule = true

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
    } /*
                                                                                                                                                                                                                                                                   * This file is part of the nivo project.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                   * file that was distributed with this source code.
                                                                                                                                                                                                                                                                   */

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _reactMotion = require('react-motion')

var _colors = require('../../../lib/colors')

var _props = require('../../../props')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

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
        return _react2.default.createElement(
            'g',
            null,
            labels.map(function(label) {
                return _react2.default.createElement(
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

    return _react2.default.createElement(
        _reactMotion.TransitionMotion,
        {
            styles: labels.map(function(label) {
                return {
                    key: label.id,
                    data: label,
                    style: _extends(
                        {
                            x: (0, _reactMotion.spring)(label.x, springProps),
                            y: (0, _reactMotion.spring)(label.y, springProps),
                            rotation: (0, _reactMotion.spring)(labelRotation, springProps),
                        },
                        (0, _colors.colorMotionSpring)(label.color, springProps)
                    ),
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
                        data = _ref2.data

                    var color = (0, _colors.getInterpolatedColor)(style)

                    return _react2.default.createElement(
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
        nodes: _propTypes2.default.arrayOf(
            _propTypes2.default.shape({
                id: _propTypes2.default.oneOfType([
                    _propTypes2.default.string,
                    _propTypes2.default.number,
                ]).isRequired,
                x1: _propTypes2.default.number.isRequired,
                x: _propTypes2.default.number.isRequired,
                y: _propTypes2.default.number.isRequired,
                width: _propTypes2.default.number.isRequired,
                height: _propTypes2.default.number.isRequired,
            })
        ).isRequired,

        width: _propTypes2.default.number.isRequired,

        labelPosition: _propTypes2.default.oneOf(['inside', 'outside']).isRequired,
        labelPadding: _propTypes2.default.number.isRequired,
        labelOrientation: _propTypes2.default.oneOf(['horizontal', 'vertical']).isRequired,
        getLabelTextColor: _propTypes2.default.func.isRequired,

        theme: _propTypes2.default.shape({
            sankey: _propTypes2.default.shape({
                label: _propTypes2.default.object.isRequired,
            }).isRequired,
        }).isRequired,
    },
    _props.motionPropTypes
)

exports.default = (0, _pure2.default)(SankeyLabels)
