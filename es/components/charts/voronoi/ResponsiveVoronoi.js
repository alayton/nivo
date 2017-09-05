var _extends =
    Object.assign ||
    function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i]
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    }

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function')
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError(
            'Super expression must either be null or a function, not ' + typeof superClass
        )
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
    })
    if (superClass)
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass)
}

/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { Component } from 'react'
import Voronoi from './Voronoi'
import Measure from 'react-measure'

var ResponsiveVoronoi = (function(_Component) {
    _inherits(ResponsiveVoronoi, _Component)

    function ResponsiveVoronoi() {
        var _temp, _this, _ret

        _classCallCheck(this, ResponsiveVoronoi)

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }

        return (
            (_ret = ((_temp = ((_this = _possibleConstructorReturn(
                this,
                _Component.call.apply(_Component, [this].concat(args))
            )),
            _this)),
            (_this.state = {
                dimensions: {
                    width: -1,
                    height: -1,
                },
            }),
            _temp)),
            _possibleConstructorReturn(_this, _ret)
        )
    }

    ResponsiveVoronoi.prototype.render = function render() {
        var _this2 = this

        var _state$dimensions = this.state.dimensions,
            width = _state$dimensions.width,
            height = _state$dimensions.height

        var shouldRender = width > 0 && height > 0

        return React.createElement(
            Measure,
            {
                bounds: true,
                onResize: function onResize(contentRect) {
                    _this2.setState({ dimensions: contentRect.bounds })
                },
            },
            function(_ref) {
                var measureRef = _ref.measureRef
                return React.createElement(
                    'div',
                    { ref: measureRef, style: { width: '100%', height: '100%' } },
                    shouldRender &&
                        React.createElement(
                            Voronoi,
                            _extends({ width: width, height: height }, _this2.props)
                        )
                )
            }
        )
    }

    return ResponsiveVoronoi
})(Component)

export default ResponsiveVoronoi
