'use strict'

exports.__esModule = true
exports.BubblePlaceholdersDefaultProps = undefined

var _omit2 = require('lodash/omit')

var _omit3 = _interopRequireDefault(_omit2)

var _pick2 = require('lodash/pick')

var _pick3 = _interopRequireDefault(_pick2)

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

var _reactMotion = require('react-motion')

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _withStateHandlers = require('recompose/withStateHandlers')

var _withStateHandlers2 = _interopRequireDefault(_withStateHandlers)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _d3Hierarchy = require('d3-hierarchy')

var _hocs = require('../../../hocs')

var _colors = require('../../../lib/colors')

var _noop = require('../../../lib/noop')

var _noop2 = _interopRequireDefault(_noop)

var _hierarchy = require('../../../lib/hierarchy')

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _BubbleProps = require('./BubbleProps')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var ignoreProps = [
    'borderWidth',
    'borderColor',
    'enableLabel',
    'label',
    'labelFormat',
    'labelTextColor',
    'labelSkipRadius',
    'labelTextDY',
    'transitionDuration',
    'transitionEasing',
]

var nodeWillEnter = function nodeWillEnter(_ref) {
    var node = _ref.data
    return _extends(
        {
            r: 0,
            x: node.x,
            y: node.y,
        },
        (0, _colors.colorMotionSpring)(node.color)
    )
}

var nodeWillLeave = function nodeWillLeave(styleThatLeft) {
    return {
        r: (0, _reactMotion.spring)(0),
        x: (0, _reactMotion.spring)(styleThatLeft.data.x),
        y: (0, _reactMotion.spring)(styleThatLeft.data.y),
    }
}

var computeZoom = function computeZoom(nodes, currentNodePath, width, height) {
    var currentNode = nodes.find(function(_ref2) {
        var path = _ref2.path
        return path === currentNodePath
    })
    if (currentNode) {
        var ratio = Math.min(width, height) / (currentNode.r * 2)
        var offsetX = width / 2 - currentNode.x * ratio
        var offsetY = height / 2 - currentNode.y * ratio
        nodes.forEach(function(node) {
            node.r = node.r * ratio
            node.x = node.x * ratio + offsetX
            node.y = node.y * ratio + offsetY
        })
    }
}

