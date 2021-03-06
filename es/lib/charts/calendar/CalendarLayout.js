import _assign from 'lodash/assign'
import _max from 'lodash/max'
import _range from 'lodash/range'
import _isDate from 'lodash/isDate'
import _memoize from 'lodash/memoize' /*
                                        * This file is part of the nivo project.
                                        *
                                        * Copyright 2016-present, Raphaël Benitte.
                                        *
                                        * For the full copyright and license information, please view the LICENSE
                                        * file that was distributed with this source code.
                                        */

import { DIRECTION_HORIZONTAL } from '../../../constants/directions'
import { timeFormat } from 'd3-time-format'
import { timeDays, timeWeek, timeWeeks, timeMonths, timeYear } from 'd3-time'

/**
 * Compute day cell size according to current context.
 *
 * @param {number} width
 * @param {number} height
 * @param {number} direction
 * @param {array}  yearRange
 * @param {number} yearSpacing
 * @param {number} daySpacing
 * @param {number} maxWeeks
 * @returns {number}
 */
var computeCellSize = function computeCellSize(_ref) {
    var width = _ref.width,
        height = _ref.height,
        direction = _ref.direction,
        yearRange = _ref.yearRange,
        yearSpacing = _ref.yearSpacing,
        daySpacing = _ref.daySpacing,
        maxWeeks = _ref.maxWeeks

    var hCellSize = void 0
    var vCellSize = void 0

    if (direction === DIRECTION_HORIZONTAL) {
        hCellSize = (width - daySpacing * maxWeeks) / maxWeeks
        vCellSize =
            (height - (yearRange.length - 1) * yearSpacing - yearRange.length * (8 * daySpacing)) /
            (yearRange.length * 7)
    } else {
        hCellSize =
            (width - (yearRange.length - 1) * yearSpacing - yearRange.length * (8 * daySpacing)) /
            (yearRange.length * 7)
        vCellSize = (height - daySpacing * maxWeeks) / maxWeeks
    }

    return Math.min(hCellSize, vCellSize)
}

/**
 * Computes month path and bounding box.
 *
 * @param {Date}   date
 * @param {number} cellSize
 * @param {number} yearIndex
 * @param {number} yearSpacing
 * @param {number} daySpacing
 * @param {string} direction
 * @returns { { path: string, bbox: { x: number, y: number, width: number, height: number } } }
 */
var monthPathAndBBox = function monthPathAndBBox(_ref2) {
    var date = _ref2.date,
        cellSize = _ref2.cellSize,
        yearIndex = _ref2.yearIndex,
        yearSpacing = _ref2.yearSpacing,
        daySpacing = _ref2.daySpacing,
        direction = _ref2.direction

    var t1 = new Date(date.getFullYear(), date.getMonth() + 1, 0) // first day of next month
    var d0 = date.getDay() // first day of month
    var w0 = timeWeek.count(timeYear(date), date) // first week of month
    var d1 = t1.getDay() // last day of month
    var w1 = timeWeek.count(timeYear(t1), t1) // last week of month

    // offset according to year index
    var xO = 0
    var yO = 0
    var yearOffset = yearIndex * (7 * (cellSize + daySpacing) + yearSpacing)
    if (direction === DIRECTION_HORIZONTAL) {
        yO = yearOffset
    } else {
        xO = yearOffset
    }

    var path = void 0
    var bbox = { x: xO, y: yO, width: 0, height: 0 }
    if (direction === DIRECTION_HORIZONTAL) {
        path = [
            'M' +
                (xO + (w0 + 1) * (cellSize + daySpacing)) +
                ',' +
                (yO + d0 * (cellSize + daySpacing)),
            'H' + (xO + w0 * (cellSize + daySpacing)) + 'V' + (yO + 7 * (cellSize + daySpacing)),
            'H' +
                (xO + w1 * (cellSize + daySpacing)) +
                'V' +
                (yO + (d1 + 1) * (cellSize + daySpacing)),
            'H' + (xO + (w1 + 1) * (cellSize + daySpacing)) + 'V' + yO,
            'H' + (xO + (w0 + 1) * (cellSize + daySpacing)) + 'Z',
        ].join('')

        bbox.x = xO + w0 * (cellSize + daySpacing)
        bbox.width = (w1 + 1) * (cellSize + daySpacing) - bbox.x
        bbox.height = 7 * (cellSize + daySpacing)
    } else {
        path = [
            'M' +
                (xO + d0 * (cellSize + daySpacing)) +
                ',' +
                (yO + (w0 + 1) * (cellSize + daySpacing)),
            'H' + xO + 'V' + (yO + (w1 + 1) * (cellSize + daySpacing)),
            'H' +
                (xO + (d1 + 1) * (cellSize + daySpacing)) +
                'V' +
                (yO + w1 * (cellSize + daySpacing)),
            'H' + (xO + 7 * (cellSize + daySpacing)) + 'V' + (yO + w0 * (cellSize + daySpacing)),
            'H' + (xO + d0 * (cellSize + daySpacing)) + 'Z',
        ].join('')

        bbox.y = yO + w0 * (cellSize + daySpacing)
        bbox.width = 7 * (cellSize + daySpacing)
        bbox.height = (w1 + 1) * (cellSize + daySpacing) - bbox.y
    }

    return { path: path, bbox: bbox }
}

/**
 * Creates a memoized version of monthPathAndBBox function.
 */
var memoMonthPathAndBBox = _memoize(monthPathAndBBox, function(_ref3) {
    var date = _ref3.date,
        cellSize = _ref3.cellSize,
        yearIndex = _ref3.yearIndex,
        yearSpacing = _ref3.yearSpacing,
        daySpacing = _ref3.daySpacing,
        direction = _ref3.direction

    return (
        date.toString() +
        '.' +
        cellSize +
        '.' +
        yearIndex +
        '.' +
        yearSpacing +
        '.' +
        daySpacing +
        '.' +
        direction
    )
})

