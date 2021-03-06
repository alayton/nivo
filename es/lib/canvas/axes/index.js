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
import { computeAxisTicks } from '../../axes'
import { degreesToRadians } from '../../polar'

var horizontalPositions = ['top', 'bottom']
var positions = ['top', 'right', 'bottom', 'left']

export var renderAxis = function renderAxis(ctx, _ref) {
    var width = _ref.width,
        height = _ref.height,
        position = _ref.position,
        scale = _ref.scale,
        _ref$tickSize = _ref.tickSize,
        tickSize = _ref$tickSize === undefined ? 5 : _ref$tickSize,
        _ref$tickPadding = _ref.tickPadding,
        tickPadding = _ref$tickPadding === undefined ? 5 : _ref$tickPadding,
        _ref$tickRotation = _ref.tickRotation,
        tickRotation = _ref$tickRotation === undefined ? 0 : _ref$tickRotation

    var _computeAxisTicks = computeAxisTicks({
            width: width,
            height: height,
            position: position,
            scale: scale,
            tickSize: tickSize,
            tickPadding: tickPadding,
            tickRotation: tickRotation,
            engine: 'canvas',
        }),
        x = _computeAxisTicks.x,
        y = _computeAxisTicks.y,
        ticks = _computeAxisTicks.ticks,
        textAlign = _computeAxisTicks.textAlign,
        textBaseline = _computeAxisTicks.textBaseline

    ctx.save()
    ctx.translate(x, y)
    ctx.textAlign = textAlign
    ctx.textBaseline = textBaseline

    ticks.forEach(function(tick) {
        ctx.beginPath()
        ctx.moveTo(tick.x, tick.y)
        ctx.lineTo(tick.x + tick.lineX, tick.y + tick.lineY)
        ctx.stroke()

        ctx.save()
        ctx.translate(tick.x + tick.textX, tick.y + tick.textY)
        ctx.rotate(degreesToRadians(tickRotation))
        ctx.fillText(tick.value, 0, 0)
        ctx.restore()
    })

    ctx.restore()
}

export var renderAxes = function renderAxes(ctx, _ref2) {
    var xScale = _ref2.xScale,
        yScale = _ref2.yScale,
        width = _ref2.width,
        height = _ref2.height,
        top = _ref2.top,
        right = _ref2.right,
        bottom = _ref2.bottom,
        left = _ref2.left

    var axes = { top: top, right: right, bottom: bottom, left: left }

    positions.map(function(position) {
        if (!axes[position]) return null

        var axis = axes[position]
        var scale = horizontalPositions.includes(position) ? xScale : yScale

        renderAxis(
            ctx,
            _extends({}, axis, {
                width: width,
                height: height,
                position: position,
                scale: scale,
            })
        )
    })
}
