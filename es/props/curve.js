/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import without from 'lodash/without'
import {
    curveBasis,
    curveBasisClosed,
    curveBasisOpen,
    curveBundle,
    curveCardinal,
    curveCardinalClosed,
    curveCardinalOpen,
    curveCatmullRom,
    curveCatmullRomClosed,
    curveCatmullRomOpen,
    curveLinear,
    curveLinearClosed,
    curveMonotoneX,
    curveMonotoneY,
    curveNatural,
    curveStep,
    curveStepAfter,
    curveStepBefore,
} from 'd3-shape'

export var curvePropMapping = {
    basis: curveBasis,
    basisClosed: curveBasisClosed,
    basisOpen: curveBasisOpen,
    bundle: curveBundle,
    cardinal: curveCardinal,
    cardinalClosed: curveCardinalClosed,
    cardinalOpen: curveCardinalOpen,
    catmullRom: curveCatmullRom,
    catmullRomClosed: curveCatmullRomClosed,
    catmullRomOpen: curveCatmullRomOpen,
    linear: curveLinear,
    linearClosed: curveLinearClosed,
    monotoneX: curveMonotoneX,
    monotoneY: curveMonotoneY,
    natural: curveNatural,
    step: curveStep,
    stepAfter: curveStepAfter,
    stepBefore: curveStepBefore,
}

export var curvePropKeys = Object.keys(curvePropMapping)

export var curvePropType = PropTypes.oneOf(curvePropKeys)

export var closedCurvePropKeys = curvePropKeys.filter(function(c) {
    return c.endsWith('Closed')
})

export var closedCurvePropType = PropTypes.oneOf(closedCurvePropKeys)

// Safe curves to be used with d3 area shape generator
export var areaCurvePropKeys = without(
    curvePropKeys,
    'bundle',
    'basisClosed',
    'basisOpen',
    'cardinalClosed',
    'cardinalOpen',
    'catmullRomClosed',
    'catmullRomOpen',
    'linearClosed'
)

export var areaCurvePropType = PropTypes.oneOf(areaCurvePropKeys)

// Safe curves to be used with d3 line shape generator
export var lineCurvePropKeys = without(
    curvePropKeys,
    'bundle',
    'basisClosed',
    'basisOpen',
    'cardinalClosed',
    'cardinalOpen',
    'catmullRomClosed',
    'catmullRomOpen',
    'linearClosed'
)

export var lineCurvePropType = PropTypes.oneOf(lineCurvePropKeys)

/**
 * Returns curve interpolator from given identifier.
 *
 * @param {string} id - Curve interpolator identifier
 * @return {Function}
 */
export var curveFromProp = function curveFromProp(id) {
    var curveInterpolator = curvePropMapping[id]
    if (!curveInterpolator) {
        throw new TypeError("'" + id + "', is not a valid curve interpolator identifier.")
    }

    return curvePropMapping[id]
}
