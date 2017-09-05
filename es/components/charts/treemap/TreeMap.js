import _omit from 'lodash/omit'

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

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps'
import TreeMapPlaceholders from './TreeMapPlaceholders'
import TreeMapNode from './TreeMapNode'

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

            return React.createElement(
                TreeMapNode,
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
    return React.createElement(
        TreeMapPlaceholders,
        _extends({}, props, { namespace: 'svg' }),
        createNodesRenderer(props)
    )
}

TreeMap.propTypes = _omit(treeMapPropTypes, ['children', 'namespace'])

export var TreeMapDefaultProps = _omit(treeMapDefaultProps, [])

var enhance = compose(
    defaultProps(TreeMapDefaultProps),
    withPropsOnChange(['label', 'labelFormat'], function(_ref3) {
        var label = _ref3.label,
            labelFormat = _ref3.labelFormat
        return {
            getLabel: getLabelGenerator(label, labelFormat),
        }
    }),
    withPropsOnChange(['borderColor'], function(_ref4) {
        var borderColor = _ref4.borderColor
        return {
            getBorderColor: getInheritedColorGenerator(borderColor),
        }
    }),
    withPropsOnChange(['labelTextColor'], function(_ref5) {
        var labelTextColor = _ref5.labelTextColor
        return {
            getLabelTextColor: getInheritedColorGenerator(labelTextColor),
        }
    }),
    pure
)

var enhancedTreeMap = enhance(TreeMap)
enhancedTreeMap.displayName = 'enhance(TreeMap)'

export default enhancedTreeMap
