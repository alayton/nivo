import _isFunction from 'lodash/isFunction'
import _isArray from 'lodash/isArray'
import _last from 'lodash/last' /*
                                  * This file is part of the nivo project.
                                  *
                                  * Copyright 2016-present, Raphaël Benitte.
                                  *
                                  * For the full copyright and license information, please view the LICENSE
                                  * file that was distributed with this source code.
                                  */

import { scaleQuantize } from 'd3-scale'
import {
    // Diverging
    schemeBrBG,
    schemePRGn,
    schemePiYG,
    schemePuOr,
    schemeRdBu,
    schemeRdGy,
    schemeRdYlBu,
    schemeRdYlGn,
    schemeSpectral,

    // Sequential (Single Hue)
    schemeBlues,
    schemeGreens,
    schemeGreys,
    schemeOranges,
    schemePurples,
    schemeReds,

    // Sequential (Multi-Hue)
    schemeBuGn,
    schemeBuPu,
    schemeGnBu,
    schemeOrRd,
    schemePuBuGn,
    schemePuBu,
    schemePuRd,
    schemeRdPu,
    schemeYlGnBu,
    schemeYlGn,
    schemeYlOrBr,
    schemeYlOrRd,
} from 'd3-scale-chromatic'

export var quantizeColorScales = {
    nivo: ['#d76445', '#f47560', '#e8c1a0', '#97e3d5', '#61cdbb', '#00b0a7'],

    // Diverging
    BrBG: _last(schemeBrBG),
    PRGn: _last(schemePRGn),
    PiYG: _last(schemePiYG),
    PuOr: _last(schemePuOr),
    RdBu: _last(schemeRdBu),
    RdGy: _last(schemeRdGy),
    RdYlBu: _last(schemeRdYlBu),
    RdYlGn: _last(schemeRdYlGn),
    spectral: _last(schemeSpectral),

    // Sequential (Single Hue)
    blues: _last(schemeBlues),
    greens: _last(schemeGreens),
    greys: _last(schemeGreys),
    oranges: _last(schemeOranges),
    purples: _last(schemePurples),
    reds: _last(schemeReds),

    // Sequential (Multi-Hue)
    BuGn: _last(schemeBuGn),
    BuPu: _last(schemeBuPu),
    GnBu: _last(schemeGnBu),
    OrRd: _last(schemeOrRd),
    PuBuGn: _last(schemePuBuGn),
    PuBu: _last(schemePuBu),
    PuRd: _last(schemePuRd),
    RdPu: _last(schemeRdPu),
    YlGnBu: _last(schemeYlGnBu),
    YlGn: _last(schemeYlGn),
    YlOrBr: _last(schemeYlOrBr),
    YlOrRd: _last(schemeYlOrRd),
}

export var quantizeColorScalesKeys = Object.keys(quantizeColorScales)

export var guessQuantizeColorScale = function guessQuantizeColorScale(colors) {
    // colors is already a valid scale
    if (_isFunction(colors)) {
        if (!_isFunction(colors.domain)) {
            throw new Error(
                "Provided colors should be a valid quantize scale providing a 'domain()' function"
            )
        }

        return colors
    }

    if (quantizeColorScales[colors]) {
        // use predefined d3 quantize color scale
        return scaleQuantize().range(quantizeColorScales[colors])
    }

    // user defined colors
    if (_isArray(colors)) return scaleQuantize().range(colors)

    throw new Error(
        "Unable to guess quantize color scale from '" +
            colors +
            "',\nmust be a function or one of:\n'" +
            quantizeColorScalesKeys.join("', '") +
            "'"
    )
}
