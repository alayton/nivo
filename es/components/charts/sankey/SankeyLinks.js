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
import pure from 'recompose/pure'
import { sankeyLinkHorizontal } from 'd3-sankey'
import { motionPropTypes } from '../../../props'
import SmartMotion from '../../SmartMotion'
import SankeyLinksItem from './SankeyLinksItem'

var getLinkPath = sankeyLinkHorizontal()

var SankeyLinks = function SankeyLinks(_ref) {
    var links = _ref.links,
        linkOpacity = _ref.linkOpacity,
        linkHoverOpacity = _ref.linkHoverOpacity,
        linkContract = _ref.linkContract,
        animate = _ref.animate,
        motionDamping = _ref.motionDamping,
        motionStiffness = _ref.motionStiffness,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        theme = _ref.theme

    if (animate !== true) {
        return React.createElement(
            'g',
            null,
            links.map(function(link) {
                return React.createElement(SankeyLinksItem, {
                    key: link.source.id + '.' + link.target.id,
                    link: link,
                    path: getLinkPath(link),
                    width: Math.max(1, link.width - linkContract * 2),
                    color: link.color,
                    opacity: linkOpacity,
                    hoverOpacity: linkHoverOpacity,
                    contract: linkContract,
                    showTooltip: showTooltip,
                    hideTooltip: hideTooltip,
                    theme: theme,
                })
            })
        )
    }

    var springConfig = {
        stiffness: motionStiffness,
        damping: motionDamping,
    }

    return React.createElement(
        'g',
        null,
        links.map(function(link) {
            return React.createElement(
                SmartMotion,
                {
                    key: link.source.id + '.' + link.target.id,
                    style: function style(spring) {
                        return {
                            path: spring(getLinkPath(link), springConfig),
                            width: spring(Math.max(1, link.width - linkContract * 2), springConfig),
                            color: spring(link.color, springConfig),
                            opacity: spring(linkOpacity, springConfig),
                            contract: spring(linkContract, springConfig),
                        }
                    },
                },
                function(style) {
                    return React.createElement(
                        SankeyLinksItem,
                        _extends(
                            {
                                link: link,
                            },
                            style,
                            {
                                hoverOpacity: linkHoverOpacity,
                                showTooltip: showTooltip,
                                hideTooltip: hideTooltip,
                                theme: theme,
                            }
                        )
                    )
                }
            )
        })
    )
}

SankeyLinks.propTypes = _extends(
    {
        links: PropTypes.arrayOf(
            PropTypes.shape({
                source: PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                }).isRequired,
                target: PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                }).isRequired,
                width: PropTypes.number.isRequired,
                color: PropTypes.string.isRequired,
            })
        ).isRequired,

        // links
        linkOpacity: PropTypes.number.isRequired,
        linkHoverOpacity: PropTypes.number.isRequired,
        linkContract: PropTypes.number.isRequired,

        theme: PropTypes.object.isRequired,
    },
    motionPropTypes,
    {
        showTooltip: PropTypes.func.isRequired,
        hideTooltip: PropTypes.func.isRequired,
    }
)

export default pure(SankeyLinks)
