'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _withState = require('recompose/withState')

var _withState2 = _interopRequireDefault(_withState)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _withHandlers = require('recompose/withHandlers')

var _withHandlers2 = _interopRequireDefault(_withHandlers)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _BasicTooltip = require('../../tooltip/BasicTooltip')

var _BasicTooltip2 = _interopRequireDefault(_BasicTooltip)

var _Chip = require('../../tooltip/Chip')

var _Chip2 = _interopRequireDefault(_Chip)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

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
} /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */

var TooltipContent = function TooltipContent(_ref) {
    var link = _ref.link
    return _react2.default.createElement(
        'span',
        { style: tooltipStyles.container },
        _react2.default.createElement(_Chip2.default, {
            color: link.source.color,
            style: tooltipStyles.sourceChip,
        }),
        _react2.default.createElement('strong', null, link.source.id),
        '\xA0>\xA0',
        _react2.default.createElement('strong', null, link.target.id),
        _react2.default.createElement(_Chip2.default, {
            color: link.target.color,
            style: tooltipStyles.targetChip,
        }),
        _react2.default.createElement('strong', null, link.value)
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
    return _react2.default.createElement('path', {
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
    link: _propTypes2.default.shape({
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
        color: _propTypes2.default.string.isRequired,
        value: _propTypes2.default.number.isRequired,
    }).isRequired,

    path: _propTypes2.default.string.isRequired,
    width: _propTypes2.default.number.isRequired,
    color: _propTypes2.default.string.isRequired,
    opacity: _propTypes2.default.number.isRequired,
    hoverOpacity: _propTypes2.default.number.isRequired,
    contract: _propTypes2.default.number.isRequired,

    theme: _propTypes2.default.object.isRequired,

    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,
}

var enhance = (0, _compose2.default)(
    (0, _withState2.default)('isHover', 'setIsHover', false),
    (0, _withPropsOnChange2.default)(['link', 'theme'], function(_ref3) {
        var link = _ref3.link,
            theme = _ref3.theme
        return {
            tooltip: _react2.default.createElement(_BasicTooltip2.default, {
                id: _react2.default.createElement(TooltipContent, { link: link }),
                theme: theme,
            }),
        }
    }),
    (0, _withHandlers2.default)({
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
    _pure2.default
)

exports.default = enhance(SankeyLinksItem)
