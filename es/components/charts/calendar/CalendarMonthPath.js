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

var CalendarMonthPath = (function(_Component) {
    _inherits(CalendarMonthPath, _Component)

    function CalendarMonthPath() {
        _classCallCheck(this, CalendarMonthPath)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    CalendarMonthPath.prototype.render = function render() {
        var _props = this.props,
            path = _props.path,
            borderWidth = _props.borderWidth,
            borderColor = _props.borderColor

        return React.createElement('path', {
            className: 'nivo_calendar_month',
            d: path,
            style: {
                fill: 'none',
                strokeWidth: borderWidth,
                stroke: borderColor,
            },
        })
    }

    return CalendarMonthPath
})(Component)

var number = PropTypes.number,
    string = PropTypes.string

CalendarMonthPath.propTypes = {
    path: string.isRequired,
    borderWidth: number.isRequired,
    borderColor: string.isRequired,
}

export default CalendarMonthPath
