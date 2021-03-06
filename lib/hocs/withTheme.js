'use strict'

exports.__esModule = true

var _merge2 = require('lodash/merge')

var _merge3 = _interopRequireDefault(_merge2)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _setPropTypes2 = require('recompose/setPropTypes')

var _setPropTypes3 = _interopRequireDefault(_setPropTypes2)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _defaults = require('../defaults')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * This HOC watch theme prop change
 * and returns it deeply merged with default theme.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 */
exports.default = function() {
    var _setPropTypes

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$srcKey = _ref.srcKey,
        srcKey = _ref$srcKey === undefined ? 'theme' : _ref$srcKey,
        _ref$destKey = _ref.destKey,
        destKey = _ref$destKey === undefined ? 'theme' : _ref$destKey

    return (0, _compose2.default)(
        (0, _setPropTypes3.default)(
            ((_setPropTypes = {}),
            (_setPropTypes[srcKey] = _propTypes2.default.object),
            _setPropTypes)
        ),
        (0, _withPropsOnChange2.default)([srcKey], function(props) {
            var _ref2

            return (
                (_ref2 = {}),
                (_ref2[destKey] = (0, _merge3.default)({}, _defaults.defaultTheme, props[srcKey])),
                _ref2
            )
        })
    )
} /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */
