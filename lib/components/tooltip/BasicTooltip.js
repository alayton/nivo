'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _Chip = require('./Chip')

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
var chipStyle = { marginRight: 7 }

var BasicTooltip = function BasicTooltip(_ref) {
    var id = _ref.id,
        value = _ref.value,
        enableChip = _ref.enableChip,
        color = _ref.color,
        theme = _ref.theme
    return _react2.default.createElement(
        'div',
        { style: theme.tooltip.container },
        _react2.default.createElement(
            'div',
            { style: theme.tooltip.basic },
            enableChip &&
                _react2.default.createElement(_Chip2.default, { color: color, style: chipStyle }),
            value !== undefined
                ? _react2.default.createElement(
                      'span',
                      null,
                      id,
                      ': ',
                      _react2.default.createElement('strong', null, value)
                  )
                : id
        )
    )
}

BasicTooltip.propTypes = {
    id: _propTypes2.default.node.isRequired,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    enableChip: _propTypes2.default.bool.isRequired,
    color: _propTypes2.default.string,

    theme: _propTypes2.default.shape({
        tooltip: _propTypes2.default.shape({
            container: _propTypes2.default.object.isRequired,
            basic: _propTypes2.default.object.isRequired,
        }).isRequired,
    }).isRequired,
}

BasicTooltip.defaultProps = {
    enableChip: false,
}

exports.default = (0, _pure2.default)(BasicTooltip)
