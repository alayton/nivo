'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _d3TimeFormat = require('d3-time-format')

var _reactMotion = require('react-motion')

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

var yearLegendStyles = function yearLegendStyles(_ref) {
    var years = _ref.years,
        direction = _ref.direction,
        yearLegendOffset = _ref.yearLegendOffset,
        stiffness = _ref.stiffness,
        damping = _ref.damping

    return years.map(function(year) {
        var rotation = void 0
        var x = void 0,
            y = void 0
        if (direction === _directions.DIRECTION_HORIZONTAL) {
            rotation = -90
            x = year.bbox.x - yearLegendOffset
            y = year.bbox.y + year.bbox.height / 2
        } else {
            rotation = 0
            x = year.bbox.x + year.bbox.width / 2
            y = year.bbox.y - yearLegendOffset
        }

        return {
            key: '' + year.year,
            data: year,
            style: {
                rotation: (0, _reactMotion.spring)(rotation, {
                    stiffness: stiffness,
                    damping: damping,
                }),
                x: (0, _reactMotion.spring)(x, { stiffness: stiffness, damping: damping }),
                y: (0, _reactMotion.spring)(y, { stiffness: stiffness, damping: damping }),
            },
        }
    })
}

var monthLegendStyles = function monthLegendStyles(_ref2) {
    var months = _ref2.months,
        direction = _ref2.direction,
        monthLegendOffset = _ref2.monthLegendOffset,
        stiffness = _ref2.stiffness,
        damping = _ref2.damping

    return months.map(function(month) {
        var rotation = void 0
        var x = void 0,
            y = void 0
        if (direction === _directions.DIRECTION_HORIZONTAL) {
            rotation = 0
            x = month.bbox.x + month.bbox.width / 2
            y = month.bbox.y - monthLegendOffset
        } else {
            rotation = -90
            x = month.bbox.x - monthLegendOffset
            y = month.bbox.y + month.bbox.height / 2
        }

        return {
            key: month.date.toString(),
            data: month,
            style: {
                rotation: (0, _reactMotion.spring)(rotation, {
                    stiffness: stiffness,
                    damping: damping,
                }),
                x: (0, _reactMotion.spring)(x, { stiffness: stiffness, damping: damping }),
                y: (0, _reactMotion.spring)(y, { stiffness: stiffness, damping: damping }),
            },
        }
    })
}

var dayStyles = function dayStyles(_ref3) {
    var days = _ref3.days,
        stiffness = _ref3.stiffness,
        damping = _ref3.damping

    return days.map(function(day) {
        return {
            key: day.date.toString(),
            data: day,
            style: {
                x: (0, _reactMotion.spring)(day.x, { stiffness: stiffness, damping: damping }),
                y: (0, _reactMotion.spring)(day.y, { stiffness: stiffness, damping: damping }),
                size: (0, _reactMotion.spring)(day.size, {
                    stiffness: stiffness,
                    damping: damping,
                }),
            },
        }
    })
}

var MotionCalendar = (function(_Component) {
    _inherits(MotionCalendar, _Component)

    function MotionCalendar() {
        _classCallCheck(this, MotionCalendar)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    MotionCalendar.prototype.render = function render() {
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
            monthLegendOffset = _props.monthLegendOffset,
            motionStiffness = _props.motionStiffness,
            motionDamping = _props.motionDamping

        var monthLegendFormat = (0, _d3TimeFormat.timeFormat)('%b')

        var stiffness = motionStiffness
        var damping = motionDamping

        return _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement(
                _reactMotion.TransitionMotion,
                { styles: dayStyles({ days: days, stiffness: stiffness, damping: damping }) },
                function(interpolatedStyles) {
                    return _react2.default.createElement(
                        'g',
                        null,
                        interpolatedStyles.map(function(d) {
                            return _react2.default.createElement(_CalendarDay2.default, {
                                key: d.key,
                                onClick: onDayClick,
                                data: d.data,
                                x: d.style.x,
                                y: d.style.y,
                                size: d.style.size,
                                color: d.data.color,
                                borderWidth: dayBorderWidth,
                                borderColor: dayBorderColor,
                            })
                        })
                    )
                }
            ),
            _react2.default.createElement(
                _reactMotion.TransitionMotion,
                {
                    styles: monthLegendStyles({
                        months: months,
                        direction: direction,
                        monthLegendOffset: monthLegendOffset,
                        stiffness: stiffness,
                        damping: damping,
                    }),
                },
                function(interpolatedStyles) {
                    return _react2.default.createElement(
                        'g',
                        null,
                        interpolatedStyles.map(function(d) {
                            return _react2.default.createElement(
                                'text',
                                {
                                    key: d.key,
                                    className: 'nivo_calendar_month_legend',
                                    transform:
                                        'translate(' +
                                        d.style.x +
                                        ',' +
                                        d.style.y +
                                        ') rotate(' +
                                        d.style.rotation +
                                        ')',
                                    textAnchor: 'middle',
                                },
                                monthLegendFormat(d.data.date)
                            )
                        })
                    )
                }
            ),
            _react2.default.createElement(
                _reactMotion.TransitionMotion,
                {
                    styles: yearLegendStyles({
                        years: years,
                        direction: direction,
                        yearLegendOffset: yearLegendOffset,
                        stiffness: stiffness,
                        damping: damping,
                    }),
                },
                function(interpolatedStyles) {
                    return _react2.default.createElement(
                        'g',
                        null,
                        interpolatedStyles.map(function(d) {
                            return _react2.default.createElement(
                                'text',
                                {
                                    key: d.key,
                                    className: 'nivo_calendar_year_legend',
                                    transform:
                                        'translate(' +
                                        d.style.x +
                                        ',' +
                                        d.style.y +
                                        ') rotate(' +
                                        d.style.rotation +
                                        ')',
                                    textAnchor: 'middle',
                                },
                                d.data.year
                            )
                        })
                    )
                }
            )
        )
    }

    return MotionCalendar
})(_react.Component)

MotionCalendar.propTypes = {}

exports.default = MotionCalendar
