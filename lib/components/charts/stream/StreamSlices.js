'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _StreamSlicesItem = require('./StreamSlicesItem')

var _StreamSlicesItem2 = _interopRequireDefault(_StreamSlicesItem)

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
var StreamSlices = function StreamSlices(_ref) {
    var slices = _ref.slices,
        height = _ref.height,
        showTooltip = _ref.showTooltip,
        hideTooltip = _ref.hideTooltip,
        theme = _ref.theme
    return _react2.default.createElement(
        'g',
        null,
        slices.map(function(slice) {
            return _react2.default.createElement(_StreamSlicesItem2.default, {
                key: slice.index,
                slice: slice,
                height: height,
                showTooltip: showTooltip,
                hideTooltip: hideTooltip,
                theme: theme,
            })
        })
    )
}

StreamSlices.propTypes = {
    slices: _propTypes2.default.arrayOf(
        _propTypes2.default.shape({
            index: _propTypes2.default.number.isRequired,
            x: _propTypes2.default.number.isRequired,
            stack: _propTypes2.default.arrayOf(
                _propTypes2.default.shape({
                    id: _propTypes2.default.oneOfType([
                        _propTypes2.default.number,
                        _propTypes2.default.string,
                    ]).isRequired,
                    value: _propTypes2.default.oneOfType([
                        _propTypes2.default.number,
                        _propTypes2.default.string,
                    ]).isRequired,
                    color: _propTypes2.default.string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    height: _propTypes2.default.number.isRequired,
    showTooltip: _propTypes2.default.func.isRequired,
    hideTooltip: _propTypes2.default.func.isRequired,
    theme: _propTypes2.default.object.isRequired,
}

exports.default = (0, _pure2.default)(StreamSlices)
