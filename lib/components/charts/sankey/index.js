'use strict'

exports.__esModule = true

var _Sankey = require('./Sankey')

Object.defineProperty(exports, 'Sankey', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Sankey).default
    },
})
Object.keys(_Sankey).forEach(function(key) {
    if (key === 'default' || key === '__esModule') return
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _Sankey[key]
        },
    })
})

var _ResponsiveSankey = require('./ResponsiveSankey')

Object.defineProperty(exports, 'ResponsiveSankey', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_ResponsiveSankey).default
    },
})

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}
