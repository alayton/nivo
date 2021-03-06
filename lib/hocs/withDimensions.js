'use strict'

exports.__esModule = true

var _isEqual2 = require('lodash/isEqual')

var _isEqual3 = _interopRequireDefault(_isEqual2)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _setPropTypes = require('recompose/setPropTypes')

var _setPropTypes2 = _interopRequireDefault(_setPropTypes)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _props = require('../props')

var _defaults = require('../defaults')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * This HOC watch width, height & margin props change
 * and returns new width/height plus outer dimensions.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 * It also add required propTypes & set default margin.
 */
exports.default = function() {
    return (0, _compose2.default)(
        (0, _defaultProps2.default)({
            margin: _defaults.defaultMargin,
        }),
        (0, _setPropTypes2.default)({
            width: _propTypes2.default.number.isRequired,
            height: _propTypes2.default.number.isRequired,
            margin: _props.marginPropType,
        }),
        (0, _withPropsOnChange2.default)(
            function(props, nextProps) {
                return (
                    props.width !== nextProps.width ||
                    props.height !== nextProps.height ||
                    !(0, _isEqual3.default)(props.margin, nextProps.margin)
                )
            },
            function(props) {
                var margin = Object.assign({}, _defaults.defaultMargin, props.margin)

                return {
                    margin: margin,
                    width: props.width - margin.left - margin.right,
                    height: props.height - margin.top - margin.bottom,
                    outerWidth: props.width,
                    outerHeight: props.height,
                }
            }
        )
    )
} /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */
