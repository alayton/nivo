import _partial from 'lodash/partial'

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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
            'Super expression must either be null or a function, not ' + typeof superClass
        )
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
    })
    if (superClass)
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass)
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'

import { TransitionMotion } from 'react-motion'
import { colorMotionSpring, getInterpolatedColor } from '../../../lib/colors'
import { HeatMapPropTypes } from './props'
import { computeNodes } from '../../../lib/charts/heatmap'
import enhance from './enhance'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import Grid from '../../axes/Grid'
import Axes from '../../axes/Axes'
import HeatMapCellRect from './HeatMapCellRect'
import HeatMapCellCircle from './HeatMapCellCircle'
import HeatMapCellTooltip from './HeatMapCellTooltip'

var HeatMap = (function(_Component) {
    _inherits(HeatMap, _Component)

    function HeatMap() {
        var _temp, _this, _ret

        _classCallCheck(this, HeatMap)

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }

        return (
            (_ret = ((_temp = ((_this = _possibleConstructorReturn(
                this,
                _Component.call.apply(_Component, [this].concat(args))
            )),
            _this)),
            (_this.handleNodeHover = function(showTooltip, node, event) {
                var _this$props = _this.props,
                    setCurrentNode = _this$props.setCurrentNode,
                    theme = _this$props.theme

                setCurrentNode(node)
                showTooltip(
                    React.createElement(HeatMapCellTooltip, { node: node, theme: theme }),
                    event
                )
            }),
            (_this.handleNodeLeave = function(hideTooltip) {
                _this.props.setCurrentNode(null)
                hideTooltip()
            }),
            _temp)),
            _possibleConstructorReturn(_this, _ret)
        )
    }

    HeatMap.prototype.render = function render() {
        var _this2 = this

        var _props = this.props,
            xScale = _props.xScale,
            yScale = _props.yScale,
            offsetX = _props.offsetX,
            offsetY = _props.offsetY,
            margin = _props.margin,
            width = _props.width,
            height = _props.height,
            outerWidth = _props.outerWidth,
            outerHeight = _props.outerHeight,
            cellShape = _props.cellShape,
            cellBorderWidth = _props.cellBorderWidth,
            getCellBorderColor = _props.getCellBorderColor,
            axisTop = _props.axisTop,
            axisRight = _props.axisRight,
            axisBottom = _props.axisBottom,
            axisLeft = _props.axisLeft,
            enableGridX = _props.enableGridX,
            enableGridY = _props.enableGridY,
            enableLabels = _props.enableLabels,
            getLabelTextColor = _props.getLabelTextColor,
            theme = _props.theme,
            animate = _props.animate,
            motionStiffness = _props.motionStiffness,
            motionDamping = _props.motionDamping,
            boundSpring = _props.boundSpring,
            isInteractive = _props.isInteractive

        var Cell = void 0
        if (cellShape === 'rect') {
            Cell = HeatMapCellRect
        } else if (cellShape === 'circle') {
            Cell = HeatMapCellCircle
        } else {
            Cell = cellShape
        }

        var nodes = computeNodes(this.props)

        var motionProps = {
            animate: animate,
            motionDamping: motionDamping,
            motionStiffness: motionStiffness,
        }

        return React.createElement(
            Container,
            { isInteractive: isInteractive, theme: theme },
            function(_ref) {
                var showTooltip = _ref.showTooltip,
                    hideTooltip = _ref.hideTooltip

                var onHover = _partial(_this2.handleNodeHover, showTooltip)
                var onLeave = _partial(_this2.handleNodeLeave, hideTooltip)

                return React.createElement(
                    SvgWrapper,
                    {
                        width: outerWidth,
                        height: outerHeight,
                        margin: Object.assign({}, margin, {
                            top: margin.top + offsetY,
                            left: margin.left + offsetX,
                        }),
                    },
                    React.createElement(
                        Grid,
                        _extends(
                            {
                                theme: theme,
                                width: width - offsetX * 2,
                                height: height - offsetY * 2,
                                xScale: enableGridX ? xScale : null,
                                yScale: enableGridY ? yScale : null,
                            },
                            motionProps
                        )
                    ),
                    React.createElement(
                        Axes,
                        _extends(
                            {
                                xScale: xScale,
                                yScale: yScale,
                                width: width,
                                height: height,
                                theme: theme,
                                top: axisTop,
                                right: axisRight,
                                bottom: axisBottom,
                                left: axisLeft,
                            },
                            motionProps
                        )
                    ),
                    !animate &&
                        nodes.map(function(node) {
                            return React.createElement(Cell, {
                                key: node.key,
                                value: node.value,
                                x: node.x,
                                y: node.y,
                                width: node.width,
                                height: node.height,
                                color: node.color,
                                opacity: node.opacity,
                                borderWidth: cellBorderWidth,
                                borderColor: getCellBorderColor(node),
                                textColor: getLabelTextColor(node),
                                onHover: _partial(onHover, node),
                                onLeave: onLeave,
                            })
                        }),
                    animate === true &&
                        React.createElement(
                            TransitionMotion,
                            {
                                styles: nodes.map(function(node) {
                                    return {
                                        key: node.key,
                                        data: node,
                                        style: _extends(
                                            {
                                                x: boundSpring(node.x),
                                                y: boundSpring(node.y),
                                                width: boundSpring(node.width),
                                                height: boundSpring(node.height),
                                                opacity: boundSpring(node.opacity),
                                            },
                                            colorMotionSpring(node.color, {
                                                damping: motionDamping,
                                                stiffness: motionStiffness,
                                            })
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
                                            node = _ref2.data

                                        var color = getInterpolatedColor(style)

                                        return React.createElement(Cell, {
                                            key: key,
                                            value: node.value,
                                            x: style.x,
                                            y: style.y,
                                            width: Math.max(style.width, 0),
                                            height: Math.max(style.height, 0),
                                            color: color,
                                            opacity: style.opacity,
                                            borderWidth: cellBorderWidth,
                                            borderColor: getCellBorderColor(
                                                _extends({}, node, {
                                                    color: color,
                                                })
                                            ),
                                            textColor: getLabelTextColor(
                                                _extends({}, node, {
                                                    color: color,
                                                })
                                            ),
                                            onHover: _partial(onHover, node),
                                            onLeave: onLeave,
                                        })
                                    })
                                )
                            }
                        )
                )
            }
        )
    }

    return HeatMap
})(Component)

HeatMap.propTypes = HeatMapPropTypes

export default enhance(HeatMap)
