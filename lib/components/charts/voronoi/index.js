'use strict'

exports.__esModule = true

var _Voronoi = require('./Voronoi')

Object.defineProperty(exports, 'Voronoi', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Voronoi).default
    },
})

var _ResponsiveVoronoi = require('./ResponsiveVoronoi')

Object.defineProperty(exports, 'ResponsiveVoronoi', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_ResponsiveVoronoi).default
    },
})

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}
