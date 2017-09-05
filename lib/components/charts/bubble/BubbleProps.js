'use strict'

exports.__esModule = true
exports.bubbleDefaultProps = exports.bubblePropTypes = undefined

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var bubblePropTypes = (exports.bubblePropTypes = {
    // data
    // `root` managed by `withHierarchy()` HOC
    identity: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
        .isRequired,

    // dimensions managed by `withDimensions()` HOC

    leavesOnly: _propTypes2.default.bool.isRequired,
    padding: _propTypes2.default.number.isRequired,

    // theming
    // theme managed by `withTheme()` HOC
    // colors managed by `withColors()` HOC

    // placeholders
    namespace: _propTypes2.default.oneOf(['html', 'svg']),
    children: _propTypes2.default.func.isRequired,

    // border
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.any.isRequired,

    // labels
    enableLabel: _propTypes2.default.bool.isRequired,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
        .isRequired,
    labelFormat: _propTypes2.default.string,
    labelTextColor: _propTypes2.default.any.isRequired,
    labelSkipRadius: _propTypes2.default.number.isRequired,

    // transitions
    transitionDuration: _propTypes2.default.number.isRequired, // d3 transitions
    transitionEasing: _propTypes2.default.string.isRequired, // d3 transitions

    // interactivity
    isInteractive: _propTypes2.default.bool.isRequired,

    // zooming
    isZoomable: _propTypes2.default.bool.isRequired,
}) /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */
var bubbleDefaultProps = (exports.bubbleDefaultProps = {
    // data
    identity: 'id',

    leavesOnly: false,
    padding: 1,

    // placeholders
    namespace: 'html',

    // border
    borderWidth: 0,
    borderColor: 'inherit',

    // labels
    enableLabel: true,
    label: 'id',
    labelTextColor: 'inherit:darker(1)',
    labelSkipRadius: 8,

    // interactivity
    isInteractive: true,

    // zooming
    isZoomable: true,
})
