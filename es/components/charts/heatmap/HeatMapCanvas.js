import _partial from 'lodash/partial'

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

import { renderAxes } from '../../../lib/canvas/axes'
import { getRelativeCursor, isCursorInRect } from '../../../lib/interactivity'
import { renderRect, renderCircle } from '../../../lib/canvas/charts/heatmap'
import { computeNodes } from '../../../lib/charts/heatmap'
import HeatMapCellTooltip from './HeatMapCellTooltip'
import Container from '../Container'
import { HeatMapPropTypes } from './props'
import enhance from './enhance'

var HeatMapCanvas = (function(_Component) {
    _inherits(HeatMapCanvas, _Component)

    function HeatMapCanvas() {
        var _temp, _this, _ret

        _classCallCheck(this, HeatMapCanvas)

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }

        return (
            (_ret = ((_temp = ((_this = _possibleConstructorReturn(
                this,
                _Component.call.apply(_Component, [this].concat(args))
            )),
            _this)),
            (_this.handleMouseHover = function(showTooltip, hideTooltip, event) {
                if (!_this.nodes) return

                var _getRelativeCursor = getRelativeCursor(_this.surface, event),
                    x = _getRelativeCursor[0],
                    y = _getRelativeCursor[1]

                var _this$props = _this.props,
                    margin = _this$props.margin,
                    offsetX = _this$props.offsetX,
                    offsetY = _this$props.offsetY,
                    theme = _this$props.theme,
                    setCurrentNode = _this$props.setCurrentNode

                var node = _this.nodes.find(function(node) {
                    return isCursorInRect(
                        node.x + margin.left + offsetX - node.width / 2,
                        node.y + margin.top + offsetY - node.height / 2,
                        node.width,
                        node.height,
                        x,
                        y
                    )
                })

                if (node !== undefined) {
                    setCurrentNode(node)
                    showTooltip(
                        React.createElement(HeatMapCellTooltip, { node: node, theme: theme }),
                        event
                    )
                } else {
                    setCurrentNode(null)
                    hideTooltip()
                }
            }),
            (_this.handleMouseLeave = function(hideTooltip) {
                _this.props.setCurrentNode(null)
                hideTooltip()
            }),
            _temp)),
            _possibleConstructorReturn(_this, _ret)
        )
    }

    HeatMapCanvas.prototype.componentDidMount = function componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    HeatMapCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
        if (
            this.props.outerWidth !== props.outerWidth ||
            this.props.outerHeight !== props.outerHeight ||
            this.props.isInteractive !== props.isInteractive ||
            this.props.theme !== props.theme
        ) {
            return true
        } else {
            this.draw(props)
            return false
        }
    }

    HeatMapCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    HeatMapCanvas.prototype.draw = function draw(props) {
        var width = props.width,
            height = props.height,
            outerWidth = props.outerWidth,
            outerHeight = props.outerHeight,
            pixelRatio = props.pixelRatio,
            margin = props.margin,
            offsetX = props.offsetX,
            offsetY = props.offsetY,
            xScale = props.xScale,
            yScale = props.yScale,
            cellShape = props.cellShape

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        var renderNode = void 0
        if (cellShape === 'rect') {
            renderNode = _partial(renderRect, this.ctx)
        } else {
            renderNode = _partial(renderCircle, this.ctx)
        }

        var nodes = computeNodes(props)

        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left + offsetX, margin.top + offsetY)

        renderAxes(this.ctx, {
            xScale: xScale,
            yScale: yScale,
            width: width - offsetX * 2,
            height: height - offsetY * 2,
            top: props.axisTop,
            right: props.axisRight,
            bottom: props.axisBottom,
            left: props.axisLeft,
        })

        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'

        nodes.forEach(renderNode)

        this.nodes = nodes
    }

    HeatMapCanvas.prototype.render = function render() {
        var _this2 = this

        var _props = this.props,
            outerWidth = _props.outerWidth,
            outerHeight = _props.outerHeight,
            pixelRatio = _props.pixelRatio,
            isInteractive = _props.isInteractive,
            theme = _props.theme

        return React.createElement(
            Container,
            { isInteractive: isInteractive, theme: theme },
            function(_ref) {
                var showTooltip = _ref.showTooltip,
                    hideTooltip = _ref.hideTooltip
                return React.createElement('canvas', {
                    ref: function ref(surface) {
                        _this2.surface = surface
                    },
                    width: outerWidth * pixelRatio,
                    height: outerHeight * pixelRatio,
                    style: {
                        width: outerWidth,
                        height: outerHeight,
                    },
                    onMouseEnter: _partial(_this2.handleMouseHover, showTooltip, hideTooltip),
                    onMouseMove: _partial(_this2.handleMouseHover, showTooltip, hideTooltip),
                    onMouseLeave: _partial(_this2.handleMouseLeave, hideTooltip),
                })
            }
        )
    }

    return HeatMapCanvas
})(Component)

HeatMapCanvas.propTypes = HeatMapPropTypes

export default enhance(HeatMapCanvas)
