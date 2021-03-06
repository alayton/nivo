import _cloneDeep from 'lodash/cloneDeep'
import _sortBy from 'lodash/sortBy'
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

import { Motion, TransitionMotion, spring } from 'react-motion'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withProps from 'recompose/withProps'
import pure from 'recompose/pure'
import { partition as Partition, hierarchy } from 'd3-hierarchy'
import { arc } from 'd3-shape'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { withTheme, withDimensions, withColors } from '../../../hocs'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import SunburstArc from './SunburstArc'

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

    return React.createElement(Container, { isInteractive: isInteractive, theme: theme }, function(
        _ref2
    ) {
        var showTooltip = _ref2.showTooltip,
            hideTooltip = _ref2.hideTooltip
        return React.createElement(
            SvgWrapper,
            { width: outerWidth, height: outerHeight, margin: margin },
            React.createElement(
                'g',
                { transform: 'translate(' + centerX + ', ' + centerY + ')' },
                nodes
                    .filter(function(node) {
                        return node.depth > 0
                    })
                    .map(function(node, i) {
                        return React.createElement(SunburstArc, {
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
    })
}

Sunburst.propTypes = {
    data: PropTypes.object.isRequired,
    identity: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getIdentity: PropTypes.func.isRequired, // computed
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    getValue: PropTypes.func.isRequired, // computed
    nodes: PropTypes.array.isRequired, // computed

    partition: PropTypes.func.isRequired, // computed

    cornerRadius: PropTypes.number.isRequired,
    arcGenerator: PropTypes.func.isRequired, // computed

    radius: PropTypes.number.isRequired, // computed
    centerX: PropTypes.number.isRequired, // computed
    centerY: PropTypes.number.isRequired, // computed

    // border
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    childColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,

    // interactivity
    isInteractive: PropTypes.bool,
}

export var SunburstDefaultProps = {
    identity: 'id',
    value: 'value',

    cornerRadius: 0,

    // border
    borderWidth: 1,
    borderColor: 'white',

    childColor: 'inherit',

    // interactivity
    isInteractive: true,
}

var enhance = compose(
    defaultProps(SunburstDefaultProps),
    withTheme(),
    withDimensions(),
    withColors(),
    withProps(function(_ref3) {
        var width = _ref3.width,
            height = _ref3.height

        var radius = Math.min(width, height) / 2

        var partition = Partition().size([2 * Math.PI, radius * radius])

        return { radius: radius, partition: partition, centerX: width / 2, centerY: height / 2 }
    }),
    withPropsOnChange(['cornerRadius'], function(_ref4) {
        var cornerRadius = _ref4.cornerRadius
        return {
            arcGenerator: arc()
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
    withPropsOnChange(['identity'], function(_ref5) {
        var identity = _ref5.identity
        return {
            getIdentity: getAccessorFor(identity),
        }
    }),
    withPropsOnChange(['value'], function(_ref6) {
        var value = _ref6.value
        return {
            getValue: getAccessorFor(value),
        }
    }),
    withPropsOnChange(['data', 'getValue'], function(_ref7) {
        var data = _ref7.data,
            getValue = _ref7.getValue
        return {
            data: hierarchy(data).sum(getValue),
        }
    }),
    withPropsOnChange(['childColor'], function(_ref8) {
        var childColor = _ref8.childColor
        return {
            getChildColor: getInheritedColorGenerator(childColor),
        }
    }),
    withPropsOnChange(['data', 'partition', 'getIdentity', 'getChildColor'], function(_ref9) {
        var data = _ref9.data,
            partition = _ref9.partition,
            getIdentity = _ref9.getIdentity,
            getColor = _ref9.getColor,
            getChildColor = _ref9.getChildColor

        var total = data.value

        var nodes = _sortBy(partition(_cloneDeep(data)).descendants(), 'depth')
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
    }),
    pure
)

var enhancedSunburst = enhance(Sunburst)
enhancedSunburst.displayName = 'enhance(Sunburst)'

export default enhancedSunburst
