'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _reactMotion = require('react-motion')

var _polar = require('../../../lib/polar')

var _d3Shape = require('d3-shape')

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

var lineGenerator = (0, _d3Shape.line)()
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

        return _react2.default.createElement(
            'g',
            null,
            data
                .filter(function(d) {
                    return skipAngle === 0 || d.angleDegrees > skipAngle
                })
                .map(function(d) {
                    var angle = (0, _polar.midAngle)(d) - Math.PI / 2
                    var positionA = (0, _polar.positionFromAngle)(angle, radius + linkOffset)
                    var positionB = (0, _polar.positionFromAngle)(
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

                    return _react2.default.createElement(
                        'g',
                        { key: d.data.id },
                        _react2.default.createElement('path', {
                            d: lineGenerator([positionA, positionB, positionC]),
                            fill: 'none',
                            style: { fill: 'none', stroke: linkColor(d.data, theme) },
                            strokeWidth: linkStrokeWidth,
                        }),
                        _react2.default.createElement(
                            'g',
                            {
                                transform:
                                    'translate(' + labelPosition.x + ', ' + labelPosition.y + ')',
                            },
                            _react2.default.createElement(
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
})(_react.Component)

PieRadialLabels.propTypes = {
    label: _propTypes2.default.func.isRequired,
    skipAngle: _propTypes2.default.number.isRequired,
    radius: _propTypes2.default.number.isRequired,
    linkOffset: _propTypes2.default.number.isRequired,
    linkDiagonalLength: _propTypes2.default.number.isRequired,
    linkHorizontalLength: _propTypes2.default.number.isRequired,
    linkStrokeWidth: _propTypes2.default.number.isRequired,
    textXOffset: _propTypes2.default.number.isRequired,
    textColor: _propTypes2.default.func.isRequired,
    linkColor: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.shape({
        axis: _propTypes2.default.shape({
            tickColor: _propTypes2.default.string.isRequired,
            fontSize: _propTypes2.default.oneOfType([
                _propTypes2.default.string,
                _propTypes2.default.number,
            ]).isRequired,
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
exports.default = PieRadialLabels
