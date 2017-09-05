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
import PropTypes from 'prop-types'
import noop from '../../lib/noop'

var containerStyle = {
    position: 'relative',
}

var tooltipStyle = {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
}

var Tooltip = function Tooltip(_ref) {
    var x = _ref.x,
        y = _ref.y,
        children = _ref.children,
        theme = _ref.theme
    return React.createElement(
        'div',
        { style: _extends({}, tooltipStyle, { top: y, left: x }, theme.tooltip) },
        children
    )
}

var noopHandlers = {
    showTooltip: noop,
    hideTooltip: noop,
}

var Container = (function(_Component) {
    _inherits(Container, _Component)

    function Container() {
        var _temp, _this, _ret

        _classCallCheck(this, Container)

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
                isTooltipVisible: false,
                tooltipContent: null,
                tooltipX: 0,
                tooltipY: 0,
            }),
            (_this.showTooltip = function(content, event) {
                var pageX = event.pageX,
                    pageY = event.pageY

                var bounds = _this.container.getBoundingClientRect()

                _this.setState({
                    isTooltipVisible: true,
                    tooltipContent: content,
                    tooltipX: pageX - bounds.left - window.pageXOffset + 20,
                    tooltipY: pageY - bounds.top - window.pageYOffset,
                })
            }),
            (_this.hideTooltip = function() {
                _this.setState({ isTooltipVisible: false, tooltipContent: null })
            }),
            _temp)),
            _possibleConstructorReturn(_this, _ret)
        )
    }

    Container.prototype.render = function render() {
        var _this2 = this

        var _props = this.props,
            children = _props.children,
            isInteractive = _props.isInteractive,
            theme = _props.theme
        var _state = this.state,
            isTooltipVisible = _state.isTooltipVisible,
            tooltipContent = _state.tooltipContent,
            tooltipX = _state.tooltipX,
            tooltipY = _state.tooltipY

        if (!isInteractive) return children(noopHandlers)

        return React.createElement(
            'div',
            {
                style: containerStyle,
                ref: function ref(container) {
                    _this2.container = container
                },
            },
            children({
                showTooltip: this.showTooltip,
                hideTooltip: this.hideTooltip,
            }),
            isTooltipVisible &&
                React.createElement(
                    Tooltip,
                    { x: tooltipX, y: tooltipY, theme: theme },
                    tooltipContent
                )
        )
    }

    return Container
})(Component)

Container.propTypes = {
    children: PropTypes.func.isRequired,
    isInteractive: PropTypes.bool.isRequired,
    theme: PropTypes.object.isRequired,
}
Container.defaultProps = {
    isInteractive: true,
}
export default Container
