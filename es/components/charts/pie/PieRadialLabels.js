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
import { line } from 'd3-shape'

var lineGenerator = line()
    .x(function(d) {
        return d.x
    })
    .y(function(d) {
        return d.y
    })

var PieRadialLabels = (function(_Component) {
    _inherits(PieRadialLabels, _Component)

    function PieRadialLabels() {
        _classCallCheck(this, PieRadialLabels)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    PieRadialLabels.prototype.render = function render() {
        var _props = this.props,
            data = _props.data,
            label = _props.label,
            radius = _props.radius,
            skipAngle = _props.skipAngle,
            linkOffset = _props.linkOffset,
            linkDiagonalLength = _props.linkDiagonalLength,
            linkHorizontalLength = _props.linkHorizontalLength,
            linkStrokeWidth = _props.linkStrokeWidth,
            textXOffset = _props.textXOffset,
            textColor = _props.textColor,
            linkColor = _props.linkColor,
            theme = _props.theme

        return React.createElement(
            'g',
            null,
            data
                .filter(function(d) {
                    return skipAngle === 0 || d.angleDegrees > skipAngle
                })
                .map(function(d) {
                    var angle = midAngle(d) - Math.PI / 2
                    var positionA = positionFromAngle(angle, radius + linkOffset)
                    var positionB = positionFromAngle(
                        angle,
                        radius + linkOffset + linkDiagonalLength
                    )
                    var positionC = void 0
                    var labelPosition = void 0
                    var textAnchor = void 0
                    if (angle + Math.PI / 2 < Math.PI) {
                        positionC = { x: positionB.x + linkHorizontalLength, y: positionB.y }
                        labelPosition = {
                            x: positionB.x + linkHorizontalLength + textXOffset,
                            y: positionB.y,
                        }
                        textAnchor = 'start'
                    } else {
                        positionC = { x: positionB.x - linkHorizontalLength, y: positionB.y }
                        labelPosition = {
                            x: positionB.x - linkHorizontalLength - textXOffset,
                            y: positionB.y,
                        }
                        textAnchor = 'end'
                    }

                    return React.createElement(
                        'g',
                        { key: d.data.id },
                        React.createElement('path', {
                            d: lineGenerator([positionA, positionB, positionC]),
                            fill: 'none',
                            style: { fill: 'none', stroke: linkColor(d.data, theme) },
                            strokeWidth: linkStrokeWidth,
                        }),
                        React.createElement(
                            'g',
                            {
                                transform:
                                    'translate(' + labelPosition.x + ', ' + labelPosition.y + ')',
                            },
                            React.createElement(
                                'text',
                                {
                                    textAnchor: textAnchor,
                                    dy: '0.3em',
                                    style: {
                                        fill: textColor(d.data, theme),
                                        fontSize: theme.axis.fontSize,
                                    },
                                },
                                label(d.data)
                            )
                        )
                    )
                })
        )
    }

    return PieRadialLabels
})(Component)

PieRadialLabels.propTypes = {
    label: PropTypes.func.isRequired,
    skipAngle: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    linkOffset: PropTypes.number.isRequired,
    linkDiagonalLength: PropTypes.number.isRequired,
    linkHorizontalLength: PropTypes.number.isRequired,
    linkStrokeWidth: PropTypes.number.isRequired,
    textXOffset: PropTypes.number.isRequired,
    textColor: PropTypes.func.isRequired,
    linkColor: PropTypes.func.isRequired,
    theme: PropTypes.shape({
        axis: PropTypes.shape({
            tickColor: PropTypes.string.isRequired,
            fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired,
    }).isRequired,
}
PieRadialLabels.defaultProps = {
    skipAngle: 0,
    linkOffset: 0,
    linkDiagonalLength: 16,
    linkHorizontalLength: 24,
    linkStrokeWidth: 1,
    textXOffset: 6,
}
export default PieRadialLabels
