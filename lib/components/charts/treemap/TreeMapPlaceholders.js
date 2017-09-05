'use strict'

exports.__esModule = true

var _omit2 = require('lodash/omit')

var _omit3 = _interopRequireDefault(_omit2)

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

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _d3Hierarchy = require('d3-hierarchy')

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _props = require('../../../props')

var _TreeMapProps = require('./TreeMapProps')

var _hocs = require('../../../hocs')

var _colors = require('../../../lib/colors')

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var nodeWillEnter = function nodeWillEnter(_ref) {
    var node = _ref.data

    var width = node.x1 - node.x0
    var height = node.y1 - node.y0

    return _extends(
        {
            x: node.x0 + width / 2,
            y: node.y0 + height / 2,
            width: 0,
            height: 0,
        },
        (0, _colors.colorMotionSpring)(node.color)
    )
}

var TreeMapPlaceholders = function TreeMapPlaceholders(_ref2) {
    var root = _ref2.root,
        getIdentity = _ref2.getIdentity,
        namespace = _ref2.namespace,
        margin = _ref2.margin,
        outerWidth = _ref2.outerWidth,
        outerHeight = _ref2.outerHeight,
        treemap = _ref2.treemap,
        leavesOnly = _ref2.leavesOnly,
        animate = _ref2.animate,
        motionStiffness = _ref2.motionStiffness,
        motionDamping = _ref2.motionDamping,
        theme = _ref2.theme,
        getColor = _ref2.getColor,
        isInteractive = _ref2.isInteractive,
        children = _ref2.children

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
        containerProps.style = {
            position: 'absolute',
            top: margin.top,
            left: margin.left,
        }
    }

    treemap(root)

    var nodes = leavesOnly ? root.leaves() : root.descendants()
    nodes = nodes.map(function(d) {
        d.color = getColor(_extends({}, d.data, { depth: d.depth }))

        d.data.id = getIdentity(d.data)
        d.data.value = d.value
        d.data.color = d.color
        d.data.key = d
            .ancestors()
            .map(function(a) {
                return getIdentity(a.data)
            })
            .join('.')

        return d
    })

    return _react2.default.createElement(
        _Container2.default,
        { isInteractive: isInteractive, theme: theme },
        function(_ref3) {
            var showTooltip = _ref3.showTooltip,
                hideTooltip = _ref3.hideTooltip

            if (animate === false) {
                return _react2.default.createElement(
                    wrapperTag,
                    wrapperProps,
                    _react2.default.createElement(
                        containerTag,
                        containerProps,
                        children(
                            nodes.map(function(node) {
                                return {
                                    key: node.data.key,
                                    data: node.data,
                                    style: {
                                        x: node.x0,
                                        y: node.y0,
                                        width: node.x1 - node.x0,
                                        height: node.y1 - node.y0,
                                        color: node.color,
                                    },
                                }
                            }),
                            { showTooltip: showTooltip, hideTooltip: hideTooltip, theme: theme }
                        )
                    )
                )
            }

            var springConfig = {
                stiffness: motionStiffness,
                damping: motionDamping,
            }

            return _react2.default.createElement(
                wrapperTag,
                wrapperProps,
                _react2.default.createElement(
                    _reactMotion.TransitionMotion,
                    {
                        willEnter: nodeWillEnter,
                        styles: nodes.map(function(node) {
                            return {
                                key: node.data.key,
                                data: node.data,
                                style: _extends(
                                    {
                                        x: (0, _reactMotion.spring)(node.x0, springConfig),
                                        y: (0, _reactMotion.spring)(node.y0, springConfig),
                                        width: (0, _reactMotion.spring)(
                                            node.x1 - node.x0,
                                            springConfig
                                        ),
                                        height: (0, _reactMotion.spring)(
                                            node.y1 - node.y0,
                                            springConfig
                                        ),
                                    },
                                    (0, _colors.colorMotionSpring)(node.color, springConfig)
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
                                    var _interpolatedStyle$st = interpolatedStyle.style,
                                        x = _interpolatedStyle$st.x,
                                        y = _interpolatedStyle$st.y,
                                        width = _interpolatedStyle$st.width,
                                        height = _interpolatedStyle$st.height,
                                        colorR = _interpolatedStyle$st.colorR,
                                        colorG = _interpolatedStyle$st.colorG,
                                        colorB = _interpolatedStyle$st.colorB

                                    return _extends({}, interpolatedStyle, {
                                        style: {
                                            x: x,
                                            y: y,
                                            width: Math.max(0, width),
                                            height: Math.max(0, height),
                                            color:
                                                'rgb(' +
                                                Math.round(colorR) +
                                                ',' +
                                                Math.round(colorG) +
                                                ',' +
                                                Math.round(colorB) +
                                                ')',
                                        },
                                    })
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

TreeMapPlaceholders.propTypes = (0, _omit3.default)(_TreeMapProps.treeMapPropTypes, [
    'orientLabels',
    'skipVMin',
    'transitionDuration',
    'transitionEasing',
])

TreeMapPlaceholders.defaultProps = (0, _omit3.default)(_TreeMapProps.treeMapDefaultProps, [
    'orientLabels',
    'skipVMin',
    'transitionDuration',
    'transitionEasing',
])

var enhance = (0, _compose2.default)(
    (0, _hocs.withHierarchy)(),
    (0, _hocs.withDimensions)(),
    (0, _hocs.withColors)({ defaultColorBy: 'depth' }),
    (0, _hocs.withTheme)(),
    (0, _hocs.withMotion)(),
    (0, _withPropsOnChange2.default)(['identity'], function(_ref4) {
        var identity = _ref4.identity
        return {
            getIdentity: (0, _propertiesConverters.getAccessorFor)(identity),
        }
    }),
    (0, _withPropsOnChange2.default)(
        ['width', 'height', 'tile', 'innerPadding', 'outerPadding'],
        function(_ref5) {
            var width = _ref5.width,
                height = _ref5.height,
                tile = _ref5.tile,
                innerPadding = _ref5.innerPadding,
                outerPadding = _ref5.outerPadding
            return {
                treemap: (0, _d3Hierarchy.treemap)()
                    .size([width, height])
                    .tile((0, _props.treeMapTileFromProp)(tile))
                    .round(true)
                    .paddingInner(innerPadding)
                    .paddingOuter(outerPadding),
            }
        }
    ),
    _pure2.default
)

exports.default = enhance(TreeMapPlaceholders)
