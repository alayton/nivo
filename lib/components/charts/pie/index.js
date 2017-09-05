'use strict'

exports.__esModule = true

var _Pie = require('./Pie')

Object.defineProperty(exports, 'Pie', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Pie).default
    },
})
Object.keys(_Pie).forEach(function(key) {
    if (key === 'default' || key === '__esModule') return
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _Pie[key]
        },
    })
})

var _ResponsivePie = require('./ResponsivePie')

Object.defineProperty(exports, 'ResponsivePie', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_ResponsivePie).default
    },
})

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}
