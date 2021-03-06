'use strict'

exports.__esModule = true
exports.HeatMapDefaultProps = exports.HeatMapPropTypes = undefined

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
var HeatMapPropTypes = (exports.HeatMapPropTypes = {
    // data
    data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    indexBy: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
        .isRequired,
    getIndex: _propTypes2.default.func.isRequired, // computed
    keys: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,

    minValue: _propTypes2.default.oneOfType([
        _propTypes2.default.oneOf(['auto']),
        _propTypes2.default.number,
    ]).isRequired,
    maxValue: _propTypes2.default.oneOfType([
        _propTypes2.default.oneOf(['auto']),
        _propTypes2.default.number,
    ]).isRequired,

    forceSquare: _propTypes2.default.bool.isRequired,
    sizeVariation: _propTypes2.default.number.isRequired,
    padding: _propTypes2.default.number.isRequired,

    // cells
    cellShape: _propTypes2.default.oneOfType([
        _propTypes2.default.oneOf(['rect', 'circle']),
        _propTypes2.default.func,
    ]).isRequired,
    cellOpacity: _propTypes2.default.number.isRequired,
    cellBorderWidth: _propTypes2.default.number.isRequired,
    cellBorderColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]).isRequired,
    getCellBorderColor: _propTypes2.default.func.isRequired, // computed

    // axes & grid
    axisTop: _propTypes2.default.object,
    axisRight: _propTypes2.default.object,
    axisBottom: _propTypes2.default.object,
    axisLeft: _propTypes2.default.object,
    enableGridX: _propTypes2.default.bool.isRequired,
    enableGridY: _propTypes2.default.bool.isRequired,

    // labels
    enableLabels: _propTypes2.default.bool.isRequired,
    labelTextColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]).isRequired,
    getLabelTextColor: _propTypes2.default.func.isRequired, // computed

    // theming
    colors: _props.quantizeColorScalePropType.isRequired,
    colorScale: _propTypes2.default.func.isRequired, // computed

    // interactivity
    isInteractive: _propTypes2.default.bool,
    hoverTarget: _propTypes2.default.oneOf(['cell', 'row', 'column', 'rowColumn']).isRequired,
    cellHoverOpacity: _propTypes2.default.number.isRequired,
    cellHoverOthersOpacity: _propTypes2.default.number.isRequired,

    // canvas specific
    pixelRatio: _propTypes2.default.number.isRequired,
})

var HeatMapDefaultProps = (exports.HeatMapDefaultProps = {
    indexBy: 'id',

    minValue: 'auto',
    maxValue: 'auto',

    forceSquare: false,
    sizeVariation: 0,
    padding: 0,

    // cells
    cellShape: 'rect',
    cellOpacity: 0.85,
    cellBorderWidth: 0,
    cellBorderColor: 'inherit',

    // axes & grid
    axisTop: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: false,

    // labels
    enableLabels: true,
    labelTextColor: 'inherit:darker(1.4)',

    // theming
    colors: 'nivo',

    // interactivity
    isInteractive: true,
    hoverTarget: 'rowColumn',
    cellHoverOpacity: 1,
    cellHoverOthersOpacity: 0.35,

    // canvas specific
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,
})
