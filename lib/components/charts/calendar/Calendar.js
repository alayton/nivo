'use strict'

exports.__esModule = true

var _omit2 = require('lodash/omit')

var _omit3 = _interopRequireDefault(_omit2)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _defaults = require('../../../defaults')

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _CalendarLayout = require('../../../lib/charts/calendar/CalendarLayout')

var _CalendarLayout2 = _interopRequireDefault(_CalendarLayout)

var _CalendarProps = require('./CalendarProps')

var _StaticCalendar = require('./StaticCalendar')

var _StaticCalendar2 = _interopRequireDefault(_StaticCalendar)

var _MotionCalendar = require('./MotionCalendar')

var _MotionCalendar2 = _interopRequireDefault(_MotionCalendar)

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

var Calendar = (function(_Component) {
    _inherits(Calendar, _Component)

    function Calendar() {
        _classCallCheck(this, Calendar)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    Calendar.prototype.componentWillMount = function componentWillMount() {
        this.calendarLayout = (0, _CalendarLayout2.default)()
    }

    Calendar.prototype.render = function render() {
        var _props = this.props,
            from = _props.from,
            to = _props.to,
            data = _props.data,
            onDayClick = _props.onDayClick,
            direction = _props.direction,
            colorScale = _props.colorScale,
            emptyColor = _props.emptyColor,
            yearSpacing = _props.yearSpacing,
            yearLegendOffset = _props.yearLegendOffset,
            daySpacing = _props.daySpacing,
            dayBorderWidth = _props.dayBorderWidth,
            dayBorderColor = _props.dayBorderColor,
            monthBorderWidth = _props.monthBorderWidth,
            monthBorderColor = _props.monthBorderColor,
            monthLegendOffset = _props.monthLegendOffset,
            animate = _props.animate,
            motionStiffness = _props.motionStiffness,
            motionDamping = _props.motionDamping

        var margin = Object.assign({}, _defaults.defaultMargin, this.props.margin)
        var width = this.props.width - margin.left - margin.right
        var height = this.props.height - margin.top - margin.bottom

        var _calendarLayout$compu = this.calendarLayout.compute({
                width: width,
                height: height,
                from: from,
                to: to,
                data: data,
                direction: direction,
                colorScale: colorScale,
                emptyColor: emptyColor,
                yearSpacing: yearSpacing,
                daySpacing: daySpacing,
            }),
            years = _calendarLayout$compu.years,
            months = _calendarLayout$compu.months,
            days = _calendarLayout$compu.days

        var calendar = void 0
        if (animate === true) {
            calendar = _react2.default.createElement(_MotionCalendar2.default, {
                onDayClick: onDayClick,
                direction: direction,
                years: years,
                months: months,
                days: days,
                yearLegendOffset: yearLegendOffset,
                dayBorderWidth: dayBorderWidth,
                dayBorderColor: dayBorderColor,
                monthBorderWidth: monthBorderWidth,
                monthBorderColor: monthBorderColor,
                monthLegendOffset: monthLegendOffset,
                motionStiffness: motionStiffness,
                motionDamping: motionDamping,
            })
        } else {
            calendar = _react2.default.createElement(_StaticCalendar2.default, {
                onDayClick: onDayClick,
                direction: direction,
                years: years,
                months: months,
                days: days,
                yearLegendOffset: yearLegendOffset,
                dayBorderWidth: dayBorderWidth,
                dayBorderColor: dayBorderColor,
                monthBorderWidth: monthBorderWidth,
                monthBorderColor: monthBorderColor,
                monthLegendOffset: monthLegendOffset,
            })
        }

        return _react2.default.createElement(
            _SvgWrapper2.default,
            { width: this.props.width, height: this.props.height, margin: margin },
            calendar
        )
    }

    return Calendar
})(_react.Component)

Calendar.propTypes = (0, _omit3.default)(_CalendarProps.calendarPropTypes, [
    'transitionDuration',
    'transitionEasing',
    'transitionStaggering',
])
Calendar.defaultProps = (0, _omit3.default)(_CalendarProps.calendarDefaultProps, [
    'transitionDuration',
    'transitionEasing',
    'transitionStaggering',
])
exports.default = Calendar
