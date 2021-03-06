'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _d3Shape = require('d3-shape')

var _RadarTooltipItem = require('./RadarTooltipItem')

var _RadarTooltipItem2 = _interopRequireDefault(_RadarTooltipItem)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var RadarTooltip = function RadarTooltip(_ref) {
    var data = _ref.data,
        keys = _ref.keys,
        getIndex = _ref.getIndex,
        colorByKey = _ref.colorByKey,
        radius = _ref.radius,
        angleStep = _ref.angleStep,
        theme = _ref.theme,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip

    var arc = (0, _d3Shape.arc)()
        .outerRadius(radius)
        .innerRadius(0)

    var halfAngleStep = angleStep * 0.5
    var rootStartAngle = -halfAngleStep

    return _react2.default.createElement(
        'g',
        null,
        data.map(function(d, i) {
            var index = getIndex(d)
            var startAngle = rootStartAngle
            var endAngle = startAngle + angleStep

            rootStartAngle += angleStep

            return _react2.default.createElement(_RadarTooltipItem2.default, {
                key: index,
                datum: d,
                keys: keys,
                index: index,
                colorByKey: colorByKey,
                startAngle: startAngle,
                endAngle: endAngle,
                radius: radius,
                arcGenerator: arc,
                theme: theme,
                showTooltip: showTooltip,
                hideTooltip: hideTooltip,
            })
        })
    )
} /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */

RadarTooltip.propTypes = {
    data: _propTypes2.default.array.isRequired,
    keys: _propTypes2.default.arrayOf(
        _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
    ).isRequired,
    getIndex: _propTypes2.default.func.isRequired,
    colorByKey: _propTypes2.default.object.isRequired,

    radius: _propTypes2.default.number.isRequired,
    angleStep: _propTypes2.default.number.isRequired,

    theme: _propTypes2.default.object.isRequired,

    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,
}

exports.default = (0, _pure2.default)(RadarTooltip)
