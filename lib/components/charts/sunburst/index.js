'use strict'

exports.__esModule = true

var _Sunburst = require('./Sunburst')

Object.defineProperty(exports, 'Sunburst', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Sunburst).default
    },
})
Object.keys(_Sunburst).forEach(function(key) {
    if (key === 'default' || key === '__esModule') return
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _Sunburst[key]
        },
    })
})

var _ResponsiveSunburst = require('./ResponsiveSunburst')

Object.defineProperty(exports, 'ResponsiveSunburst', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_ResponsiveSunburst).default
    },
})

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}
