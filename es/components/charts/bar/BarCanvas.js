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

import { generateGroupedBars, generateStackedBars } from '../../../lib/charts/bar'
import { renderAxes } from '../../../lib/canvas/axes'
import Container from '../Container'
import BasicTooltip from '../../tooltip/BasicTooltip'
import { BarPropTypes } from './props'
import enhance from './enhance'
import { getRelativeCursor, isCursorInRect } from '../../../lib/interactivity'

var BarCanvas = (function(_Component) {
    _inherits(BarCanvas, _Component)

    function BarCanvas() {
        var _temp, _this, _ret

        _classCallCheck(this, BarCanvas)

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
                if (!_this.bars) return

                var _getRelativeCursor = getRelativeCursor(_this.surface, event),
                    x = _getRelativeCursor[0],
                    y = _getRelativeCursor[1]

                var _this$props = _this.props,
                    margin = _this$props.margin,
                    theme = _this$props.theme

                var bar = _this.bars.find(function(bar) {
                    return isCursorInRect(
                        bar.x + margin.left,
                        bar.y + margin.top,
                        bar.width,
                        bar.height,
                        x,
                        y
                    )
                })

                if (bar !== undefined) {
                    showTooltip(
                        React.createElement(BasicTooltip, {
                            id: bar.data.id + ' - ' + bar.data.indexValue,
                            value: bar.data.value,
                            enableChip: true,
                            color: bar.color,
                            theme: theme,
                        }),
                        event
                    )
                } else {
                    hideTooltip()
                }
            }),
            (_this.handleMouseLeave = function(hideTooltip) {
                hideTooltip()
            }),
            _temp)),
            _possibleConstructorReturn(_this, _ret)
        )
    }

    BarCanvas.prototype.componentDidMount = function componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    BarCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
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

    BarCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    BarCanvas.prototype.draw = function draw(props) {
        var _this2 = this

        var data = props.data,
            keys = props.keys,
            getIndex = props.getIndex,
            width = props.width,
            height = props.height,
            outerWidth = props.outerWidth,
            outerHeight = props.outerHeight,
            pixelRatio = props.pixelRatio,
            margin = props.margin,
            layout = props.layout,
            groupMode = props.groupMode,
            xPadding = props.xPadding,
            axisTop = props.axisTop,
            axisRight = props.axisRight,
            axisBottom = props.axisBottom,
            axisLeft = props.axisLeft,
            getColor = props.getColor

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        var result = void 0
        if (groupMode === 'grouped') {
            result = generateGroupedBars(layout, data, getIndex, keys, width, height, getColor, {
                xPadding: xPadding,
            })
        } else if (groupMode === 'stacked') {
            result = generateStackedBars(layout, data, getIndex, keys, width, height, getColor, {
                xPadding: xPadding,
            })
        }

        this.bars = result.bars

        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left, margin.top)

        renderAxes(this.ctx, {
            xScale: result.xScale,
            yScale: result.yScale,
            width: width,
            height: height,
            top: axisTop,
            right: axisRight,
            bottom: axisBottom,
            left: axisLeft,
        })

        result.bars.forEach(function(_ref) {
            var x = _ref.x,
                y = _ref.y,
                color = _ref.color,
                width = _ref.width,
                height = _ref.height

            _this2.ctx.fillStyle = color
            _this2.ctx.fillRect(x, y, width, height)
        })
    }

    BarCanvas.prototype.render = function render() {
        var _this3 = this

        var _props = this.props,
            outerWidth = _props.outerWidth,
            outerHeight = _props.outerHeight,
            pixelRatio = _props.pixelRatio,
            isInteractive = _props.isInteractive,
            theme = _props.theme

        return React.createElement(
            Container,
            { isInteractive: isInteractive, theme: theme },
            function(_ref2) {
                var showTooltip = _ref2.showTooltip,
                    hideTooltip = _ref2.hideTooltip
                return React.createElement('canvas', {
                    ref: function ref(surface) {
                        _this3.surface = surface
                    },
                    width: outerWidth * pixelRatio,
                    height: outerHeight * pixelRatio,
                    style: {
                        width: outerWidth,
                        height: outerHeight,
                    },
                    onMouseEnter: _partial(_this3.handleMouseHover, showTooltip, hideTooltip),
                    onMouseMove: _partial(_this3.handleMouseHover, showTooltip, hideTooltip),
                    onMouseLeave: _partial(_this3.handleMouseLeave, hideTooltip),
                })
            }
        )
    }

    return BarCanvas
})(Component)

BarCanvas.propTypes = BarPropTypes

export default enhance(BarCanvas)
