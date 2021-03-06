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
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

var CalendarDay = (function(_Component) {
    _inherits(CalendarDay, _Component)

    function CalendarDay(props) {
        _classCallCheck(this, CalendarDay)

        var _this = _possibleConstructorReturn(this, _Component.call(this, props))

        _this.handleClick = _this.handleClick.bind(_this)
        return _this
    }

    CalendarDay.prototype.handleClick = function handleClick() {
        var _props = this.props,
            onClick = _props.onClick,
            data = _props.data

        onClick(data)
    }

    CalendarDay.prototype.render = function render() {
        var _props2 = this.props,
            x = _props2.x,
            y = _props2.y,
            size = _props2.size,
            color = _props2.color,
            borderWidth = _props2.borderWidth,
            borderColor = _props2.borderColor

        return React.createElement('rect', {
            onClick: this.handleClick,
            className: 'nivo_calendar_day',
            x: x,
            y: y,
            width: size,
            height: size,
            style: {
                fill: color,
                strokeWidth: borderWidth,
                stroke: borderColor,
            },
        })
    }

    return CalendarDay
})(Component)

var number = PropTypes.number,
    string = PropTypes.string,
    object = PropTypes.object,
    func = PropTypes.func

CalendarDay.propTypes = {
    onClick: func.isRequired,
    data: object.isRequired,
    x: number.isRequired,
    y: number.isRequired,
    size: number.isRequired,
    color: string.isRequired,
    borderWidth: number.isRequired,
    borderColor: string.isRequired,
}

export default CalendarDay
