'use strict'

exports.__esModule = true

var _HeatMap = require('./HeatMap')

Object.defineProperty(exports, 'HeatMap', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_HeatMap).default
    },
})

var _HeatMapCanvas = require('./HeatMapCanvas')

Object.defineProperty(exports, 'HeatMapCanvas', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_HeatMapCanvas).default
    },
})

var _ResponsiveHeatMap = require('./ResponsiveHeatMap')

Object.defineProperty(exports, 'ResponsiveHeatMap', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_ResponsiveHeatMap).default
    },
})

var _ResponsiveHeatMapCanvas = require('./ResponsiveHeatMapCanvas')

Object.defineProperty(exports, 'ResponsiveHeatMapCanvas', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_ResponsiveHeatMapCanvas).default
    },
})

var _props = require('./props')

Object.keys(_props).forEach(function(key) {
    if (key === 'default' || key === '__esModule') return
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _props[key]
        },
    })
})

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}
