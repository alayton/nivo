'use strict'

exports.__esModule = true
exports.SunburstDefaultProps = undefined

var _cloneDeep2 = require('lodash/cloneDeep')

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2)

var _sortBy2 = require('lodash/sortBy')

var _sortBy3 = _interopRequireDefault(_sortBy2)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _reactMotion = require('react-motion')

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _withProps = require('recompose/withProps')

var _withProps2 = _interopRequireDefault(_withProps)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _d3Hierarchy = require('d3-hierarchy')

var _d3Shape = require('d3-shape')

var _colors = require('../../../lib/colors')

var _hocs = require('../../../hocs')

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _SunburstArc = require('./SunburstArc')

var _SunburstArc2 = _interopRequireDefault(_SunburstArc)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var getAncestor = function getAncestor(node) {
    if (node.depth === 1) return node
    if (node.parent) return getAncestor(node.parent)
    return node
}

var Sunburst = function Sunburst(_ref) {
    var nodes = _ref.nodes,
        margin = _ref.margin,
        centerX = _ref.centerX,
        centerY = _ref.centerY,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        arcGenerator = _ref.arcGenerator,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        theme = _ref.theme,
        isInteractive = _ref.isInteractive

    return _react2.default.createElement(
        _Container2.default,
        { isInteractive: isInteractive, theme: theme },
        function(_ref2) {
            var showTooltip = _ref2.showTooltip,
                hideTooltip = _ref2.hideTooltip
            return _react2.default.createElement(
                _SvgWrapper2.default,
                { width: outerWidth, height: outerHeight, margin: margin },
                _react2.default.createElement(
                    'g',
                    { transform: 'translate(' + centerX + ', ' + centerY + ')' },
                    nodes
                        .filter(function(node) {
                            return node.depth > 0
                        })
                        .map(function(node, i) {
                            return _react2.default.createElement(_SunburstArc2.default, {
                                key: i,
                                node: node,
                                arcGenerator: arcGenerator,
                                borderWidth: borderWidth,
                                borderColor: borderColor,
                                showTooltip: showTooltip,
                                hideTooltip: hideTooltip,
                                theme: theme,
                            })
                        })
                )
            )
        }
    )
}

Sunburst.propTypes = {
    data: _propTypes2.default.object.isRequired,
    identity: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
        .isRequired,
    getIdentity: _propTypes2.default.func.isRequired, // computed
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
        .isRequired,
    getValue: _propTypes2.default.func.isRequired, // computed
    nodes: _propTypes2.default.array.isRequired, // computed

    partition: _propTypes2.default.func.isRequired, // computed

    cornerRadius: _propTypes2.default.number.isRequired,
    arcGenerator: _propTypes2.default.func.isRequired, // computed

    radius: _propTypes2.default.number.isRequired, // computed
    centerX: _propTypes2.default.number.isRequired, // computed
    centerY: _propTypes2.default.number.isRequired, // computed

    // border
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.string.isRequired,

    childColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]).isRequired,

    // interactivity
    isInteractive: _propTypes2.default.bool,
}

var SunburstDefaultProps = (exports.SunburstDefaultProps = {
    identity: 'id',
    value: 'value',

    cornerRadius: 0,

    // border
    borderWidth: 1,
    borderColor: 'white',

    childColor: 'inherit',

    // interactivity
    isInteractive: true,
})

var enhance = (0, _compose2.default)(
    (0, _defaultProps2.default)(SunburstDefaultProps),
    (0, _hocs.withTheme)(),
    (0, _hocs.withDimensions)(),
    (0, _hocs.withColors)(),
    (0, _withProps2.default)(function(_ref3) {
        var width = _ref3.width,
            height = _ref3.height

        var radius = Math.min(width, height) / 2

        var partition = (0, _d3Hierarchy.partition)().size([2 * Math.PI, radius * radius])

        return { radius: radius, partition: partition, centerX: width / 2, centerY: height / 2 }
    }),
    (0, _withPropsOnChange2.default)(['cornerRadius'], function(_ref4) {
        var cornerRadius = _ref4.cornerRadius
        return {
            arcGenerator: (0, _d3Shape.arc)()
                .startAngle(function(d) {
                    return d.x0
                })
                .endAngle(function(d) {
                    return d.x1
                })
                .innerRadius(function(d) {
                    return Math.sqrt(d.y0)
                })
                .outerRadius(function(d) {
                    return Math.sqrt(d.y1)
                })
                .cornerRadius(cornerRadius),
        }
    }),
    (0, _withPropsOnChange2.default)(['identity'], function(_ref5) {
        var identity = _ref5.identity
        return {
            getIdentity: (0, _propertiesConverters.getAccessorFor)(identity),
        }
    }),
    (0, _withPropsOnChange2.default)(['value'], function(_ref6) {
        var value = _ref6.value
        return {
            getValue: (0, _propertiesConverters.getAccessorFor)(value),
        }
    }),
    (0, _withPropsOnChange2.default)(['data', 'getValue'], function(_ref7) {
        var data = _ref7.data,
            getValue = _ref7.getValue
        return {
            data: (0, _d3Hierarchy.hierarchy)(data).sum(getValue),
        }
    }),
    (0, _withPropsOnChange2.default)(['childColor'], function(_ref8) {
        var childColor = _ref8.childColor
        return {
            getChildColor: (0, _colors.getInheritedColorGenerator)(childColor),
        }
    }),
    (0, _withPropsOnChange2.default)(
        ['data', 'partition', 'getIdentity', 'getChildColor'],
        function(_ref9) {
            var data = _ref9.data,
                partition = _ref9.partition,
                getIdentity = _ref9.getIdentity,
                getColor = _ref9.getColor,
                getChildColor = _ref9.getChildColor

            var total = data.value

            var nodes = (0, _sortBy3.default)(
                partition((0, _cloneDeep3.default)(data)).descendants(),
                'depth'
            )
            nodes.forEach(function(node) {
                var ancestor = getAncestor(node).data

                delete node.children
                delete node.data.children

                Object.assign(node.data, {
                    id: getIdentity(node.data),
                    value: node.value,
                    percentage: 100 * node.value / total,
                    depth: node.depth,
                    ancestor: ancestor,
                })

                if (node.depth === 1) {
                    node.data.color = getColor(node.data)
                } else if (node.depth > 1) {
                    node.data.color = getChildColor(node.parent.data)
                }
            })

            return { nodes: nodes }
        }
    ),
    _pure2.default
)

var enhancedSunburst = enhance(Sunburst)
enhancedSunburst.displayName = 'enhance(Sunburst)'

exports.default = enhancedSunburst
