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

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _d3Sankey = require('d3-sankey')

var _props = require('../../../props')

var _SmartMotion = require('../../SmartMotion')

var _SmartMotion2 = _interopRequireDefault(_SmartMotion)

var _SankeyLinksItem = require('./SankeyLinksItem')

var _SankeyLinksItem2 = _interopRequireDefault(_SankeyLinksItem)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var getLinkPath = (0, _d3Sankey.sankeyLinkHorizontal)()

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
        return _react2.default.createElement(
            'g',
            null,
            links.map(function(link) {
                return _react2.default.createElement(_SankeyLinksItem2.default, {
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

    return _react2.default.createElement(
        'g',
        null,
        links.map(function(link) {
            return _react2.default.createElement(
                _SmartMotion2.default,
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
                    return _react2.default.createElement(
                        _SankeyLinksItem2.default,
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
        links: _propTypes2.default.arrayOf(
            _propTypes2.default.shape({
                source: _propTypes2.default.shape({
                    id: _propTypes2.default.oneOfType([
                        _propTypes2.default.string,
                        _propTypes2.default.number,
                    ]),
                }).isRequired,
                target: _propTypes2.default.shape({
                    id: _propTypes2.default.oneOfType([
                        _propTypes2.default.string,
                        _propTypes2.default.number,
                    ]),
                }).isRequired,
                width: _propTypes2.default.number.isRequired,
                color: _propTypes2.default.string.isRequired,
            })
        ).isRequired,

        // links
        linkOpacity: _propTypes2.default.number.isRequired,
        linkHoverOpacity: _propTypes2.default.number.isRequired,
        linkContract: _propTypes2.default.number.isRequired,

        theme: _propTypes2.default.object.isRequired,
    },
    _props.motionPropTypes,
    {
        showTooltip: _propTypes2.default.func.isRequired,
        hideTooltip: _propTypes2.default.func.isRequired,
    }
)

exports.default = (0, _pure2.default)(SankeyLinks)