var BubblePlaceholders = function BubblePlaceholders(_ref3) {
    var root = _ref3.root,
        getIdentity = _ref3.getIdentity,
        leavesOnly = _ref3.leavesOnly,
        namespace = _ref3.namespace,
        pack = _ref3.pack,
        width = _ref3.width,
        height = _ref3.height,
        margin = _ref3.margin,
        outerWidth = _ref3.outerWidth,
        outerHeight = _ref3.outerHeight,
        theme = _ref3.theme,
        getColor = _ref3.getColor,
        animate = _ref3.animate,
        motionStiffness = _ref3.motionStiffness,
        motionDamping = _ref3.motionDamping,
        isInteractive = _ref3.isInteractive,
        children = _ref3.children,
        isZoomable = _ref3.isZoomable,
        zoomToNode = _ref3.zoomToNode,
        currentNodePath = _ref3.currentNodePath

    // assign a unique id depending on node path to each node
    root.each(function(node) {
        node.id = getIdentity(node.data)
        node.path = (0, _hierarchy.computeNodePath)(node, getIdentity)
    })

    pack(root)

    var nodes = leavesOnly ? root.leaves() : root.descendants()
    nodes = nodes.map(function(node) {
        node.color = getColor(_extends({}, node.data, { depth: node.depth }))
        // if (d.depth > 1) {
        //     d.color = color(d.parentId)
        // } else {
        //     d.color = color(identity(d.data))
        // }

        return node
    })

    if (currentNodePath) computeZoom(nodes, currentNodePath, width, height)

    var wrapperTag = void 0
    var containerTag = void 0

    var wrapperProps = {}
    var containerProps = {}

    if (namespace === 'svg') {
        wrapperTag = 'svg'
        containerTag = 'g'

        wrapperProps.width = outerWidth
        wrapperProps.height = outerHeight
        wrapperProps.xmlns = 'http://www.w3.org/2000/svg'
        containerProps.transform = 'translate(' + margin.left + ',' + margin.top + ')'
    } else {
        wrapperTag = 'div'
        containerTag = 'div'

        wrapperProps.style = {
            position: 'relative',
            width: outerWidth,
            height: outerHeight,
        }
        containerProps.style = Object.assign({}, margin, {
            position: 'absolute',
        })
    }

    if (!animate) {
        return _react2.default.createElement(
            _Container2.default,
            { isInteractive: isInteractive, theme: theme },
            function(_ref4) {
                var showTooltip = _ref4.showTooltip,
                    hideTooltip = _ref4.hideTooltip
                return _react2.default.createElement(
                    wrapperTag,
                    wrapperProps,
                    _react2.default.createElement(
                        containerTag,
                        containerProps,
                        children(
                            nodes.map(function(node) {
                                return {
                                    key: node.path,
                                    data: node,
                                    style: (0, _pick3.default)(node, ['r', 'x', 'y', 'color']),
                                    zoom:
                                        isInteractive && isZoomable
                                            ? function() {
                                                  return zoomToNode(node.path)
                                              }
                                            : _noop2.default,
                                }
                            }),
                            { showTooltip: showTooltip, hideTooltip: hideTooltip, theme: theme }
                        )
                    )
                )
            }
        )
    }

    var motionProps = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return _react2.default.createElement(
        _Container2.default,
        { isInteractive: isInteractive, theme: theme },
        function(_ref5) {
            var showTooltip = _ref5.showTooltip,
                hideTooltip = _ref5.hideTooltip
            return _react2.default.createElement(
                wrapperTag,
                wrapperProps,
                _react2.default.createElement(
                    _reactMotion.TransitionMotion,
                    {
                        willEnter: nodeWillEnter,
                        willLeave: nodeWillLeave,
                        styles: nodes.map(function(node) {
                            return {
                                key: node.path,
                                data: node,
                                style: _extends(
                                    {
                                        r: (0, _reactMotion.spring)(node.r, motionProps),
                                        x: (0, _reactMotion.spring)(node.x, motionProps),
                                        y: (0, _reactMotion.spring)(node.y, motionProps),
                                    },
                                    (0, _colors.colorMotionSpring)(node.color, motionProps)
                                ),
                            }
                        }),
                    },
                    function(interpolatedStyles) {
                        return _react2.default.createElement(
                            containerTag,
                            containerProps,
                            children(
                                interpolatedStyles.map(function(interpolatedStyle) {
                                    interpolatedStyle.style.color = (0,
                                    _colors.getInterpolatedColor)(interpolatedStyle.style)

                                    if (isInteractive && isZoomable) {
                                        interpolatedStyle.zoom = function() {
                                            return zoomToNode(interpolatedStyle.data.path)
                                        }
                                    } else {
                                        interpolatedStyle.zoom = _noop2.default
                                    }

                                    return interpolatedStyle
                                }),
                                { showTooltip: showTooltip, hideTooltip: hideTooltip, theme: theme }
                            )
                        )
                    }
                )
            )
        }
    )
}

BubblePlaceholders.propTypes = (0, _omit3.default)(_BubbleProps.bubblePropTypes, ignoreProps)

var BubblePlaceholdersDefaultProps = (exports.BubblePlaceholdersDefaultProps = (0, _omit3.default)(
    _BubbleProps.bubbleDefaultProps,
    ignoreProps
))

BubblePlaceholders.defaultProps = BubblePlaceholdersDefaultProps

var enhance = (0, _compose2.default)(
    (0, _hocs.withHierarchy)(),
    (0, _hocs.withDimensions)(),
    (0, _hocs.withTheme)(),
    (0, _hocs.withMotion)(),
    (0, _hocs.withColors)({ defaultColorBy: 'depth' }),
    (0, _withPropsOnChange2.default)(['identity'], function(_ref6) {
        var identity = _ref6.identity
        return {
            getIdentity: (0, _propertiesConverters.getAccessorFor)(identity),
        }
    }),
    (0, _withPropsOnChange2.default)(['width', 'height', 'padding'], function(_ref7) {
        var width = _ref7.width,
            height = _ref7.height,
            padding = _ref7.padding
        return {
            pack: (0, _d3Hierarchy.pack)()
                .size([width, height])
                .padding(padding),
        }
    }),
    (0, _withStateHandlers2.default)(
        function(_ref8) {
            var _ref8$currentNodePath = _ref8.currentNodePath,
                currentNodePath = _ref8$currentNodePath === undefined ? null : _ref8$currentNodePath
            return {
                currentNodePath: currentNodePath,
            }
        },
        {
            zoomToNode: function zoomToNode(_ref9) {
                var currentNodePath = _ref9.currentNodePath
                return function(path) {
                    if (path === currentNodePath) return { currentNodePath: null }
                    return { currentNodePath: path }
                }
            },
        }
    ),
    _pure2.default
)

exports.default = enhance(BubblePlaceholders)
