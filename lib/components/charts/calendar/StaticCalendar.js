'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _d3TimeFormat = require('d3-time-format')

var _directions = require('../../../constants/directions')

var _CalendarDay = require('./CalendarDay')

var _CalendarDay2 = _interopRequireDefault(_CalendarDay)

var _CalendarMonthPath = require('./CalendarMonthPath')

var _CalendarMonthPath2 = _interopRequireDefault(_CalendarMonthPath)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
            'Super expression must either be null or a function, not ' + typeof superClass
        )
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
    })
    if (superClass)
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass)
} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This file is part of the nivo project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * file that was distributed with this source code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var StaticCalendar = (function(_Component) {
    _inherits(StaticCalendar, _Component)

    function StaticCalendar() {
        _classCallCheck(this, StaticCalendar)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    StaticCalendar.prototype.render = function render() {
        var _props = this.props,
            onDayClick = _props.onDayClick,
            years = _props.years,
            months = _props.months,
            days = _props.days,
            direction = _props.direction,
            yearLegendOffset = _props.yearLegendOffset,
            dayBorderWidth = _props.dayBorderWidth,
            dayBorderColor = _props.dayBorderColor,
            monthBorderWidth = _props.monthBorderWidth,
            monthBorderColor = _props.monthBorderColor,
            monthLegendOffset = _props.monthLegendOffset

        var monthLegendFormat = (0, _d3TimeFormat.timeFormat)('%b')

        return _react2.default.createElement(
            'g',
            null,
            days.map(function(d) {
                return _react2.default.createElement(_CalendarDay2.default, {
                    key: d.date.toString(),
                    onClick: onDayClick,
                    data: d,
                    x: d.x,
                    y: d.y,
                    size: d.size,
                    color: d.color,
                    borderWidth: dayBorderWidth,
                    borderColor: dayBorderColor,
                })
            }),
            months.map(function(m) {
                return _react2.default.createElement(_CalendarMonthPath2.default, {
                    key: m.date.toString(),
                    path: m.path,
                    borderWidth: monthBorderWidth,
                    borderColor: monthBorderColor,
                })
            }),
            months.map(function(month) {
                var transform = void 0
                if (direction === _directions.DIRECTION_HORIZONTAL) {
                    transform =
                        'translate(' +
                        (month.bbox.x + month.bbox.width / 2) +
                        ',' +
                        (month.bbox.y - monthLegendOffset) +
                        ')'
                } else {
                    transform =
                        'translate(' +
                        (month.bbox.x - monthLegendOffset) +
                        ',' +
                        (month.bbox.y + month.bbox.height / 2) +
                        ') rotate(-90)'
                }

                return _react2.default.createElement(
                    'text',
                    {
                        key: month.date.toString() + '.legend',
                        className: 'nivo_calendar_month_legend',
                        transform: transform,
                        textAnchor: 'middle',
                    },
                    monthLegendFormat(month.date)
                )
            }),
            years.map(function(year) {
                var transform = void 0
                if (direction === _directions.DIRECTION_HORIZONTAL) {
                    transform =
                        'translate(' +
                        (year.bbox.x - yearLegendOffset) +
                        ',' +
                        (year.bbox.y + year.bbox.height / 2) +
                        ') rotate(-90)'
                } else {
                    transform =
                        'translate(' +
                        (year.bbox.x + year.bbox.width / 2) +
                        ',' +
                        (year.bbox.y - yearLegendOffset) +
                        ')'
                }

                return _react2.default.createElement(
                    'text',
                    {
                        key: year.year,
                        className: 'nivo_calendar_year_legend',
                        transform: transform,
                        textAnchor: 'middle',
                    },
                    year.year
                )
            })
        )
    }

    return StaticCalendar
})(_react.Component)

StaticCalendar.propTypes = {}

exports.default = StaticCalendar
