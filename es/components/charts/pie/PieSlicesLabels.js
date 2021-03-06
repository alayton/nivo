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

import { Motion, TransitionMotion, spring } from 'react-motion'
import { midAngle, positionFromAngle } from '../../../lib/polar'

var sliceStyle = {
    pointerEvents: 'none',
}

var PieSlicesLabels = (function(_Component) {
    _inherits(PieSlicesLabels, _Component)

    function PieSlicesLabels() {
        _classCallCheck(this, PieSlicesLabels)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    PieSlicesLabels.prototype.render = function render() {
        var _props = this.props,
            data = _props.data,
            label = _props.label,
            radius = _props.radius,
            skipAngle = _props.skipAngle,
            innerRadius = _props.innerRadius,
            textColor = _props.textColor,
            theme = _props.theme

        var centerRadius = innerRadius + (radius - innerRadius) / 2

        return React.createElement(
            'g',
            null,
            data
                .filter(function(d) {
                    return skipAngle === 0 || d.angleDegrees > skipAngle
                })
                .map(function(d) {
                    var angle = midAngle(d) - Math.PI / 2
                    var position = positionFromAngle(angle, centerRadius)

                    return React.createElement(
                        'g',
                        {
                            key: d.data.id,
                            transform: 'translate(' + position.x + ', ' + position.y + ')',
                            style: sliceStyle,
                        },
                        React.createElement(
                            'text',
                            {
                                textAnchor: 'middle',
                                style: {
                                    fill: textColor(d.data, theme),
                                    fontSize: theme.axis.fontSize,
                                },
                            },
                            label(d.data)
                        )
                    )
                })
        )
    }

    return PieSlicesLabels
})(Component)

PieSlicesLabels.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    skipAngle: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    textColor: PropTypes.func.isRequired,
    theme: PropTypes.shape({
        axis: PropTypes.shape({
            textColor: PropTypes.string.isRequired,
            fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired,
    }).isRequired,
}
PieSlicesLabels.defaultProps = {
    skipAngle: 0,
}
export default PieSlicesLabels
