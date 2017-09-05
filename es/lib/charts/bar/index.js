import _sumBy from 'lodash/sumBy'
import _max from 'lodash/max'
import _range from 'lodash/range'

import { scaleBand, scaleLinear } from 'd3-scale'
import { stack } from 'd3-shape'

/**
 * Generates indexed scale.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<number>} range
 * @param {number}         padding
 * @returns {Function}
 */
export var getIndexedScale = function getIndexedScale(data, getIndex, range, padding) {
    return scaleBand()
        .rangeRound(range)
        .domain(data.map(getIndex))
        .padding(padding)
}

/**
 * Generates scale for grouped bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Array.<string>} keys
 * @param {Array.<number>} range
 * @returns {Function}
 */
export var getGroupedScale = function getGroupedScale(data, keys, range) {
    var maxValue = _max(
        data.reduce(function(acc, entry) {
            return [].concat(
                acc,
                keys.map(function(k) {
                    return entry[k]
                })
            )
        }, [])
    )

    return scaleLinear()
        .rangeRound(range)
        .domain([0, maxValue])
}

/**
 * Generates scale for stacked bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Array.<string>} keys
 * @param {Array.<number>} range
 */
export var getStackedScale = function getStackedScale(data, keys, range) {
    var maxValue = _max(
        data.map(function(d) {
            return _sumBy(keys, function(key) {
                return d[key]
            })
        })
    )

    return scaleLinear()
        .rangeRound(range)
        .domain([0, maxValue])
}

