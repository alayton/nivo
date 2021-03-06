'use strict'

exports.__esModule = true

var _directions = require('./directions')

Object.keys(_directions).forEach(function(key) {
    if (key === 'default' || key === '__esModule') return
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _directions[key]
        },
    })
})
