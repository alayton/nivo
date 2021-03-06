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
import Container from '../Container'
import SvgWrapper from '../SvgWrapper'
import enhance from './enhance'
import { ChordPropTypes } from './props'
import ChordRibbons from './ChordRibbons'
import ChordArcs from './ChordArcs'
import ChordLabels from './ChordLabels'

var Chord = function Chord(_ref) {
    var margin = _ref.margin,
        width = _ref.width,
        height = _ref.height,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        arcBorderWidth = _ref.arcBorderWidth,
        ribbonBorderWidth = _ref.ribbonBorderWidth,
        enableLabels = _ref.enableLabels,
        getLabel = _ref.getLabel,
        labelOffset = _ref.labelOffset,
        labelRotation = _ref.labelRotation,
        getLabelTextColor = _ref.getLabelTextColor,
        arcGenerator = _ref.arcGenerator,
        ribbonGenerator = _ref.ribbonGenerator,
        theme = _ref.theme,
        isInteractive = _ref.isInteractive,
        animate = _ref.animate,
        motionDamping = _ref.motionDamping,
        motionStiffness = _ref.motionStiffness,
        ribbons = _ref.ribbons,
        arcs = _ref.arcs,
        radius = _ref.radius,
        setCurrentArc = _ref.setCurrentArc,
        setCurrentRibbon = _ref.setCurrentRibbon,
        getArcOpacity = _ref.getArcOpacity,
        getRibbonOpacity = _ref.getRibbonOpacity

    var centerX = width / 2
    var centerY = height / 2

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
                'g',
                { transform: 'translate(' + centerX + ', ' + centerY + ')' },
                React.createElement(
                    ChordRibbons,
                    _extends(
                        {
                            ribbons: ribbons,
                            shapeGenerator: ribbonGenerator,
                            borderWidth: ribbonBorderWidth,
                            getOpacity: getRibbonOpacity,
                            setCurrent: setCurrentRibbon,
                            theme: theme,
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip,
                        },
                        motionProps
                    )
                ),
                React.createElement(
                    ChordArcs,
                    _extends(
                        {
                            arcs: arcs,
                            shapeGenerator: arcGenerator,
                            borderWidth: arcBorderWidth,
                            getOpacity: getArcOpacity,
                            setCurrent: setCurrentArc,
                            theme: theme,
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip,
                        },
                        motionProps
                    )
                ),
                enableLabels &&
                    React.createElement(
                        ChordLabels,
                        _extends(
                            {
                                arcs: arcs,
                                radius: radius + labelOffset,
                                rotation: labelRotation,
                                getLabel: getLabel,
                                getColor: getLabelTextColor,
                                theme: theme,
                            },
                            motionProps
                        )
                    )
            )
        )
    })
}

Chord.propTypes = ChordPropTypes

export default enhance(Chord)
