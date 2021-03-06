/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import pure from 'recompose/pure'
import BasicTooltip from '../../tooltip/BasicTooltip'

var HeatMapCellTooltip = function HeatMapCellTooltip(_ref) {
    var node = _ref.node,
        theme = _ref.theme
    return React.createElement(BasicTooltip, {
        id: node.yKey + ' - ' + node.xKey,
        value: node.value,
        enableChip: true,
        color: node.color,
        theme: theme,
    })
}

export default pure(HeatMapCellTooltip)
