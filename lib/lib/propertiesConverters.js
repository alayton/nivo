'use strict'

exports.__esModule = true
exports.getAccessorFor = exports.getLabelGenerator = undefined

var _get2 = require('lodash/get')

var _get3 = _interopRequireDefault(_get2)

var _isFunction2 = require('lodash/isFunction')

var _isFunction3 = _interopRequireDefault(_isFunction2)

var _d3Format = require('d3-format')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var getLabelGenerator = (exports.getLabelGenerator = function getLabelGenerator(
    _label,
    labelFormat
) {
    if ((0, _isFunction3.default)(_label)) {
        return _label
    }

    var label = function label(d) {
        return (0, _get3.default)(d, _label)
    }

    var formatter = void 0
    if (labelFormat) {
        formatter = (0, _d3Format.format)(labelFormat)
    }

    return function(data) {
        var labelOutput = label(data)

        if (formatter) {
            labelOutput = formatter(labelOutput)
        }

        return labelOutput
    }
}) /*
    * This file is part of the nivo project.
    *
    * Copyright 2016-present, Raphaël Benitte.
    *
    * For the full copyright and license information, please view the LICENSE
    * file that was distributed with this source code.
    */
var getAccessorFor = (exports.getAccessorFor = function getAccessorFor(directive) {
    return (0, _isFunction3.default)(directive)
        ? directive
        : function(d) {
              return d[directive]
          }
})
