'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _reactMotion = require('react-motion')

var _polar = require('../../../lib/polar')

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

        return _react2.default.createElement(
            'g',
            null,
            data
                .filter(function(d) {
                    return skipAngle === 0 || d.angleDegrees > skipAngle
                })
                .map(function(d) {
                    var angle = (0, _polar.midAngle)(d) - Math.PI / 2
                    var position = (0, _polar.positionFromAngle)(angle, centerRadius)

                    return _react2.default.createElement(
                        'g',
                        {
                            key: d.data.id,
                            transform: 'translate(' + position.x + ', ' + position.y + ')',
                            style: sliceStyle,
                        },
                        _react2.default.createElement(
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
})(_react.Component)

PieSlicesLabels.propTypes = {
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
    skipAngle: _propTypes2.default.number.isRequired,
    radius: _propTypes2.default.number.isRequired,
    innerRadius: _propTypes2.default.number.isRequired,
    textColor: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.shape({
        axis: _propTypes2.default.shape({
            textColor: _propTypes2.default.string.isRequired,
            fontSize: _propTypes2.default.oneOfType([
                _propTypes2.default.string,
                _propTypes2.default.number,
            ]).isRequired,
        }).isRequired,
    }).isRequired,
}
PieSlicesLabels.defaultProps = {
    skipAngle: 0,
}
exports.default = PieSlicesLabels
