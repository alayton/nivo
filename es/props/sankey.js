/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import { sankeyCenter, sankeyJustify, sankeyLeft, sankeyRight } from 'd3-sankey'

export var sankeyAlignmentPropMapping = {
    center: sankeyCenter,
    justify: sankeyJustify,
    left: sankeyLeft,
    right: sankeyRight,
}

export var sankeyAlignmentPropKeys = Object.keys(sankeyAlignmentPropMapping)

export var sankeyAlignmentPropType = PropTypes.oneOf(sankeyAlignmentPropKeys)

export var sankeyAlignmentFromProp = function sankeyAlignmentFromProp(prop) {
    return sankeyAlignmentPropMapping[prop]
}
