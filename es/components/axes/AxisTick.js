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

var AxisTick = (function(_Component) {
    _inherits(AxisTick, _Component)

    function AxisTick() {
        _classCallCheck(this, AxisTick)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    AxisTick.prototype.render = function render() {
        var _props = this.props,
            _value = _props.value,
            x = _props.x,
            y = _props.y,
            opacity = _props.opacity,
            rotate = _props.rotate,
            format = _props.format,
            lineX = _props.lineX,
            lineY = _props.lineY,
            textX = _props.textX,
            textY = _props.textY,
            textBaseline = _props.textBaseline,
            textAnchor = _props.textAnchor,
            theme = _props.theme

        var value = _value
        if (format !== undefined) {
            value = format(value)
        }

        return React.createElement(
            'g',
            { transform: 'translate(' + x + ',' + y + ')', style: { opacity: opacity } },
            React.createElement('line', {
                x1: 0,
                x2: lineX,
                y1: 0,
                y2: lineY,
                stroke: theme.axis.tickColor,
            }),
            React.createElement(
                'text',
                {
                    alignmentBaseline: textBaseline,
                    textAnchor: textAnchor,
                    transform: 'translate(' + textX + ',' + textY + ') rotate(' + rotate + ')',
                    style: {
                        fill: theme.axis.textColor,
                        fontSize: theme.axis.fontSize,
                    },
                },
                value
            )
        )
    }

    return AxisTick
})(Component)

AxisTick.propTypes = {
    format: PropTypes.func,
    theme: PropTypes.object.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
    rotate: PropTypes.number.isRequired,
}
AxisTick.defaultProps = {
    opacity: 1,
    rotate: 0,
}
export default AxisTick