/**
 * Generates x/y scales & bars for vertical grouped bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<string>} keys
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       color
 * @param {number}         xPadding
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export var generateVerticalGroupedBars = function generateVerticalGroupedBars(
    data,
    getIndex,
    keys,
    width,
    height,
    color
) {
    var _ref = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
        _ref$xPadding = _ref.xPadding,
        xPadding = _ref$xPadding === undefined ? 0 : _ref$xPadding

    var xScale = getIndexedScale(data, getIndex, [0, width], xPadding)
    var yScale = getGroupedScale(data, keys, [height, 0])

    var barWidth = xScale.bandwidth() / keys.length

    var bars = []
    if (barWidth > 0) {
        keys.forEach(function(key, i) {
            _range(xScale.domain().length).forEach(function(index) {
                var x = xScale(getIndex(data[index])) + barWidth * i
                var y = yScale(data[index][key])
                var barHeight = height - y

                if (barWidth > 0 && barHeight > 0) {
                    var barData = {
                        id: key,
                        value: data[index][key],
                        index: index,
                        indexValue: getIndex(data[index]),
                        data: data[index],
                    }

                    bars.push({
                        key: key + '.' + barData.indexValue,
                        data: barData,
                        x: x,
                        y: y,
                        width: barWidth,
                        height: barHeight,
                        color: color(barData),
                    })
                }
            })
        })
    }

    return { xScale: xScale, yScale: yScale, bars: bars }
}

/**
 * Generates x/y scales & bars for horizontal grouped bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<string>} keys
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       color
 * @param {number}         xPadding
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export var generateHorizontalGroupedBars = function generateHorizontalGroupedBars(
    data,
    getIndex,
    keys,
    width,
    height,
    color
) {
    var _ref2 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
        _ref2$xPadding = _ref2.xPadding,
        xPadding = _ref2$xPadding === undefined ? 0 : _ref2$xPadding

    var xScale = getGroupedScale(data, keys, [0, width])
    var yScale = getIndexedScale(data, getIndex, [height, 0], xPadding)

    var barHeight = yScale.bandwidth() / keys.length

    var bars = []
    if (barHeight > 0) {
        keys.forEach(function(key, i) {
            _range(yScale.domain().length).forEach(function(index) {
                var x = 0
                var y = yScale(getIndex(data[index])) + barHeight * i
                var barWidth = xScale(data[index][key])

                if (barWidth > 0) {
                    var barData = {
                        id: key,
                        value: data[index][key],
                        index: index,
                        indexValue: getIndex(data[index]),
                        data: data[index],
                    }

                    bars.push({
                        key: key + '.' + barData.indexValue,
                        data: barData,
                        x: x,
                        y: y,
                        width: barWidth,
                        height: barHeight,
                        color: color(barData),
                    })
                }
            })
        })
    }

    return { xScale: xScale, yScale: yScale, bars: bars }
}

/**
 * Generates x/y scales & bars for grouped bar chart.
 *
 * @param {string} layout
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export var generateGroupedBars = function generateGroupedBars(layout) {
    for (
        var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1;
        _key < _len;
        _key++
    ) {
        args[_key - 1] = arguments[_key]
    }

    return layout === 'vertical'
        ? generateVerticalGroupedBars.apply(undefined, args)
        : generateHorizontalGroupedBars.apply(undefined, args)
}

/**
 * Generates x/y scales & bars for vertical stacked bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<string>} keys
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       getColor
 * @param {number}         xPadding
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export var generateVerticalStackedBars = function generateVerticalStackedBars(
    data,
    getIndex,
    keys,
    width,
    height,
    getColor
) {
    var _ref3 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
        _ref3$xPadding = _ref3.xPadding,
        xPadding = _ref3$xPadding === undefined ? 0 : _ref3$xPadding

    var xScale = getIndexedScale(data, getIndex, [0, width], xPadding)
    var yScale = getStackedScale(data, keys, [height, 0])

    var stackedData = stack().keys(keys)(data)

    var bars = []
    var barWidth = xScale.bandwidth()

    if (barWidth > 0) {
        stackedData.forEach(function(stackedDataItem) {
            xScale.domain().forEach(function(index, i) {
                var d = stackedDataItem[i]
                var x = xScale(getIndex(d.data))

                var y = yScale(d[1])
                var barHeight = yScale(d[0]) - y

                if (barHeight > 0) {
                    var barData = {
                        id: stackedDataItem.key,
                        value: d.data[stackedDataItem.key],
                        index: i,
                        indexValue: index,
                        data: d.data,
                    }

                    bars.push({
                        key: stackedDataItem.key + '.' + index,
                        data: barData,
                        x: x,
                        y: y,
                        width: barWidth,
                        height: barHeight,
                        color: getColor(barData),
                    })
                }
            })
        })
    }

    return { xScale: xScale, yScale: yScale, bars: bars }
}

/**
 * Generates x/y scales & bars for horizontal stacked bar chart.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<string>} keys
 * @param {number}         width
 * @param {number}         height
 * @param {Function}       getColor
 * @param {number}         xPadding
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export var generateHorizontalStackedBars = function generateHorizontalStackedBars(
    data,
    getIndex,
    keys,
    width,
    height,
    getColor
) {
    var _ref4 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {},
        _ref4$xPadding = _ref4.xPadding,
        xPadding = _ref4$xPadding === undefined ? 0 : _ref4$xPadding

    var xScale = getStackedScale(data, keys, [0, width])
    var yScale = getIndexedScale(data, getIndex, [height, 0], xPadding)

    var stackedData = stack().keys(keys)(data)

    var bars = []
    var barHeight = yScale.bandwidth()

    if (barHeight > 0) {
        stackedData.forEach(function(stackedDataItem) {
            yScale.domain().forEach(function(index, i) {
                var d = stackedDataItem[i]
                var y = yScale(getIndex(d.data))

                var barData = {
                    id: stackedDataItem.key,
                    value: d.data[stackedDataItem.key],
                    index: i,
                    indexValue: index,
                    data: d.data,
                }

                var x = xScale(d[0])
                var barWidth = xScale(d[1]) - x

                if (barWidth > 0) {
                    bars.push({
                        key: stackedDataItem.key + '.' + index,
                        data: barData,
                        x: x,
                        y: y,
                        width: barWidth,
                        height: barHeight,
                        color: getColor(barData),
                    })
                }
            })
        })
    }

    return { xScale: xScale, yScale: yScale, bars: bars }
}

/**
 * Generates x/y scales & bars for stacked bar chart.
 *
 * @param {string} layout
 * @return {{ xScale: Function, yScale: Function, bars: Array.<Object> }}
 */
export var generateStackedBars = function generateStackedBars(layout) {
    for (
        var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;
        _key2 < _len2;
        _key2++
    ) {
        args[_key2 - 1] = arguments[_key2]
    }

    return layout === 'vertical'
        ? generateVerticalStackedBars.apply(undefined, args)
        : generateHorizontalStackedBars.apply(undefined, args)
}
