'use strict'

exports.__esModule = true
exports.BarDefaultProps = exports.BarPropTypes = undefined

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var BarPropTypes = (exports.BarPropTypes = {
    // data
    data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    indexBy: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
        .isRequired,
    getIndex: _propTypes2.default.func.isRequired, // computed
    keys: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,

    groupMode: _propTypes2.default.oneOf(['stacked', 'grouped']).isRequired,
    layout: _propTypes2.default.oneOf(['horizontal', 'vertical']).isRequired,

    xPadding: _propTypes2.default.number.isRequired,

    // axes & grid
    axisTop: _propTypes2.default.object,
    axisRight: _propTypes2.default.object,
    axisBottom: _propTypes2.default.object,
    axisLeft: _propTypes2.default.object,
    enableGridX: _propTypes2.default.bool.isRequired,
    enableGridY: _propTypes2.default.bool.isRequired,

    // labels
    enableLabels: _propTypes2.default.bool.isRequired,
    labelsTextColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]).isRequired,
    getLabelsTextColor: _propTypes2.default.func.isRequired, // computed
    labelsLinkColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]).isRequired,
    getLabelsLinkColor: _propTypes2.default.func.isRequired, // computed

    // interactions
    onClick: _propTypes2.default.func,

    // theming
    getColor: _propTypes2.default.func.isRequired,

    // interactivity
    isInteractive: _propTypes2.default.bool,

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
var BarDefaultProps = (exports.BarDefaultProps = {
    indexBy: 'id',
    keys: ['value'],

    groupMode: 'stacked',
    layout: 'vertical',

    xPadding: 0.1,

    // axes & grid
    axisBottom: {},
    axisLeft: {},
    enableGridX: false,
    enableGridY: true,

    // labels
    enableLabels: true,
    labelsLinkColor: 'theme',
    labelsTextColor: 'theme',

    // interactivity
    isInteractive: true,

    // canvas specific
    pixelRatio: window && window.devicePixelRatio ? window.devicePixelRatio : 1,
})
