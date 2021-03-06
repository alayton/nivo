'use strict'

exports.__esModule = true
exports.guessQuantizeColorScale = exports.quantizeColorScalesKeys = exports.quantizeColorScales = undefined

var _isFunction2 = require('lodash/isFunction')

var _isFunction3 = _interopRequireDefault(_isFunction2)

var _isArray2 = require('lodash/isArray')

var _isArray3 = _interopRequireDefault(_isArray2)

var _last2 = require('lodash/last')

var _last3 = _interopRequireDefault(_last2)

var _d3Scale = require('d3-scale')

var _d3ScaleChromatic = require('d3-scale-chromatic')

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
var quantizeColorScales = (exports.quantizeColorScales = {
    nivo: ['#d76445', '#f47560', '#e8c1a0', '#97e3d5', '#61cdbb', '#00b0a7'],

    // Diverging
    BrBG: (0, _last3.default)(_d3ScaleChromatic.schemeBrBG),
    PRGn: (0, _last3.default)(_d3ScaleChromatic.schemePRGn),
    PiYG: (0, _last3.default)(_d3ScaleChromatic.schemePiYG),
    PuOr: (0, _last3.default)(_d3ScaleChromatic.schemePuOr),
    RdBu: (0, _last3.default)(_d3ScaleChromatic.schemeRdBu),
    RdGy: (0, _last3.default)(_d3ScaleChromatic.schemeRdGy),
    RdYlBu: (0, _last3.default)(_d3ScaleChromatic.schemeRdYlBu),
    RdYlGn: (0, _last3.default)(_d3ScaleChromatic.schemeRdYlGn),
    spectral: (0, _last3.default)(_d3ScaleChromatic.schemeSpectral),

    // Sequential (Single Hue)
    blues: (0, _last3.default)(_d3ScaleChromatic.schemeBlues),
    greens: (0, _last3.default)(_d3ScaleChromatic.schemeGreens),
    greys: (0, _last3.default)(_d3ScaleChromatic.schemeGreys),
    oranges: (0, _last3.default)(_d3ScaleChromatic.schemeOranges),
    purples: (0, _last3.default)(_d3ScaleChromatic.schemePurples),
    reds: (0, _last3.default)(_d3ScaleChromatic.schemeReds),

    // Sequential (Multi-Hue)
    BuGn: (0, _last3.default)(_d3ScaleChromatic.schemeBuGn),
    BuPu: (0, _last3.default)(_d3ScaleChromatic.schemeBuPu),
    GnBu: (0, _last3.default)(_d3ScaleChromatic.schemeGnBu),
    OrRd: (0, _last3.default)(_d3ScaleChromatic.schemeOrRd),
    PuBuGn: (0, _last3.default)(_d3ScaleChromatic.schemePuBuGn),
    PuBu: (0, _last3.default)(_d3ScaleChromatic.schemePuBu),
    PuRd: (0, _last3.default)(_d3ScaleChromatic.schemePuRd),
    RdPu: (0, _last3.default)(_d3ScaleChromatic.schemeRdPu),
    YlGnBu: (0, _last3.default)(_d3ScaleChromatic.schemeYlGnBu),
    YlGn: (0, _last3.default)(_d3ScaleChromatic.schemeYlGn),
    YlOrBr: (0, _last3.default)(_d3ScaleChromatic.schemeYlOrBr),
    YlOrRd: (0, _last3.default)(_d3ScaleChromatic.schemeYlOrRd),
})

var quantizeColorScalesKeys = (exports.quantizeColorScalesKeys = Object.keys(quantizeColorScales))

var guessQuantizeColorScale = (exports.guessQuantizeColorScale = function guessQuantizeColorScale(
    colors
) {
    // colors is already a valid scale
    if ((0, _isFunction3.default)(colors)) {
        if (!(0, _isFunction3.default)(colors.domain)) {
            throw new Error(
                "Provided colors should be a valid quantize scale providing a 'domain()' function"
            )
        }

        return colors
    }

    if (quantizeColorScales[colors]) {
        // use predefined d3 quantize color scale
        return (0, _d3Scale.scaleQuantize)().range(quantizeColorScales[colors])
    }

    // user defined colors
    if ((0, _isArray3.default)(colors)) return (0, _d3Scale.scaleQuantize)().range(colors)

    throw new Error(
        "Unable to guess quantize color scale from '" +
            colors +
            "',\nmust be a function or one of:\n'" +
            quantizeColorScalesKeys.join("', '") +
            "'"
    )
})
