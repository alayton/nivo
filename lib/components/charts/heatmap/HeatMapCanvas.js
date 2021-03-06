'use strict'

exports.__esModule = true

var _partial2 = require('lodash/partial')

var _partial3 = _interopRequireDefault(_partial2)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _axes = require('../../../lib/canvas/axes')

var _interactivity = require('../../../lib/interactivity')

var _heatmap = require('../../../lib/canvas/charts/heatmap')

var _heatmap2 = require('../../../lib/charts/heatmap')

var _HeatMapCellTooltip = require('./HeatMapCellTooltip')

var _HeatMapCellTooltip2 = _interopRequireDefault(_HeatMapCellTooltip)

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _props2 = require('./props')

var _enhance = require('./enhance')

var _enhance2 = _interopRequireDefault(_enhance)

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

var HeatMapCanvas = (function(_Component) {
    _inherits(HeatMapCanvas, _Component)

    function HeatMapCanvas() {
        var _temp, _this, _ret

        _classCallCheck(this, HeatMapCanvas)

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }

        return (
            (_ret = ((_temp = ((_this = _possibleConstructorReturn(
                this,
                _Component.call.apply(_Component, [this].concat(args))
            )),
            _this)),
            (_this.handleMouseHover = function(showTooltip, hideTooltip, event) {
                if (!_this.nodes) return

                var _getRelativeCursor = (0, _interactivity.getRelativeCursor)(
                        _this.surface,
                        event
                    ),
                    x = _getRelativeCursor[0],
                    y = _getRelativeCursor[1]

                var _this$props = _this.props,
                    margin = _this$props.margin,
                    offsetX = _this$props.offsetX,
                    offsetY = _this$props.offsetY,
                    theme = _this$props.theme,
                    setCurrentNode = _this$props.setCurrentNode

                var node = _this.nodes.find(function(node) {
                    return (0,
                    _interactivity.isCursorInRect)(node.x + margin.left + offsetX - node.width / 2, node.y + margin.top + offsetY - node.height / 2, node.width, node.height, x, y)
                })

                if (node !== undefined) {
                    setCurrentNode(node)
                    showTooltip(
                        _react2.default.createElement(_HeatMapCellTooltip2.default, {
                            node: node,
                            theme: theme,
                        }),
                        event
                    )
                } else {
                    setCurrentNode(null)
                    hideTooltip()
                }
            }),
            (_this.handleMouseLeave = function(hideTooltip) {
                _this.props.setCurrentNode(null)
                hideTooltip()
            }),
            _temp)),
            _possibleConstructorReturn(_this, _ret)
        )
    }

    HeatMapCanvas.prototype.componentDidMount = function componentDidMount() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    HeatMapCanvas.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
        if (
            this.props.outerWidth !== props.outerWidth ||
            this.props.outerHeight !== props.outerHeight ||
            this.props.isInteractive !== props.isInteractive ||
            this.props.theme !== props.theme
        ) {
            return true
        } else {
            this.draw(props)
            return false
        }
    }

    HeatMapCanvas.prototype.componentDidUpdate = function componentDidUpdate() {
        this.ctx = this.surface.getContext('2d')
        this.draw(this.props)
    }

    HeatMapCanvas.prototype.draw = function draw(props) {
        var width = props.width,
            height = props.height,
            outerWidth = props.outerWidth,
            outerHeight = props.outerHeight,
            pixelRatio = props.pixelRatio,
            margin = props.margin,
            offsetX = props.offsetX,
            offsetY = props.offsetY,
            xScale = props.xScale,
            yScale = props.yScale,
            cellShape = props.cellShape

        this.surface.width = outerWidth * pixelRatio
        this.surface.height = outerHeight * pixelRatio

        this.ctx.scale(pixelRatio, pixelRatio)

        var renderNode = void 0
        if (cellShape === 'rect') {
            renderNode = (0, _partial3.default)(_heatmap.renderRect, this.ctx)
        } else {
            renderNode = (0, _partial3.default)(_heatmap.renderCircle, this.ctx)
        }

        var nodes = (0, _heatmap2.computeNodes)(props)

        this.ctx.clearRect(0, 0, outerWidth, outerHeight)
        this.ctx.translate(margin.left + offsetX, margin.top + offsetY)

        ;(0, _axes.renderAxes)(this.ctx, {
            xScale: xScale,
            yScale: yScale,
            width: width - offsetX * 2,
            height: height - offsetY * 2,
            top: props.axisTop,
            right: props.axisRight,
            bottom: props.axisBottom,
            left: props.axisLeft,
        })

        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'

        nodes.forEach(renderNode)

        this.nodes = nodes
    }

    HeatMapCanvas.prototype.render = function render() {
        var _this2 = this

        var _props = this.props,
            outerWidth = _props.outerWidth,
            outerHeight = _props.outerHeight,
            pixelRatio = _props.pixelRatio,
            isInteractive = _props.isInteractive,
            theme = _props.theme

        return _react2.default.createElement(
            _Container2.default,
            { isInteractive: isInteractive, theme: theme },
            function(_ref) {
                var showTooltip = _ref.showTooltip,
                    hideTooltip = _ref.hideTooltip
                return _react2.default.createElement('canvas', {
                    ref: function ref(surface) {
                        _this2.surface = surface
                    },
                    width: outerWidth * pixelRatio,
                    height: outerHeight * pixelRatio,
                    style: {
                        width: outerWidth,
                        height: outerHeight,
                    },
                    onMouseEnter: (0, _partial3.default)(
                        _this2.handleMouseHover,
                        showTooltip,
                        hideTooltip
                    ),
                    onMouseMove: (0, _partial3.default)(
                        _this2.handleMouseHover,
                        showTooltip,
                        hideTooltip
                    ),
                    onMouseLeave: (0, _partial3.default)(_this2.handleMouseLeave, hideTooltip),
                })
            }
        )
    }

    return HeatMapCanvas
})(_react.Component)

HeatMapCanvas.propTypes = _props2.HeatMapPropTypes

exports.default = (0, _enhance2.default)(HeatMapCanvas)
