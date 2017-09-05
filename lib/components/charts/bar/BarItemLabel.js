'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

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

var safeSize = 20

var labelStyle = {
    pointerEvents: 'none',
}

var BarItemLabel = (function(_Component) {
    _inherits(BarItemLabel, _Component)

    function BarItemLabel() {
        _classCallCheck(this, BarItemLabel)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    BarItemLabel.prototype.render = function render() {
        var _props = this.props,
            _x = _props.x,
            _y = _props.y,
            width = _props.width,
            height = _props.height,
            linkColor = _props.linkColor,
            textColor = _props.textColor,
            data = _props.data

        var x = _x
        var y = _y
        var textX = void 0
        var line = void 0
        var textAnchor = void 0
        if (height < safeSize) {
            textX = -13
            textAnchor = 'end'
            y = _y + height / 2
            line = _react2.default.createElement('line', {
                style: { stroke: linkColor },
                x1: 0,
                x2: -10,
                y1: 0,
                y2: 0,
            })
        } else {
            textX = 0
            textAnchor = 'middle'
            x = _x + width / 2
            y = _y + height / 2
        }

        return _react2.default.createElement(
            'g',
            {
                transform: 'translate(' + x + ',' + y + ')',
                className: 'nivo_bar_legend',
                style: labelStyle,
            },
            line,
            _react2.default.createElement(
                'text',
                { x: textX, textAnchor: textAnchor, dy: '0.5em', style: { fill: textColor } },
                data.value
            )
        )
    }

    return BarItemLabel
})(_react.Component)

BarItemLabel.propTypes = {
    data: _propTypes2.default.shape({
        value: _propTypes2.default.number.isRequired,
    }).isRequired,
    x: _propTypes2.default.number.isRequired,
    y: _propTypes2.default.number.isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    linkColor: _propTypes2.default.string.isRequired,
    textColor: _propTypes2.default.string.isRequired,
}
BarItemLabel.defaultProps = {}
exports.default = BarItemLabel
