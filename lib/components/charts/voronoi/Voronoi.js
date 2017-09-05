'use strict'

exports.__esModule = true

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _defaults = require('../../../defaults')

var _d3Voronoi = require('d3-voronoi')

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
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
} /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This file is part of the nivo project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * file that was distributed with this source code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Voronoi = (function(_Component) {
    _inherits(Voronoi, _Component)

    function Voronoi() {
        _classCallCheck(this, Voronoi)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    Voronoi.prototype.render = function render() {
        var _props = this.props,
            data = _props.data,
            _width = _props.width,
            _height = _props.height,
            _margin = _props.margin,
            x = _props.x,
            y = _props.y,
            enableSites = _props.enableSites,
            enableLinks = _props.enableLinks,
            enablePolygons = _props.enablePolygons,
            borderWidth = _props.borderWidth,
            borderColor = _props.borderColor,
            linkWidth = _props.linkWidth,
            linkColor = _props.linkColor

        var margin = Object.assign({}, _defaults.defaultMargin, _margin)
        var width = _width - margin.left - margin.right
        var height = _height - margin.top - margin.bottom

        var voronoi = (0, _d3Voronoi.voronoi)()
            .x(function(d) {
                return d[x]
            })
            .y(function(d) {
                return d[y]
            })
            .extent([[0, 0], [width, height]])

        var polygons = voronoi.polygons(data)
        var links = voronoi.links(data)

        return _react2.default.createElement(
            'svg',
            { xmlns: 'http://www.w3.org/2000/svg', width: _width, height: _height },
            _react2.default.createElement(
                'g',
                { transform: 'translate(' + margin.left + ',' + margin.top + ')' },
                enableLinks &&
                    links.map(function(l, i) {
                        return _react2.default.createElement('line', {
                            key: i,
                            fill: 'none',
                            stroke: linkColor,
                            strokeWidth: linkWidth,
                            x1: l.source[0],
                            y1: l.source[1],
                            x2: l.target[0],
                            y2: l.target[1],
                        })
                    }),
                enablePolygons &&
                    polygons.map(function(p, i) {
                        return _react2.default.createElement('path', {
                            key: i,
                            fill: 'none',
                            stroke: borderColor,
                            strokeWidth: borderWidth,
                            d: 'M' + p.join('L') + 'Z',
                        })
                    }),
                enableSites &&
                    data.map(function(d, i) {
                        return _react2.default.createElement('circle', {
                            key: i,
                            r: '2.5',
                            cx: d[0],
                            cy: d[1],
                            fill: '#F00',
                            stroke: 'none',
                        })
                    })
            )
        )
    }

    return Voronoi
})(_react.Component)

Voronoi.propTypes = {
    enableSites: _propTypes2.default.bool.isRequired,
    enableLinks: _propTypes2.default.bool.isRequired,
    enablePolygons: _propTypes2.default.bool.isRequired,
    x: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
        .isRequired,
    y: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
        .isRequired,
    colors: _propTypes2.default.any.isRequired,
    borderWidth: _propTypes2.default.number.isRequired,
    borderColor: _propTypes2.default.string.isRequired,
    linkWidth: _propTypes2.default.number.isRequired,
    linkColor: _propTypes2.default.string.isRequired,
}

Voronoi.defaultProps = {
    enableSites: true,
    enableLinks: true,
    enablePolygons: true,
    x: 0,
    y: 1,
    borderWidth: 1,
    borderColor: '#000',
    linkWidth: 1,
    linkColor: '#bbb',
    colors: _defaults.defaultColorRange,
}

exports.default = Voronoi
