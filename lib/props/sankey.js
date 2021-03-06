'use strict'

exports.__esModule = true
exports.sankeyAlignmentFromProp = exports.sankeyAlignmentPropType = exports.sankeyAlignmentPropKeys = exports.sankeyAlignmentPropMapping = undefined

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _d3Sankey = require('d3-sankey')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var sankeyAlignmentPropMapping = (exports.sankeyAlignmentPropMapping = {
    center: _d3Sankey.sankeyCenter,
    justify: _d3Sankey.sankeyJustify,
    left: _d3Sankey.sankeyLeft,
    right: _d3Sankey.sankeyRight,
})

var sankeyAlignmentPropKeys = (exports.sankeyAlignmentPropKeys = Object.keys(
    sankeyAlignmentPropMapping
))

var sankeyAlignmentPropType = (exports.sankeyAlignmentPropType = _propTypes2.default.oneOf(
    sankeyAlignmentPropKeys
))

var sankeyAlignmentFromProp = (exports.sankeyAlignmentFromProp = function sankeyAlignmentFromProp(
    prop
) {
    return sankeyAlignmentPropMapping[prop]
})
