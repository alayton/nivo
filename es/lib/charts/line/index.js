import _uniq from 'lodash/uniq'
import _sumBy from 'lodash/sumBy'
import _max from 'lodash/max'
import _min from 'lodash/min'
import _range from 'lodash/range' /*
                                    * This file is part of the nivo project.
                                    *
                                    * Copyright 2016-present, Raphaël Benitte.
                                    *
                                    * For the full copyright and license information, please view the LICENSE
                                    * file that was distributed with this source code.
                                    */

import { scalePoint, scaleLinear } from 'd3-scale'

/**
 * Generates X scale.
 *
 * @param {Array.<Object>} data
 * @param {number}         width
 * @returns {Function}
 */
export var getXScale = function getXScale(data, width) {
    var xLengths = _uniq(
        data.map(function(_ref) {
            var data = _ref.data
            return data.length
        })
    )
    if (xLengths.length > 1) {
        throw new Error(
            [
                'Found inconsitent data for x,',
                'expecting all series to have same length',
                'but found: ' + xLengths.join(', '),
            ].join(' ')
        )
    }

    return scalePoint()
        .range([0, width])
        .domain(
            data[0].data.map(function(_ref2) {
                var x = _ref2.x
                return x
            })
        )
}

/**
 * Generates Y scale for line chart.
 *
 * @param {Array.<Object>} data
 * @param {number}         height
 * @param {number|string}  minValue
 * @param {number|string}  maxValue
 * @returns {Function}
 */
export var getYScale = function getYScale(data, height, minValue, maxValue) {
    var minY = minValue
    if (minValue === 'auto') {
        minY = _min(
            data.map(function(serie) {
                return _min(
                    serie.data.map(function(d) {
                        return d.y
                    })
                )
            })
        )
    }

    var maxY = maxValue
    if (maxValue === 'auto') {
        maxY = _max(
            data.map(function(serie) {
                return _max(
                    serie.data.map(function(d) {
                        return d.y
                    })
                )
            })
        )
    }

    return scaleLinear()
        .rangeRound([height, 0])
        .domain([minY, maxY])
}

/**
 * Generates Y scale for stacked line chart.
 *
 * @param {Array.<Object>} data
 * @param {Object}         xScale
 * @param {number}         height
 * @param {number|string}  minValue
 * @param {number|string}  maxValue
 * @returns {Function}
 */
export var getStackedYScale = function getStackedYScale(data, xScale, height, minValue, maxValue) {
    var minY = minValue
    if (minValue === 'auto') {
        minY = _min(
            data.map(function(serie) {
                return _min(
                    serie.data.map(function(d) {
                        return d.y
                    })
                )
            })
        )
    }

    var maxY = maxValue
    if (maxValue === 'auto') {
        maxY = _max(
            _range(xScale.domain().length).map(function(i) {
                return _sumBy(data, function(serie) {
                    return serie.data[i].y
                })
            })
        )
    }

    return scaleLinear()
        .rangeRound([height, 0])
        .domain([minY, maxY])
}

/**
 * Generates stacked x/y scales.
 *
 * @param {Array}         data
 * @param {number}        width
 * @param {number}        height
 * @param {number|string} minY
 * @param {number|string} maxY
 * @return {{ xScale: Function, yScale: Function }}
 */
export var getStackedScales = function getStackedScales(_ref3) {
    var data = _ref3.data,
        width = _ref3.width,
        height = _ref3.height,
        minY = _ref3.minY,
        maxY = _ref3.maxY

    var xScale = getXScale(data, width)
    var yScale = getStackedYScale(data, xScale, height, minY, maxY)

    return { xScale: xScale, yScale: yScale }
}

/**
 * Generates non stacked x/ scales
 *
 * @param {Array}         data
 * @param {number}        width
 * @param {number}        height
 * @param {number|string} minY
 * @param {number|string} maxY
 * @return {{ xScale: Function, yScale: Function }}
 */
export var getScales = function getScales(_ref4) {
    var data = _ref4.data,
        width = _ref4.width,
        height = _ref4.height,
        minY = _ref4.minY,
        maxY = _ref4.maxY

    var xScale = getXScale(data, width)
    var yScale = getYScale(data, height, minY, maxY)

    return { xScale: xScale, yScale: yScale }
}

/**
 * Generates x/y scales & lines for line chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       xScale
 * @param {Function}       yScale
 * @param {Function}       color
 * @return {{ xScale: Function, yScale: Function, lines: Array.<Object> }}
 */
export var generateLines = function generateLines(data, xScale, yScale, color) {
    return data.map(function(serie) {
        var id = serie.id,
            serieData = serie.data

        return {
            id: id,
            color: color(serie),
            data: serie,
            points: serieData.map(function(d) {
                return Object.assign({}, d, {
                    value: d.y,
                    x: xScale(d.x),
                    y: yScale(d.y),
                })
            }),
        }
    })
}

/**
 * Generates x/y scales & lines for stacked line chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       xScale
 * @param {Function}       yScale
 * @param {Function}       color
 * @return {{ xScale: Function, yScale: Function, lines: Array.<Object> }}
 */
export var generateStackedLines = function generateStackedLines(data, xScale, yScale, color) {
    return data.reduce(function(acc, serie, serieIndex) {
        var previousPoints = serieIndex === 0 ? null : acc[serieIndex - 1].points

        var id = serie.id,
            serieData = serie.data

        return [].concat(acc, [
            {
                id: id,
                color: color(serie),
                data: serie,
                points: serieData
                    .map(function(d, i) {
                        if (!previousPoints) {
                            return Object.assign({}, d, {
                                value: d.y,
                                x: d.x,
                                y: d.y,
                            })
                        }

                        return Object.assign({}, d, {
                            value: d.y,
                            x: d.x,
                            y: d.y + previousPoints[i].accY,
                        })
                    })
                    .map(function(d) {
                        return {
                            key: d.x,
                            value: d.value,
                            accY: d.y,
                            x: xScale(d.x),
                            y: yScale(d.y),
                        }
                    }),
            },
        ])
    }, [])
}
