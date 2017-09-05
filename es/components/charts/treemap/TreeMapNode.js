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
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import BasicTooltip from '../../tooltip/BasicTooltip'

var TreeMapNode = function TreeMapNode(_ref) {
    var x = _ref.x,
        y = _ref.y,
        width = _ref.width,
        height = _ref.height,
        color = _ref.color,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        hasLabel = _ref.hasLabel,
        label = _ref.label,
        labelRotation = _ref.labelRotation,
        labelTextColor = _ref.labelTextColor,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip
    return React.createElement(
        'g',
        { transform: 'translate(' + x + ',' + y + ')' },
        React.createElement('rect', {
            width: width,
            height: height,
            fill: color,
            strokeWidth: borderWidth,
            stroke: borderColor,
            onMouseEnter: showTooltip,
            onMouseMove: showTooltip,
            onMouseLeave: hideTooltip,
        }),
        hasLabel &&
            React.createElement(
                'text',
                {
                    textAnchor: 'middle',
                    alignmentBaseline: 'central',
                    style: { fill: labelTextColor, pointerEvents: 'none' },
                    transform:
                        'translate(' +
                        width / 2 +
                        ',' +
                        height / 2 +
                        ') rotate(' +
                        labelRotation +
                        ')',
                },
                label
            )
    )
}

TreeMapNode.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    dataColor: PropTypes.string.isRequired,

    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,

    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,

    hasLabel: PropTypes.bool.isRequired,
    label: PropTypes.node,
    orientLabel: PropTypes.bool.isRequired,
    labelRotation: PropTypes.number.isRequired, // computed
    labelTextColor: PropTypes.string.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,

    theme: PropTypes.object.isRequired,
}

var enhance = compose(
    withPropsOnChange(['orientLabel', 'width', 'height'], function(_ref2) {
        var orientLabel = _ref2.orientLabel,
            width = _ref2.width,
            height = _ref2.height
        return {
            labelRotation: orientLabel && height > width ? -90 : 0,
        }
    }),
    withPropsOnChange(['id', 'value', 'dataColor', 'showTooltip', 'theme'], function(_ref3) {
        var id = _ref3.id,
            value = _ref3.value,
            dataColor = _ref3.dataColor,
            _showTooltip = _ref3.showTooltip,
            theme = _ref3.theme

        var tooltip = React.createElement(BasicTooltip, {
            id: id,
            value: value,
            enableChip: true,
            color: dataColor,
            theme: theme,
        })

        return {
            showTooltip: function showTooltip(e) {
                return _showTooltip(tooltip, e)
            },
        }
    }),
    pure
)

export default enhance(TreeMapNode)
