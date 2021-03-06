'use strict'

exports.__esModule = true

var _partial2 = require('lodash/partial')

var _partial3 = _interopRequireDefault(_partial2)

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
    }

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _reactMotion = require('react-motion')

var _colors = require('../../../lib/colors')

var _props2 = require('./props')

var _heatmap = require('../../../lib/charts/heatmap')

var _enhance = require('./enhance')

var _enhance2 = _interopRequireDefault(_enhance)

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _Grid = require('../../axes/Grid')

var _Grid2 = _interopRequireDefault(_Grid)

var _Axes = require('../../axes/Axes')

var _Axes2 = _interopRequireDefault(_Axes)

var _HeatMapCellRect = require('./HeatMapCellRect')

var _HeatMapCellRect2 = _interopRequireDefault(_HeatMapCellRect)

var _HeatMapCellCircle = require('./HeatMapCellCircle')

var _HeatMapCellCircle2 = _interopRequireDefault(_HeatMapCellCircle)

var _HeatMapCellTooltip = require('./HeatMapCellTooltip')

var _HeatMapCellTooltip2 = _interopRequireDefault(_HeatMapCellTooltip)

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

var HeatMap = (function(_Component) {
    _inherits(HeatMap, _Component)

    function HeatMap() {
        var _temp, _this, _ret

        _classCallCheck(this, HeatMap)

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }

        return (
            (_ret = ((_temp = ((_this = _possibleConstructorReturn(
                this,
                _Component.call.apply(_Component, [this].concat(args))
            )),
            _this)),
            (_this.handleNodeHover = function(showTooltip, node, event) {
                var _this$props = _this.props,
                    setCurrentNode = _this$props.setCurrentNode,
                    theme = _this$props.theme

                setCurrentNode(node)
                showTooltip(
                    _react2.default.createElement(_HeatMapCellTooltip2.default, {
                        node: node,
                        theme: theme,
                    }),
                    event
                )
            }),
            (_this.handleNodeLeave = function(hideTooltip) {
                _this.props.setCurrentNode(null)
                hideTooltip()
            }),
            _temp)),
            _possibleConstructorReturn(_this, _ret)
        )
    }

    HeatMap.prototype.render = function render() {
        var _this2 = this

        var _props = this.props,
            xScale = _props.xScale,
            yScale = _props.yScale,
            offsetX = _props.offsetX,
            offsetY = _props.offsetY,
            margin = _props.margin,
            width = _props.width,
            height = _props.height,
            outerWidth = _props.outerWidth,
            outerHeight = _props.outerHeight,
            cellShape = _props.cellShape,
            cellBorderWidth = _props.cellBorderWidth,
            getCellBorderColor = _props.getCellBorderColor,
            axisTop = _props.axisTop,
            axisRight = _props.axisRight,
            axisBottom = _props.axisBottom,
            axisLeft = _props.axisLeft,
            enableGridX = _props.enableGridX,
            enableGridY = _props.enableGridY,
            enableLabels = _props.enableLabels,
            getLabelTextColor = _props.getLabelTextColor,
            theme = _props.theme,
            animate = _props.animate,
            motionStiffness = _props.motionStiffness,
            motionDamping = _props.motionDamping,
            boundSpring = _props.boundSpring,
            isInteractive = _props.isInteractive

        var Cell = void 0
        if (cellShape === 'rect') {
            Cell = _HeatMapCellRect2.default
        } else if (cellShape === 'circle') {
            Cell = _HeatMapCellCircle2.default
        } else {
            Cell = cellShape
        }

        var nodes = (0, _heatmap.computeNodes)(this.props)

        var motionProps = {
            animate: animate,
            motionDamping: motionDamping,
            motionStiffness: motionStiffness,
        }

        return _react2.default.createElement(
            _Container2.default,
            { isInteractive: isInteractive, theme: theme },
            function(_ref) {
                var showTooltip = _ref.showTooltip,
                    hideTooltip = _ref.hideTooltip

                var onHover = (0, _partial3.default)(_this2.handleNodeHover, showTooltip)
                var onLeave = (0, _partial3.default)(_this2.handleNodeLeave, hideTooltip)

                return _react2.default.createElement(
                    _SvgWrapper2.default,
                    {
                        width: outerWidth,
                        height: outerHeight,
                        margin: Object.assign({}, margin, {
                            top: margin.top + offsetY,
                            left: margin.left + offsetX,
                        }),
                    },
                    _react2.default.createElement(
                        _Grid2.default,
                        _extends(
                            {
                                theme: theme,
                                width: width - offsetX * 2,
                                height: height - offsetY * 2,
                                xScale: enableGridX ? xScale : null,
                                yScale: enableGridY ? yScale : null,
                            },
                            motionProps
                        )
                    ),
                    _react2.default.createElement(
                        _Axes2.default,
                        _extends(
                            {
                                xScale: xScale,
                                yScale: yScale,
                                width: width,
                                height: height,
                                theme: theme,
                                top: axisTop,
                                right: axisRight,
                                bottom: axisBottom,
                                left: axisLeft,
                            },
                            motionProps
                        )
                    ),
                    !animate &&
                        nodes.map(function(node) {
                            return _react2.default.createElement(Cell, {
                                key: node.key,
                                value: node.value,
                                x: node.x,
                                y: node.y,
                                width: node.width,
                                height: node.height,
                                color: node.color,
                                opacity: node.opacity,
                                borderWidth: cellBorderWidth,
                                borderColor: getCellBorderColor(node),
                                textColor: getLabelTextColor(node),
                                onHover: (0, _partial3.default)(onHover, node),
                                onLeave: onLeave,
                            })
                        }),
                    animate === true &&
                        _react2.default.createElement(
                            _reactMotion.TransitionMotion,
                            {
                                styles: nodes.map(function(node) {
                                    return {
                                        key: node.key,
                                        data: node,
                                        style: _extends(
                                            {
                                                x: boundSpring(node.x),
                                                y: boundSpring(node.y),
                                                width: boundSpring(node.width),
                                                height: boundSpring(node.height),
                                                opacity: boundSpring(node.opacity),
                                            },
                                            (0, _colors.colorMotionSpring)(node.color, {
                                                damping: motionDamping,
                                                stiffness: motionStiffness,
                                            })
                                        ),
                                    }
                                }),
                            },
                            function(interpolatedStyles) {
                                return _react2.default.createElement(
                                    'g',
                                    null,
                                    interpolatedStyles.map(function(_ref2) {
                                        var key = _ref2.key,
                                            style = _ref2.style,
                                            node = _ref2.data

                                        var color = (0, _colors.getInterpolatedColor)(style)

                                        return _react2.default.createElement(Cell, {
                                            key: key,
                                            value: node.value,
                                            x: style.x,
                                            y: style.y,
                                            width: Math.max(style.width, 0),
                                            height: Math.max(style.height, 0),
                                            color: color,
                                            opacity: style.opacity,
                                            borderWidth: cellBorderWidth,
                                            borderColor: getCellBorderColor(
                                                _extends({}, node, {
                                                    color: color,
                                                })
                                            ),
                                            textColor: getLabelTextColor(
                                                _extends({}, node, {
                                                    color: color,
                                                })
                                            ),
                                            onHover: (0, _partial3.default)(onHover, node),
                                            onLeave: onLeave,
                                        })
                                    })
                                )
                            }
                        )
                )
            }
        )
    }

    return HeatMap
})(_react.Component)

HeatMap.propTypes = _props2.HeatMapPropTypes
exports.default = (0, _enhance2.default)(HeatMap)
