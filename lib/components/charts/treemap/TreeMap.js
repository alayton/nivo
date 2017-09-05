'use strict'

exports.__esModule = true
exports.TreeMapDefaultProps = undefined

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

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _colors = require('../../../lib/colors')

var _TreeMapProps = require('./TreeMapProps')

var _TreeMapPlaceholders = require('./TreeMapPlaceholders')

var _TreeMapPlaceholders2 = _interopRequireDefault(_TreeMapPlaceholders)

var _TreeMapNode = require('./TreeMapNode')

var _TreeMapNode2 = _interopRequireDefault(_TreeMapNode)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var createNodesRenderer = function createNodesRenderer(_ref) {
    var borderWidth = _ref.borderWidth,
        getBorderColor = _ref.getBorderColor,
        enableLabels = _ref.enableLabels,
        getLabel = _ref.getLabel,
        orientLabels = _ref.orientLabels,
        labelSkipSize = _ref.labelSkipSize,
        getLabelTextColor = _ref.getLabelTextColor
    return function(nodes, _ref2) {
        var showTooltip = _ref2.showTooltip,
            hideTooltip = _ref2.hideTooltip,
            theme = _ref2.theme
        return nodes.map(function(node) {
            var hasLabel =
                enableLabels &&
                (labelSkipSize === 0 ||
                    Math.min(node.style.width, node.style.height) > labelSkipSize)

            return _react2.default.createElement(
                _TreeMapNode2.default,
                _extends(
                    {
                        key: node.key,
                        id: node.data.id,
                        value: node.data.value,
                        dataColor: node.data.color,
                    },
                    node.style,
                    {
                        borderWidth: borderWidth,
                        borderColor: getBorderColor(
                            _extends({}, node.data, { color: node.style.color })
                        ),
                        hasLabel: hasLabel,
                        label: hasLabel ? getLabel(node.data) : '',
                        orientLabel: orientLabels,
                        labelTextColor: getLabelTextColor(
                            _extends({}, node.data, { color: node.style.color })
                        ),
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        theme: theme,
                    }
                )
            )
        })
    }
}

var TreeMap = function TreeMap(props) {
    return _react2.default.createElement(
        _TreeMapPlaceholders2.default,
        _extends({}, props, { namespace: 'svg' }),
        createNodesRenderer(props)
    )
}

TreeMap.propTypes = (0, _omit3.default)(_TreeMapProps.treeMapPropTypes, ['children', 'namespace'])

var TreeMapDefaultProps = (exports.TreeMapDefaultProps = (0, _omit3.default)(
    _TreeMapProps.treeMapDefaultProps,
    []
))

var enhance = (0, _compose2.default)(
    (0, _defaultProps2.default)(TreeMapDefaultProps),
    (0, _withPropsOnChange2.default)(['label', 'labelFormat'], function(_ref3) {
        var label = _ref3.label,
            labelFormat = _ref3.labelFormat
        return {
            getLabel: (0, _propertiesConverters.getLabelGenerator)(label, labelFormat),
        }
    }),
    (0, _withPropsOnChange2.default)(['borderColor'], function(_ref4) {
        var borderColor = _ref4.borderColor
        return {
            getBorderColor: (0, _colors.getInheritedColorGenerator)(borderColor),
        }
    }),
    (0, _withPropsOnChange2.default)(['labelTextColor'], function(_ref5) {
        var labelTextColor = _ref5.labelTextColor
        return {
            getLabelTextColor: (0, _colors.getInheritedColorGenerator)(labelTextColor),
        }
    }),
    _pure2.default
)

var enhancedTreeMap = enhance(TreeMap)
enhancedTreeMap.displayName = 'enhance(TreeMap)'

exports.default = enhancedTreeMap
