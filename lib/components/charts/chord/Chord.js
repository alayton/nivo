'use strict'

exports.__esModule = true

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

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _enhance = require('./enhance')

var _enhance2 = _interopRequireDefault(_enhance)

var _props = require('./props')

var _ChordRibbons = require('./ChordRibbons')

var _ChordRibbons2 = _interopRequireDefault(_ChordRibbons)

var _ChordArcs = require('./ChordArcs')

var _ChordArcs2 = _interopRequireDefault(_ChordArcs)

var _ChordLabels = require('./ChordLabels')

var _ChordLabels2 = _interopRequireDefault(_ChordLabels)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

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
                    _react2.default.createElement(
                        _ChordRibbons2.default,
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
                    _react2.default.createElement(
                        _ChordArcs2.default,
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
                        _react2.default.createElement(
                            _ChordLabels2.default,
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
        }
    )
}

Chord.propTypes = _props.ChordPropTypes

exports.default = (0, _enhance2.default)(Chord)
