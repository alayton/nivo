'use strict'

exports.__esModule = true
exports.treeMapDefaultProps = exports.treeMapPropTypes = undefined

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
var treeMapPropTypes = (exports.treeMapPropTypes = {
    // data
    // `root` managed by `withHierarchy()` HOC
    identity: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
        .isRequired,

    // dimensions managed by `withDimensions()` HOC

    leavesOnly: _propTypes2.default.bool.isRequired,
    tile: _props.treeMapTilePropType.isRequired,

    innerPadding: _propTypes2.default.number.isRequired,
    outerPadding: _propTypes2.default.number.isRequired,

    // labels
    enableLabels: _propTypes2.default.bool.isRequired,
    orientLabels: _propTypes2.default.bool.isRequired,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
        .isRequired,
    labelFormat: _propTypes2.default.string,
    labelSkipSize: _propTypes2.default.number.isRequired,

    // theming
    // theme managed by `withTheme()` HOC
    // colors managed by `withColors()` HOC

    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.any.isRequired,

    // placeholders
    namespace: _propTypes2.default.oneOf(['html', 'svg']).isRequired,
    children: _propTypes2.default.func.isRequired,
})

var treeMapDefaultProps = (exports.treeMapDefaultProps = {
    // data
    identity: 'id',

    tile: 'squarify',
    leavesOnly: false,

    // labels
    enableLabels: true,
    orientLabels: true,
    label: 'id',
    labelSkipSize: 0,
    labelTextColor: 'inherit:darker(1)',

    innerPadding: 0,
    outerPadding: 0,

    borderWidth: 0,
    borderColor: 'inherit',
})