/**
 * Returns a function to Compute day cell position for horizontal layout.
 *
 * @param {number} cellSize
 * @param {number} yearSpacing
 * @param {number} daySpacing
 * @returns { function(): { x: number, y: number } }
 */
var cellPositionHorizontal = function cellPositionHorizontal(cellSize, yearSpacing, daySpacing) {
    return function(d, yearIndex) {
        var weekOfYear = timeWeek.count(timeYear(d), d)

        return {
            x: weekOfYear * (cellSize + daySpacing) + daySpacing / 2,
            y:
                d.getDay() * (cellSize + daySpacing) +
                daySpacing / 2 +
                yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
        }
    }
}

/**
 * Returns a function to Compute day cell position for vertical layout.
 *
 * @param {number} cellSize
 * @param {number} yearSpacing
 * @param {number} daySpacing
 * @returns { function(): { x: number, y: number } }
 */
var cellPositionVertical = function cellPositionVertical(cellSize, yearSpacing, daySpacing) {
    return function(d, yearIndex) {
        var weekOfYear = timeWeek.count(timeYear(d), d)

        return {
            x:
                d.getDay() * (cellSize + daySpacing) +
                daySpacing / 2 +
                yearIndex * (yearSpacing + 7 * (cellSize + daySpacing)),
            y: weekOfYear * (cellSize + daySpacing) + daySpacing / 2,
        }
    }
}

// used for days range and data matching
var dayFormat = timeFormat('%Y-%m-%d')

/**
 * This layout is responsible for computing Calendar chart data/positions….
 * It's used for all Calendar related chart components.
 *
 * @returns {{ compute: (function) }}
 * @constructor
 */
var CalendarLayout = function CalendarLayout() {
    return {
        /**
         * @param {number}      width
         * @param {number}      height
         * @param {string|Date} from
         * @param {string|Date} to
         * @param {array}       data
         * @param {string}      direction
         * @param {object}      colorScale
         * @param {string}      emptyColor
         * @param {number}      yearSpacing
         * @param {number}      daySpacing
         * @returns {object}
         */
        compute: function compute(_ref4) {
            var width = _ref4.width,
                height = _ref4.height,
                from = _ref4.from,
                to = _ref4.to,
                data = _ref4.data,
                direction = _ref4.direction,
                colorScale = _ref4.colorScale,
                emptyColor = _ref4.emptyColor,
                yearSpacing = _ref4.yearSpacing,
                daySpacing = _ref4.daySpacing

            // time related data
            var fromDate = _isDate(from) ? from : new Date(from)
            var toDate = _isDate(to) ? to : new Date(to)

            var yearRange = _range(fromDate.getFullYear(), toDate.getFullYear() + 1)
            var maxWeeks =
                _max(
                    yearRange.map(function(year) {
                        return timeWeeks(new Date(year, 0, 1), new Date(year + 1, 0, 1)).length
                    })
                ) + 1

            // ——————————————————————————————————————————————————————————————————————————————————————————————————————
            // Computes years/months/days
            // ——————————————————————————————————————————————————————————————————————————————————————————————————————
            // compute cellSize
            var cellSize = computeCellSize({
                width: width,
                height: height,
                direction: direction,
                yearRange: yearRange,
                yearSpacing: yearSpacing,
                daySpacing: daySpacing,
                maxWeeks: maxWeeks,
            })

            // determine day cells positioning function according to layout direction
            var cellPosition = void 0
            if (direction === DIRECTION_HORIZONTAL) {
                cellPosition = cellPositionHorizontal(cellSize, yearSpacing, daySpacing)
            } else {
                cellPosition = cellPositionVertical(cellSize, yearSpacing, daySpacing)
            }

            var years = []
            var months = []
            var days = []

            yearRange.forEach(function(year, i) {
                var yearStart = new Date(year, 0, 1)
                var yearEnd = new Date(year + 1, 0, 1)

                days = days.concat(
                    timeDays(yearStart, yearEnd).map(function(dayDate) {
                        return _assign(
                            {
                                date: dayDate,
                                day: dayFormat(dayDate),
                                size: cellSize,
                            },
                            cellPosition(dayDate, i)
                        )
                    })
                )

                var yearMonths = timeMonths(yearStart, yearEnd).map(function(monthDate) {
                    return _assign(
                        { date: monthDate },
                        memoMonthPathAndBBox({
                            date: monthDate,
                            direction: direction,
                            yearIndex: i,
                            yearSpacing: yearSpacing,
                            daySpacing: daySpacing,
                            cellSize: cellSize,
                        })
                    )
                })

                months = months.concat(yearMonths)

                years.push({
                    year: year,
                    bbox: {
                        x: yearMonths[0].bbox.x,
                        y: yearMonths[0].bbox.y,
                        width:
                            yearMonths[11].bbox.x -
                            yearMonths[0].bbox.x +
                            yearMonths[11].bbox.width,
                        height:
                            yearMonths[11].bbox.y -
                            yearMonths[0].bbox.y +
                            yearMonths[11].bbox.height,
                    },
                })
            })

            // ——————————————————————————————————————————————————————————————————————————————————————————————————————
            // Computes days/data intersection
            // ——————————————————————————————————————————————————————————————————————————————————————————————————————
            //const color = scalePropToD3Scale(colorScale)

            days.forEach(function(day) {
                day.color = emptyColor
                data.forEach(function(dataDay) {
                    if (dataDay.day === day.day) {
                        //day.color = color(dataDay.value)
                    }
                })
            })

            return { years: years, months: months, days: days, cellSize: cellSize }
        },
    }
}

export default CalendarLayout
