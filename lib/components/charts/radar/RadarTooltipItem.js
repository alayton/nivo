'use strict'

exports.__esModule = true

var _sortBy2 = require('lodash/sortBy')

var _sortBy3 = _interopRequireDefault(_sortBy2)

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

var _polar = require('../../../lib/polar')

var _TableTooltip = require('../../tooltip/TableTooltip')

var _TableTooltip2 = _interopRequireDefault(_TableTooltip)

var _Chip = require('../../tooltip/Chip')

var _Chip2 = _interopRequireDefault(_Chip)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var RadarTooltipItem = function RadarTooltipItem(_ref) {
    var path = _ref.path,
        tipX = _ref.tipX,
        tipY = _ref.tipY,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        isHover = _ref.isHover
    return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('line', {
            x1: 0,
            y1: 0,
            x2: tipX,
            y2: tipY,
            stroke: '#000',
            strokeOpacity: isHover ? 0.35 : 0,
        }),
        _react2.default.createElement('path', {
            d: path,
            fill: '#F00',
            fillOpacity: 0,
            onMouseEnter: showTooltip,
            onMouseMove: showTooltip,
            onMouseLeave: hideTooltip,
        })
    )
}

RadarTooltipItem.propTypes = {
    datum: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array])
        .isRequired,
    keys: _propTypes2.default.arrayOf(
        _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
    ).isRequired,
    index: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
        .isRequired,
    colorByKey: _propTypes2.default.object.isRequired,

    startAngle: _propTypes2.default.number.isRequired,
    endAngle: _propTypes2.default.number.isRequired,
    radius: _propTypes2.default.number.isRequired,
    tipX: _propTypes2.default.number.isRequired, // computed
    tipY: _propTypes2.default.number.isRequired, // computed

    arcGenerator: _propTypes2.default.func.isRequired, // computed
    path: _propTypes2.default.string.isRequired, // computed

    theme: _propTypes2.default.object.isRequired,

    showTooltip: _propTypes2.default.func.isRequired, // re-computed
    hideTooltip: _propTypes2.default.func.isRequired, // re-computed

    isHover: _propTypes2.default.bool.isRequired, // computed
}

var enhance = (0, _compose2.default)(
    (0, _withState2.default)('isHover', 'setIsHover', false),
    (0, _withPropsOnChange2.default)(['datum', 'keys', 'index', 'colorByKey', 'theme'], function(
        _ref2
    ) {
        var datum = _ref2.datum,
            keys = _ref2.keys,
            index = _ref2.index,
            colorByKey = _ref2.colorByKey,
            theme = _ref2.theme
        return {
            tooltip: _react2.default.createElement(_TableTooltip2.default, {
                title: _react2.default.createElement('strong', null, index),
                rows: (0, _sortBy3.default)(
                    keys.map(function(key) {
                        return [
                            _react2.default.createElement(_Chip2.default, {
                                color: colorByKey[key],
                            }),
                            key,
                            datum[key],
                        ]
                    }),
                    '2'
                ).reverse(),
                theme: theme,
            }),
        }
    }),
    (0, _withPropsOnChange2.default)(['startAngle', 'endAngle', 'radius', 'arcGenerator'], function(
        _ref3
    ) {
        var startAngle = _ref3.startAngle,
            endAngle = _ref3.endAngle,
            radius = _ref3.radius,
            arcGenerator = _ref3.arcGenerator

        var position = (0, _polar.positionFromAngle)(
            startAngle + (endAngle - startAngle) * 0.5 - Math.PI / 2,
            radius
        )

        return {
            path: arcGenerator({ startAngle: startAngle, endAngle: endAngle }),
            tipX: position.x,
            tipY: position.y,
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

exports.default = enhance(RadarTooltipItem)
