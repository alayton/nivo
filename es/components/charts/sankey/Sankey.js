import _cloneDeep from 'lodash/cloneDeep'

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
import PropTypes from 'prop-types'

import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { sankey as d3Sankey } from 'd3-sankey'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { withColors, withTheme, withDimensions, withMotion } from '../../../hocs'
import { sankeyAlignmentPropType, sankeyAlignmentFromProp } from '../../../props'
import SvgWrapper from '../SvgWrapper'
import SankeyNodes from './SankeyNodes'
import SankeyLinks from './SankeyLinks'
import SankeyLabels from './SankeyLabels'
import Container from '../Container'

var getId = function getId(d) {
    return d.id
}

var Sankey = function Sankey(_ref) {
    var _data = _ref.data,
        align = _ref.align,
        margin = _ref.margin,
        width = _ref.width,
        height = _ref.height,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        nodeOpacity = _ref.nodeOpacity,
        nodeHoverOpacity = _ref.nodeHoverOpacity,
        nodeWidth = _ref.nodeWidth,
        nodePaddingX = _ref.nodePaddingX,
        nodePaddingY = _ref.nodePaddingY,
        nodeBorderWidth = _ref.nodeBorderWidth,
        getNodeBorderColor = _ref.getNodeBorderColor,
        setCurrentNode = _ref.setCurrentNode,
        currentNode = _ref.currentNode,
        linkOpacity = _ref.linkOpacity,
        linkHoverOpacity = _ref.linkHoverOpacity,
        linkContract = _ref.linkContract,
        getLinkColor = _ref.getLinkColor,
        setCurrentLink = _ref.setCurrentLink,
        currentLink = _ref.currentLink,
        enableLabels = _ref.enableLabels,
        labelPosition = _ref.labelPosition,
        labelPadding = _ref.labelPadding,
        labelOrientation = _ref.labelOrientation,
        getLabelTextColor = _ref.getLabelTextColor,
        theme = _ref.theme,
        getColor = _ref.getColor,
        animate = _ref.animate,
        motionDamping = _ref.motionDamping,
        motionStiffness = _ref.motionStiffness,
        isInteractive = _ref.isInteractive

    var sankey = d3Sankey()
        .nodeAlign(sankeyAlignmentFromProp(align))
        .nodeWidth(nodeWidth)
        .nodePadding(nodePaddingY)
        .size([width, height])
        .nodeId(getId)

    // deep clone is required as the sankey diagram mutates data
    var data = _cloneDeep(_data)
    sankey(data)

    data.nodes.forEach(function(node) {
        node.color = getColor(node)
        node.x = node.x0 + nodePaddingX
        node.y = node.y0
        node.width = Math.max(node.x1 - node.x0 - nodePaddingX * 2, 0)
        node.height = Math.max(node.y1 - node.y0, 0)
    })

    data.links.forEach(function(link) {
        link.color = getLinkColor(link)
    })

    var motionProps = {
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness,
    }

    return React.createElement(Container, { isInteractive: isInteractive, theme: theme }, function(
        _ref2
    ) {
        var showTooltip = _ref2.showTooltip,
            hideTooltip = _ref2.hideTooltip
        return React.createElement(
            SvgWrapper,
            { width: outerWidth, height: outerHeight, margin: margin },
            React.createElement(
                SankeyLinks,
                _extends(
                    {
                        links: data.links,
                        linkContract: linkContract,
                        linkOpacity: linkOpacity,
                        linkHoverOpacity: linkHoverOpacity,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        theme: theme,
                    },
                    motionProps
                )
            ),
            React.createElement(
                SankeyNodes,
                _extends(
                    {
                        nodes: data.nodes,
                        nodePaddingX: nodePaddingX,
                        nodeOpacity: nodeOpacity,
                        nodeHoverOpacity: nodeHoverOpacity,
                        nodeBorderWidth: nodeBorderWidth,
                        getNodeBorderColor: getNodeBorderColor,
                        showTooltip: showTooltip,
                        hideTooltip: hideTooltip,
                        theme: theme,
                    },
                    motionProps
                )
            ),
            enableLabels &&
                React.createElement(
                    SankeyLabels,
                    _extends(
                        {
                            nodes: data.nodes,
                            width: width,
                            labelPosition: labelPosition,
                            labelPadding: labelPadding,
                            labelOrientation: labelOrientation,
                            getLabelTextColor: getLabelTextColor,
                            theme: theme,
                        },
                        motionProps
                    )
                )
        )
    })
}

Sankey.propTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
        ).isRequired,
        links: PropTypes.arrayOf(
            PropTypes.shape({
                source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                target: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            })
        ).isRequired,
    }).isRequired,

    align: sankeyAlignmentPropType.isRequired,

    // nodes
    nodeOpacity: PropTypes.number.isRequired,
    nodeHoverOpacity: PropTypes.number.isRequired,
    nodeWidth: PropTypes.number.isRequired,
    nodePaddingX: PropTypes.number.isRequired,
    nodePaddingY: PropTypes.number.isRequired,
    nodeBorderWidth: PropTypes.number.isRequired,
    nodeBorderColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    // links
    linkOpacity: PropTypes.number.isRequired,
    linkHoverOpacity: PropTypes.number.isRequired,
    linkContract: PropTypes.number.isRequired,

    // labels
    enableLabels: PropTypes.bool.isRequired,
    labelPosition: PropTypes.oneOf(['inside', 'outside']).isRequired,
    labelPadding: PropTypes.number.isRequired,
    labelOrientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    labelTextColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    getLabelTextColor: PropTypes.func.isRequired, // computed

    // interactivity
    isInteractive: PropTypes.bool.isRequired,
}

export var SankeyDefaultProps = {
    align: 'center',

    // nodes
    nodeOpacity: 0.65,
    nodeHoverOpacity: 1,
    nodeWidth: 12,
    nodePaddingX: 0,
    nodePaddingY: 12,
    nodeBorderWidth: 1,
    nodeBorderColor: 'inherit:darker(0.5)',

    // links
    linkOpacity: 0.2,
    linkHoverOpacity: 0.4,
    linkContract: 0,

    // labels
    enableLabels: true,
    labelPosition: 'inside',
    labelPadding: 9,
    labelOrientation: 'horizontal',
    labelTextColor: 'inherit:darker(0.8)',

    // interactivity
    isInteractive: true,
}

var enhance = compose(
    defaultProps(SankeyDefaultProps),
    withState('currentNode', 'setCurrentNode', null),
    withState('currentLink', 'setCurrentLink', null),
    withColors(),
    withColors({
        colorByKey: 'linkColorBy',
        destKey: 'getLinkColor',
        defaultColorBy: 'source.id',
    }),
    withTheme(),
    withDimensions(),
    withMotion(),
    withPropsOnChange(['nodeBorderColor'], function(_ref3) {
        var nodeBorderColor = _ref3.nodeBorderColor
        return {
            getNodeBorderColor: getInheritedColorGenerator(nodeBorderColor),
        }
    }),
    withPropsOnChange(['labelTextColor'], function(_ref4) {
        var labelTextColor = _ref4.labelTextColor
        return {
            getLabelTextColor: getInheritedColorGenerator(labelTextColor),
        }
    }),
    pure
)

export default enhance(Sankey)
