'use strict'

exports.__esModule = true

var _isEqual2 = require('lodash/isEqual')

var _isEqual3 = _interopRequireDefault(_isEqual2)

var _extends =
    Object.assign ||
    function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i]
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    } /*
                                                                                                                                                                                                                                                                   * This file is part of the nivo project.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                   * file that was distributed with this source code.
                                                                                                                                                                                                                                                                   */

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _shouldUpdate = require('recompose/shouldUpdate')

var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate)

var _props = require('../../props')

var _Axis = require('./Axis')

var _Axis2 = _interopRequireDefault(_Axis)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var horizontalPositions = ['top', 'bottom']
var verticalPositions = ['left', 'right']
var positions = [].concat(horizontalPositions, verticalPositions)

var Axes = function Axes(_ref) {
    var xScale = _ref.xScale,
        yScale = _ref.yScale,
        width = _ref.width,
        height = _ref.height,
        top = _ref.top,
        right = _ref.right,
        bottom = _ref.bottom,
        left = _ref.left,
        theme = _ref.theme,
        animate = _ref.animate,
        motionStiffness = _ref.motionStiffness,
        motionDamping = _ref.motionDamping

    var axes = { top: top, right: right, bottom: bottom, left: left }

    return _react2.default.createElement(
        'g',
        null,
        positions.map(function(position) {
            if (!axes[position]) return null

            var axis = axes[position]
            if (axis.enabled !== undefined && axis.enabled === false) return null

            var scale = horizontalPositions.includes(position) ? xScale : yScale

            return _react2.default.createElement(
                _Axis2.default,
                _extends(
                    {
                        theme: theme,
                    },
                    axis,
                    {
                        key: position,
                        width: width,
                        height: height,
                        position: position,
                        scale: scale,
                        animate: animate,
                        motionDamping: motionDamping,
                        motionStiffness: motionStiffness,
                    }
                )
            )
        })
    )
}

Axes.propTypes = _extends(
    {
        // generic
        xScale: _propTypes2.default.func.isRequired,
        yScale: _propTypes2.default.func.isRequired,
        width: _propTypes2.default.number.isRequired,
        height: _propTypes2.default.number.isRequired,

        // axes
        top: _Axis.axisPropType,
        right: _Axis.axisPropType,
        bottom: _Axis.axisPropType,
        left: _Axis.axisPropType,

        // theming
        theme: _propTypes2.default.object.isRequired,
    },
    _props.motionPropTypes
)

exports.default = (0, _shouldUpdate2.default)(function(props, nextProps) {
    return (
        props.xScale !== nextProps.xScale ||
        props.yScale !== nextProps.yScale ||
        props.width !== nextProps.width ||
        props.height !== nextProps.height ||
        props.theme !== nextProps.theme ||
        props.animate !== nextProps.animate ||
        props.motionDamping !== nextProps.motionDamping ||
        props.motionStiffness !== nextProps.motionStiffness ||
        !(0, _isEqual3.default)(props.top, nextProps.top) ||
        !(0, _isEqual3.default)(props.right, nextProps.right) ||
        !(0, _isEqual3.default)(props.bottom, nextProps.bottom) ||
        !(0, _isEqual3.default)(props.left, nextProps.left)
    )
})(Axes)
