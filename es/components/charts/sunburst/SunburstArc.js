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

var SunburstArc = function SunburstArc(_ref) {
    var node = _ref.node,
        path = _ref.path,
        borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip
    return React.createElement('path', {
        d: path,
        fill: node.data.color,
        stroke: borderColor,
        strokeWidth: borderWidth,
        onMouseEnter: showTooltip,
        onMouseMove: showTooltip,
        onMouseLeave: hideTooltip,
    })
}

SunburstArc.propTypes = {
    node: PropTypes.shape({}).isRequired,
    arcGenerator: PropTypes.func.isRequired,
    borderWidth: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
}

var enhance = compose(
    withPropsOnChange(['node', 'arcGenerator'], function(_ref2) {
        var node = _ref2.node,
            arcGenerator = _ref2.arcGenerator
        return {
            path: arcGenerator(node),
        }
    }),
    withPropsOnChange(['node', 'showTooltip', 'theme'], function(_ref3) {
        var node = _ref3.node,
            _showTooltip = _ref3.showTooltip,
            theme = _ref3.theme
        return {
            showTooltip: function showTooltip(e) {
                _showTooltip(
                    React.createElement(BasicTooltip, {
                        id: node.data.id,
                        enableChip: true,
                        color: node.data.color,
                        value: node.data.percentage.toFixed(2) + '%',
                        theme: theme,
                    }),
                    e
                )
            },
        }
    }),
    pure
)

export default enhance(SunburstArc)
