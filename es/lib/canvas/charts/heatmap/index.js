/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Render heatmap rect cell.
 *
 * @param {Object} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string) color
 * @param {number} opacity
 * @param {string} labelTextColor
 * @param {number} value
 */
export var renderRect = function renderRect(ctx, _ref) {
    var x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        color = _ref.color,
        opacity = _ref.opacity,
        labelTextColor = _ref.labelTextColor,
        value = _ref.value

    ctx.save()
    ctx.globalAlpha = opacity

    ctx.fillStyle = color
    ctx.fillRect(x - width / 2, y - height / 2, width, height)

    ctx.fillStyle = labelTextColor
    ctx.fillText(value, x, y)

    ctx.restore()
}

/**
 * Render heatmap circle cell.
 *
 * @param {Object} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {string) color
 * @param {number} opacity
 * @param {string} labelTextColor
 * @param {number} value
 */
export var renderCircle = function renderCircle(ctx, _ref2) {
    var x = _ref2.x,
        y = _ref2.y,
        width = _ref2.width,
        height = _ref2.height,
        color = _ref2.color,
        opacity = _ref2.opacity,
        labelTextColor = _ref2.labelTextColor,
        value = _ref2.value

    ctx.save()
    ctx.globalAlpha = opacity

    var radius = Math.min(width, height) / 2

    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = labelTextColor
    ctx.fillText(value, x, y)

    ctx.restore()
}
