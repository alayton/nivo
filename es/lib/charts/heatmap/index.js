/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var isHoverTargetByType = {
    cell: function cell(node, current) {
        return node.xKey === current.xKey && node.yKey === current.yKey
    },
    row: function row(node, current) {
        return node.yKey === current.yKey
    },
    column: function column(node, current) {
        return node.xKey === current.xKey
    },
    rowColumn: function rowColumn(node, current) {
        return node.xKey === current.xKey || node.yKey === current.yKey
    },
}

export var computeNodes = function computeNodes(_ref) {
    var data = _ref.data,
        keys = _ref.keys,
        getIndex = _ref.getIndex,
        xScale = _ref.xScale,
        yScale = _ref.yScale,
        sizeScale = _ref.sizeScale,
        cellOpacity = _ref.cellOpacity,
        cellWidth = _ref.cellWidth,
        cellHeight = _ref.cellHeight,
        colorScale = _ref.colorScale,
        getLabelTextColor = _ref.getLabelTextColor,
        currentNode = _ref.currentNode,
        hoverTarget = _ref.hoverTarget,
        cellHoverOpacity = _ref.cellHoverOpacity,
        cellHoverOthersOpacity = _ref.cellHoverOthersOpacity

    var isHoverTarget = isHoverTargetByType[hoverTarget]

    return data.reduce(function(acc, d) {
        keys.forEach(function(key) {
            var width = sizeScale ? Math.min(sizeScale(d[key]) * cellWidth, cellWidth) : cellWidth
            var height = sizeScale
                ? Math.min(sizeScale(d[key]) * cellHeight, cellHeight)
                : cellHeight

            var node = {
                key: key + '.' + getIndex(d),
                xKey: key,
                yKey: getIndex(d),
                x: xScale(key),
                y: yScale(getIndex(d)),
                width: width,
                height: height,
                value: d[key],
                color: colorScale(d[key]),
            }

            var opacity = cellOpacity
            if (currentNode) {
                opacity = isHoverTarget(node, currentNode)
                    ? cellHoverOpacity
                    : cellHoverOthersOpacity
            }

            acc.push(
                Object.assign(node, {
                    labelTextColor: getLabelTextColor(node),
                    opacity: opacity,
                })
            )
        })

        return acc
    }, [])
}
