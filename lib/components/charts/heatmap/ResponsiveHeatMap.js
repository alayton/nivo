'use strict'

exports.__esModule = true

var _extends =
    Object.assign ||
    function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i]
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    } /*
                                                                                                                                                                                                                                                                   * This file is part of the nivo project.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                   * file that was distributed with this source code.
                                                                                                                                                                                                                                                                   */

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _ResponsiveWrapper = require('../ResponsiveWrapper')

var _ResponsiveWrapper2 = _interopRequireDefault(_ResponsiveWrapper)

var _HeatMap = require('./HeatMap')

var _HeatMap2 = _interopRequireDefault(_HeatMap)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var ResponsiveHeatMap = function ResponsiveHeatMap(props) {
    return _react2.default.createElement(_ResponsiveWrapper2.default, null, function(_ref) {
        var width = _ref.width,
            height = _ref.height
        return _react2.default.createElement(
            _HeatMap2.default,
            _extends({ width: width, height: height }, props)
        )
    })
}

exports.default = ResponsiveHeatMap
