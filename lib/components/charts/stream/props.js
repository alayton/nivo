'use strict'

exports.__esModule = true
exports.StreamDefaultProps = exports.StreamPropTypes = undefined

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _props = require('../../../props')

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
var StreamPropTypes = (exports.StreamPropTypes = {
    // data
    data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    keys: _propTypes2.default.array.isRequired,

    stack: _propTypes2.default.func.isRequired,
    xScale: _propTypes2.default.func.isRequired,
    yScale: _propTypes2.default.func.isRequired,

    order: _props.stackOrderPropType.isRequired,
    offsetType: _props.stackOffsetPropType.isRequired,
    curve: _props.areaCurvePropType.isRequired,
    areaGenerator: _propTypes2.default.func.isRequired,

    // axes & grid
    axisTop: _propTypes2.default.object,
    axisRight: _propTypes2.default.object,
    axisBottom: _propTypes2.default.object,
    axisLeft: _propTypes2.default.object,
    enableGridX: _propTypes2.default.bool.isRequired,
    enableGridY: _propTypes2.default.bool.isRequired,

    // theming
    colors: _propTypes2.default.any.isRequired,
    fillOpacity: _propTypes2.default.number.isRequired,
    getColor: _propTypes2.default.func.isRequired,

    // interactivity
    isInteractive: _propTypes2.default.bool,

    // stack tooltip
    enableStackTooltip: _propTypes2.default.bool.isRequired,
})

var StreamDefaultProps = (exports.StreamDefaultProps = {
    order: 'none',
    offsetType: 'wiggle',
    curve: 'catmullRom',

    // axes & grid
    axisBottom: {},
    enableGridX: true,
    enableGridY: false,

    // theming
    colors: 'nivo',
    fillOpacity: 1,

    // interactivity
    isInteractive: true,

    // stack tooltip
    enableStackTooltip: true,
})
