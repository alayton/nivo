'use strict'

exports.__esModule = true
exports.getInheritedColorGenerator = undefined

var _get2 = require('lodash/get')

var _get3 = _interopRequireDefault(_get2)

var _isFunction2 = require('lodash/isFunction')

var _isFunction3 = _interopRequireDefault(_isFunction2)

var _memoize2 = require('lodash/memoize')

var _memoize3 = _interopRequireDefault(_memoize2)

var _d3Color = require('d3-color')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Memoize both color generator & color generator result.
 */
var memoizedColorModifier = (0, _memoize3.default)(
    function(method, _amount) {
        var amount = parseFloat(_amount)

        return (0, _memoize3.default)(
            function(d) {
                return (0, _d3Color.rgb)(d.color)
                    [method](amount)
                    .toString()
            },
            function(d) {
                return d.color
            }
        )
    },
    function(method, amount) {
        return method + '.' + amount
    }
) /*
     * This file is part of the nivo project.
     *
     * Copyright 2016-present, Raphaël Benitte.
     *
     * For the full copyright and license information, please view the LICENSE
     * file that was distributed with this source code.
     */

var noneGenerator = function noneGenerator() {
    return 'none'
}
var inheritGenerator = function inheritGenerator(d) {
    return d.color
}

/**
 * @param {string|Function} instruction
 * @param {string}          [themeKey]
 * @return {Function}
 */
var getInheritedColorGenerator = (exports.getInheritedColorGenerator = function getInheritedColorGenerator(
    instruction,
    themeKey
) {
    if (instruction === 'none') return noneGenerator

    if ((0, _isFunction3.default)(instruction)) return instruction

    if (instruction === 'theme') {
        if (!themeKey) {
            throw new Error("Cannot use 'theme' directive without providing 'themeKey'")
        }

        return function(d, theme) {
            return (0, _get3.default)(theme, themeKey)
        }
    }

    if (instruction === 'inherit') return inheritGenerator

    var inheritMatches = instruction.match(/inherit:(darker|brighter)\(([0-9.]+)\)/)
    if (inheritMatches) {
        var method = inheritMatches[1]
        var amount = inheritMatches[2]

        return memoizedColorModifier(method, amount)
    }

    return function() {
        return instruction
    }
})
