'use strict'

exports.__esModule = true

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _withState = require('recompose/withState')

var _withState2 = _interopRequireDefault(_withState)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _d3Shape = require('d3-shape')

var _d3Chord = require('d3-chord')

var _colors = require('../../../lib/colors')

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _hocs = require('../../../hocs')

var _props = require('./props')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

exports.default = function(Component) {
    return (0, _compose2.default)(
        (0, _defaultProps2.default)(_props.ChordDefaultProps),
        (0, _withState2.default)('currentArc', 'setCurrentArc', null),
        (0, _withState2.default)('currentRibbon', 'setCurrentRibbon', null),
        (0, _hocs.withMotion)(),
        (0, _hocs.withTheme)(),
        (0, _hocs.withDimensions)(),
        (0, _withPropsOnChange2.default)(['label'], function(_ref) {
            var label = _ref.label
            return {
                getLabel: (0, _propertiesConverters.getLabelGenerator)(label),
            }
        }),
        (0, _withPropsOnChange2.default)(['padAngle'], function(_ref2) {
            var padAngle = _ref2.padAngle
            return {
                chord: (0, _d3Chord.chord)().padAngle(padAngle),
            }
        }),
        (0, _withPropsOnChange2.default)(['labelTextColor'], function(_ref3) {
            var labelTextColor = _ref3.labelTextColor
            return {
                getLabelTextColor: (0, _colors.getInheritedColorGenerator)(
                    labelTextColor,
                    'labels.textColor'
                ),
            }
        }),
        (0, _withPropsOnChange2.default)(['colors', 'keys'], function(_ref4) {
            var colors = _ref4.colors,
                keys = _ref4.keys

            var color = (0, _colors.getColorRange)(colors)

            return {
                colorById: keys.reduce(function(acc, key) {
                    acc[key] = color(key)
                    return acc
                }, {}),
            }
        }),
        (0, _withPropsOnChange2.default)(
            ['width', 'height', 'innerRadiusRatio', 'innerRadiusOffset'],
            function(_ref5) {
                var width = _ref5.width,
                    height = _ref5.height,
                    innerRadiusRatio = _ref5.innerRadiusRatio,
                    innerRadiusOffset = _ref5.innerRadiusOffset

                var radius = Math.min(width, height) / 2
                var innerRadius = radius * innerRadiusRatio
                var ribbonRadius = radius * (innerRadiusRatio - innerRadiusOffset)

                var arcGenerator = (0, _d3Shape.arc)()
                    .outerRadius(radius)
                    .innerRadius(innerRadius)
                var ribbonGenerator = (0, _d3Chord.ribbon)().radius(ribbonRadius)

                return {
                    radius: radius,
                    innerRadius: innerRadius,
                    arcGenerator: arcGenerator,
                    ribbonGenerator: ribbonGenerator,
                }
            }
        ),
        (0, _withPropsOnChange2.default)(['arcOpacity', 'ribbonOpacity'], function(_ref6) {
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
        (0, _withPropsOnChange2.default)(
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
        (0, _withPropsOnChange2.default)(['chord', 'colorById', 'matrix', 'keys'], function(_ref8) {
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
        _pure2.default
    )(Component)
} /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */
