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

import { midAngle, getPolarLabelProps, degreesToRadians } from '../../../lib/polar'
import { getRelativeCursor, getHoveredArc } from '../../../lib/interactivity'
import Container from '../Container'
import { ChordPropTypes } from './props'
import enhance from './enhance'
import ChordArcTooltip from './ChordArcTooltip'

var ChordCanvas = (function(_Component) {
    _inherits(ChordCanvas, _Component)

    function ChordCanvas() {
        var _temp, _this, _ret

        _classCallCheck(this, ChordCanvas)

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
                if (_this.props.isInteractive !== true) return

                var _getRelativeCursor = getRelativeCursor(_this.surface, event),
                    x = _getRelativeCursor[0],
                    y = _getRelativeCursor[1]

                var _this$props = _this.props,
                    width = _this$props.width,
                    height = _this$props.height,
                    margin = _this$props.margin,
                    radius = _this$props.radius,
                    innerRadius = _this$props.innerRadius,
                    arcs = _this$props.arcs,
                    setCurrentArc = _this$props.setCurrentArc,
                    theme = _this$props.theme

                var centerX = width / 2 + margin.left
                var centerY = height / 2 + margin.top

                var arc = getHoveredArc(centerX, centerY, radius, innerRadius, arcs, x, y)
                if (arc) {
                    setCurrentArc(arc)
                    showTooltip(
                        React.createElement(ChordArcTooltip, { arc: arc, theme: theme }),
                        event
                    )
                } else {
                    setCurrentArc(null)
                    hideTooltip()
                }
            }),
            (_this.handleMouseLeave = function(hideTooltip) {
                if (_this.props.isInteractive !== true) return

                _this.props.setCurrentArc(null)
                hideTooltip()
            }),
            _temp)),
            _possibleConstructorReturn(_this, _ret)
        )
    }

    ChordCanvas.prototype.componentDidMount = function componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    ChordCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
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

    ChordCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    ChordCanvas.prototype.draw = function draw(props) {
        var _this2 = this

        var pixelRatio = props.pixelRatio,
            width = props.width,
            height = props.height,
            margin = props.margin,
            outerWidth = props.outerWidth,
            outerHeight = props.outerHeight,
            enableLabels = props.enableLabels,
            getLabel = props.getLabel,
            labelOffset = props.labelOffset,
            labelRotation = props.labelRotation,
            getLabelTextColor = props.getLabelTextColor,
            arcGenerator = props.arcGenerator,
            ribbonGenerator = props.ribbonGenerator,
            theme = props.theme,
            ribbons = props.ribbons,
            arcs = props.arcs,
            radius = props.radius,
            getArcOpacity = props.getArcOpacity,
            getRibbonOpacity = props.getRibbonOpacity

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        var centerX = width / 2 + margin.left
        var centerY = height / 2 + margin.top

        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(centerX, centerY)

        ribbonGenerator.context(this.ctx)
        ribbons.forEach(function(ribbon) {
            _this2.ctx.save()
            _this2.ctx.globalAlpha = getRibbonOpacity(ribbon)

            _this2.ctx.beginPath()
            ribbonGenerator(ribbon)
            _this2.ctx.fillStyle = ribbon.source.color
            _this2.ctx.fill()

            _this2.ctx.restore()
        })

        arcGenerator.context(this.ctx)
        arcs.forEach(function(arc) {
            _this2.ctx.save()
            _this2.ctx.globalAlpha = getArcOpacity(arc)

            _this2.ctx.beginPath()
            arcGenerator(arc)
            _this2.ctx.fillStyle = arc.color
            _this2.ctx.fill()

            _this2.ctx.restore()

            if (enableLabels) {
                var labelTextColor = getLabelTextColor(arc, theme)
                var angle = midAngle(arc)
                var _props = getPolarLabelProps(radius + labelOffset, angle, labelRotation)

                _this2.ctx.save()
                _this2.ctx.translate(_props.x, _props.y)
                _this2.ctx.rotate(degreesToRadians(_props.rotate))

                _this2.ctx.textAlign = _props.align
                _this2.ctx.textBaseline = _props.baseline
                _this2.ctx.fillStyle = labelTextColor
                _this2.ctx.fillText(getLabel(arc), 0, 0)

                _this2.ctx.restore()
            }
        })
    }

    ChordCanvas.prototype.render = function render() {
        var _this3 = this

        var _props2 = this.props,
            outerWidth = _props2.outerWidth,
            outerHeight = _props2.outerHeight,
            pixelRatio = _props2.pixelRatio,
            isInteractive = _props2.isInteractive,
            theme = _props2.theme

        return React.createElement(
            Container,
            { isInteractive: isInteractive, theme: theme },
            function(_ref) {
                var showTooltip = _ref.showTooltip,
                    hideTooltip = _ref.hideTooltip
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

    return ChordCanvas
})(Component)

ChordCanvas.propTypes = ChordPropTypes

export default enhance(ChordCanvas)
