'use strict'

exports.__esModule = true
exports.ChordDefaultProps = exports.ChordPropTypes = undefined

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var ChordPropTypes = (exports.ChordPropTypes = {
    matrix: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.number))
        .isRequired,
    keys: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,

    padAngle: _propTypes2.default.number.isRequired,
    innerRadiusRatio: _propTypes2.default.number.isRequired,
    innerRadiusOffset: _propTypes2.default.number.isRequired,

    // arcs
    arcOpacity: _propTypes2.default.number.isRequired,
    arcBorderWidth: _propTypes2.default.number.isRequired,

    // ribbons
    ribbonOpacity: _propTypes2.default.number.isRequired,
    ribbonBorderWidth: _propTypes2.default.number.isRequired,

    // labels
    enableLabels: _propTypes2.default.bool.isRequired,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
        .isRequired,
    getLabel: _propTypes2.default.func.isRequired, // computed
    labelOffset: _propTypes2.default.number.isRequired,
    labelRotation: _propTypes2.default.number.isRequired,
    labelTextColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]).isRequired,
    getLabelTextColor: _propTypes2.default.func.isRequired, // computed

    // colors
    colors: _propTypes2.default.any.isRequired,

    // interactivity
    isInteractive: _propTypes2.default.bool.isRequired,
    arcHoverOpacity: _propTypes2.default.number.isRequired,
    arcHoverOthersOpacity: _propTypes2.default.number.isRequired,
    ribbonHoverOpacity: _propTypes2.default.number.isRequired,
    ribbonHoverOthersOpacity: _propTypes2.default.number.isRequired,

    // canvas specific
    pixelRatio: _propTypes2.default.number.isRequired,
}) /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */
var ChordDefaultProps = (exports.ChordDefaultProps = {
    padAngle: 0,
    innerRadiusRatio: 0.9,
    innerRadiusOffset: 0,

    // arcs
    arcOpacity: 1,
    arcBorderWidth: 1,

    // ribbons
    ribbonOpacity: 0.5,
    ribbonBorderWidth: 1,

    // labels
    enableLabels: true,
    label: 'id',
    labelOffset: 12,
    labelRotation: 0,
    labelTextColor: 'inherit:darker(1)',

    // colors
    colors: 'nivo',

    // interactivity
    isInteractive: true,
    arcHoverOpacity: 1,
    arcHoverOthersOpacity: 0.15,
    ribbonHoverOpacity: 0.85,
    ribbonHoverOthersOpacity: 0.15,

    // canvas specific
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,
})
