import _omit from 'lodash/omit'

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

import { getLabelGenerator } from '../../../lib/propertiesConverters'
import { treeMapPropTypes, treeMapDefaultProps } from './TreeMapProps'
import TreeMapPlaceholders from './TreeMapPlaceholders'
import { getInheritedColorGenerator } from '../../../lib/colors'

var createNodes = function createNodes(_ref) {
    var borderWidth = _ref.borderWidth,
        borderColor = _ref.borderColor,
        enableLabels = _ref.enableLabels,
        _label = _ref.label,
        labelFormat = _ref.labelFormat,
        orientLabels = _ref.orientLabels,
        labelSkipSize = _ref.labelSkipSize,
        labelTextColor = _ref.labelTextColor

    var label = getLabelGenerator(_label, labelFormat)
    var borderColorFn = getInheritedColorGenerator(borderColor)
    var textColorFn = getInheritedColorGenerator(labelTextColor)

    return function(nodes) {
        var renderedNodes = []

        nodes.forEach(function(node) {
            var shouldRenderLabel =
                enableLabels &&
                (labelSkipSize === 0 ||
                    Math.min(node.style.width, node.style.height) > labelSkipSize)

            var rotate = shouldRenderLabel && orientLabels && node.style.height > node.style.width

            renderedNodes.push(
                React.createElement(
                    'div',
                    {
                        key: node.key,
                        className: 'nivo_treemap_node',
                        style: {
                            boxSizing: 'border-box',
                            position: 'absolute',
                            top: node.style.y,
                            left: node.style.x,
                            width: node.style.width,
                            height: node.style.height,
                            background: node.style.color,
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: borderWidth,
                            borderStyle: 'solid',
                            borderColor: borderColorFn(
                                _extends({}, node.data, { color: node.style.color })
                            ),
                        },
                    },
                    shouldRenderLabel &&
                        React.createElement(
                            'span',
                            {
                                className: 'nivo_treemap_node_label',
                                style: {
                                    color: textColorFn(
                                        _extends({}, node.data, { color: node.style.color })
                                    ),
                                    transform: 'rotate(' + (rotate ? '-90' : '0') + 'deg)',
                                },
                            },
                            label(node.data)
                        )
                )
            )
        })

        return renderedNodes
    }
}

var TreeMapHTML = (function(_Component) {
    _inherits(TreeMapHTML, _Component)

    function TreeMapHTML() {
        _classCallCheck(this, TreeMapHTML)

        return _possibleConstructorReturn(this, _Component.apply(this, arguments))
    }

    TreeMapHTML.prototype.render = function render() {
        return React.createElement(
            TreeMapPlaceholders,
            _extends({}, this.props, { namespace: 'html' }),
            createNodes(this.props)
        )
    }

    return TreeMapHTML
})(Component)

TreeMapHTML.propTypes = _omit(treeMapPropTypes, ['children', 'namespace'])
TreeMapHTML.defaultProps = _omit(treeMapDefaultProps, [])
export default TreeMapHTML
