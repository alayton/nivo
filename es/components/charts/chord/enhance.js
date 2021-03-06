/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { arc as d3Arc } from 'd3-shape'
import { chord as d3Chord, ribbon as d3Ribbon } from 'd3-chord'
import { getInheritedColorGenerator, getColorRange } from '../../../lib/colors'
import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { withMotion, withTheme, withDimensions } from '../../../hocs'
import { ChordDefaultProps } from './props'

export default (function(Component) {
    return compose(
        defaultProps(ChordDefaultProps),
        withState('currentArc', 'setCurrentArc', null),
        withState('currentRibbon', 'setCurrentRibbon', null),
        withMotion(),
        withTheme(),
        withDimensions(),
        withPropsOnChange(['label'], function(_ref) {
            var label = _ref.label
            return {
                getLabel: getLabelGenerator(label),
            }
        }),
        withPropsOnChange(['padAngle'], function(_ref2) {
            var padAngle = _ref2.padAngle
            return {
                chord: d3Chord().padAngle(padAngle),
            }
        }),
        withPropsOnChange(['labelTextColor'], function(_ref3) {
            var labelTextColor = _ref3.labelTextColor
            return {
                getLabelTextColor: getInheritedColorGenerator(labelTextColor, 'labels.textColor'),
            }
        }),
        withPropsOnChange(['colors', 'keys'], function(_ref4) {
            var colors = _ref4.colors,
                keys = _ref4.keys

            var color = getColorRange(colors)

            return {
                colorById: keys.reduce(function(acc, key) {
                    acc[key] = color(key)
                    return acc
                }, {}),
            }
        }),
        withPropsOnChange(['width', 'height', 'innerRadiusRatio', 'innerRadiusOffset'], function(
            _ref5
        ) {
            var width = _ref5.width,
                height = _ref5.height,
                innerRadiusRatio = _ref5.innerRadiusRatio,
                innerRadiusOffset = _ref5.innerRadiusOffset

            var radius = Math.min(width, height) / 2
            var innerRadius = radius * innerRadiusRatio
            var ribbonRadius = radius * (innerRadiusRatio - innerRadiusOffset)

            var arcGenerator = d3Arc()
                .outerRadius(radius)
                .innerRadius(innerRadius)
            var ribbonGenerator = d3Ribbon().radius(ribbonRadius)

            return {
                radius: radius,
                innerRadius: innerRadius,
                arcGenerator: arcGenerator,
                ribbonGenerator: ribbonGenerator,
            }
        }),
        withPropsOnChange(['arcOpacity', 'ribbonOpacity'], function(_ref6) {
            var arcOpacity = _ref6.arcOpacity,
                ribbonOpacity = _ref6.ribbonOpacity
            return {
                getArcOpacity: function getArcOpacity() {
                    return arcOpacity
                },
                getRibbonOpacity: function getRibbonOpacity() {
                    return ribbonOpacity
                },
            }
        }),
        withPropsOnChange(
            [
                'isInteractive',
                'currentArc',
                'arcHoverOpacity',
                'arcHoverOthersOpacity',
                'currentRibbon',
                'ribbonHoverOpacity',
                'ribbonHoverOthersOpacity',
            ],
            function(_ref7) {
                var isInteractive = _ref7.isInteractive,
                    currentArc = _ref7.currentArc,
                    arcHoverOpacity = _ref7.arcHoverOpacity,
                    arcHoverOthersOpacity = _ref7.arcHoverOthersOpacity,
                    currentRibbon = _ref7.currentRibbon,
                    ribbonHoverOpacity = _ref7.ribbonHoverOpacity,
                    ribbonHoverOthersOpacity = _ref7.ribbonHoverOthersOpacity

                if (!isInteractive || (!currentArc && !currentRibbon)) return null

                var getArcOpacity = void 0
                var getRibbonOpacity = void 0
                if (isInteractive) {
                    if (currentArc) {
                        getArcOpacity = function getArcOpacity(arc) {
                            if (arc.id === currentArc.id) return arcHoverOpacity
                            return arcHoverOthersOpacity
                        }
                        getRibbonOpacity = function getRibbonOpacity(ribbon) {
                            if (
                                ribbon.source.id === currentArc.id ||
                                ribbon.target.id === currentArc.id
                            )
                                return ribbonHoverOpacity
                            return ribbonHoverOthersOpacity
                        }
                    } else if (currentRibbon) {
                        getArcOpacity = function getArcOpacity(arc) {
                            if (
                                arc.id === currentRibbon.source.id ||
                                arc.id === currentRibbon.target.id
                            )
                                return arcHoverOpacity
                            return arcHoverOthersOpacity
                        }
                        getRibbonOpacity = function getRibbonOpacity(ribbon) {
                            if (
                                ribbon.source.id === currentRibbon.source.id &&
                                ribbon.target.id === currentRibbon.target.id
                            )
                                return ribbonHoverOpacity
                            return ribbonHoverOthersOpacity
                        }
                    }
                }

                return { getArcOpacity: getArcOpacity, getRibbonOpacity: getRibbonOpacity }
            }
        ),
        withPropsOnChange(['chord', 'colorById', 'matrix', 'keys'], function(_ref8) {
            var chord = _ref8.chord,
                colorById = _ref8.colorById,
                matrix = _ref8.matrix,
                keys = _ref8.keys

            var ribbons = chord(matrix)
            ribbons.forEach(function(ribbon) {
                ribbon.source.id = keys[ribbon.source.index]
                ribbon.source.color = colorById[ribbon.source.id]
                ribbon.target.id = keys[ribbon.target.index]
                ribbon.target.color = colorById[ribbon.target.id]
                var ribbonKeys = [ribbon.source.id, ribbon.target.id]
                ribbonKeys.sort()
                ribbon.key = ribbonKeys.sort().join('.')
            })

            var arcs = ribbons.groups.map(function(arc) {
                arc.key = arc.id = keys[arc.index]
                arc.color = colorById[arc.id]
                return arc
            })

            return { ribbons: ribbons, arcs: arcs }
        }),
        pure
    )(Component)
})
