'use strict'

exports.__esModule = true

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _hocs = require('../../../hocs')

var _colors = require('../../../lib/colors')

var _propertiesConverters = require('../../../lib/propertiesConverters')

var _props = require('./props')

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
exports.default = function(Component) {
    return (0, _compose2.default)(
        (0, _defaultProps2.default)(_props.BarDefaultProps),
        (0, _hocs.withTheme)(),
        (0, _hocs.withColors)(),
        (0, _hocs.withDimensions)(),
        (0, _hocs.withMotion)(),
        (0, _withPropsOnChange2.default)(['indexBy'], function(_ref) {
            var indexBy = _ref.indexBy
            return {
                getIndex: (0, _propertiesConverters.getAccessorFor)(indexBy),
            }
        }),
        (0, _withPropsOnChange2.default)(['labelsTextColor'], function(_ref2) {
            var labelsTextColor = _ref2.labelsTextColor
            return {
                getLabelsTextColor: (0, _colors.getInheritedColorGenerator)(
                    labelsTextColor,
                    'axis.textColor'
                ),
            }
        }),
        (0, _withPropsOnChange2.default)(['labelsLinkColor'], function(_ref3) {
            var labelsLinkColor = _ref3.labelsLinkColor
            return {
                getLabelsLinkColor: (0, _colors.getInheritedColorGenerator)(
                    labelsLinkColor,
                    'axis.tickColor'
                ),
            }
        }),
        _pure2.default
    )(Component)
}
