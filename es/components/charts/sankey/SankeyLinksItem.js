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
import withState from 'recompose/withState'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withHandlers from 'recompose/withHandlers'
import pure from 'recompose/pure'
import BasicTooltip from '../../tooltip/BasicTooltip'
import Chip from '../../tooltip/Chip'

var tooltipStyles = {
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    sourceChip: {
        marginRight: 7,
    },
    targetChip: {
        marginLeft: 7,
        marginRight: 7,
    },
}

var TooltipContent = function TooltipContent(_ref) {
    var link = _ref.link
    return React.createElement(
        'span',
        { style: tooltipStyles.container },
        React.createElement(Chip, { color: link.source.color, style: tooltipStyles.sourceChip }),
        React.createElement('strong', null, link.source.id),
        '\xA0>\xA0',
        React.createElement('strong', null, link.target.id),
        React.createElement(Chip, { color: link.target.color, style: tooltipStyles.targetChip }),
        React.createElement('strong', null, link.value)
    )
}

var SankeyLinksItem = function SankeyLinksItem(_ref2) {
    var link = _ref2.link,
        path = _ref2.path,
        width = _ref2.width,
        color = _ref2.color,
        opacity = _ref2.opacity,
        hoverOpacity = _ref2.hoverOpacity,
        contract = _ref2.contract,
        showTooltip = _ref2.showTooltip,
        hideTooltip = _ref2.hideTooltip,
        isHover = _ref2.isHover
    return React.createElement('path', {
        fill: 'none',
        d: path,
        strokeWidth: Math.max(1, width - contract * 2),
        stroke: color,
        strokeOpacity: isHover ? hoverOpacity : opacity,
        onMouseEnter: showTooltip,
        onMouseMove: showTooltip,
        onMouseLeave: hideTooltip,
    })
}

SankeyLinksItem.propTypes = {
    link: PropTypes.shape({
        source: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }).isRequired,
        target: PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }).isRequired,
        color: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,

    path: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    hoverOpacity: PropTypes.number.isRequired,
    contract: PropTypes.number.isRequired,

    theme: PropTypes.object.isRequired,

    showTooltip: PropTypes.func.isRequired,
    hideTooltip: PropTypes.func.isRequired,
}

var enhance = compose(
    withState('isHover', 'setIsHover', false),
    withPropsOnChange(['link', 'theme'], function(_ref3) {
        var link = _ref3.link,
            theme = _ref3.theme
        return {
            tooltip: React.createElement(BasicTooltip, {
                id: React.createElement(TooltipContent, { link: link }),
                theme: theme,
            }),
        }
    }),
    withHandlers({
        showTooltip: function showTooltip(_ref4) {
            var _showTooltip = _ref4.showTooltip,
                setIsHover = _ref4.setIsHover,
                tooltip = _ref4.tooltip
            return function(e) {
                setIsHover(true)
                _showTooltip(tooltip, e)
            }
        },
        hideTooltip: function hideTooltip(_ref5) {
            var _hideTooltip = _ref5.hideTooltip,
                setIsHover = _ref5.setIsHover
            return function() {
                setIsHover(false)
                _hideTooltip()
            }
        },
    }),
    pure
)

export default enhance(SankeyLinksItem)
