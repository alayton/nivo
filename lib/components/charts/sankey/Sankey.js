'use strict'

exports.__esModule = true
exports.SankeyDefaultProps = undefined

var _cloneDeep2 = require('lodash/cloneDeep')

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2)

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
    } /*
                                                                                                                                                                                                                                                                   * This file is part of the nivo project.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * Copyright 2016-present, Raphaël Benitte.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * For the full copyright and license information, please view the LICENSE
                                                                                                                                                                                                                                                                   * file that was distributed with this source code.
                                                                                                                                                                                                                                                                   */

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _compose = require('recompose/compose')

var _compose2 = _interopRequireDefault(_compose)

var _defaultProps = require('recompose/defaultProps')

var _defaultProps2 = _interopRequireDefault(_defaultProps)

var _withState = require('recompose/withState')

var _withState2 = _interopRequireDefault(_withState)

var _withPropsOnChange = require('recompose/withPropsOnChange')

var _withPropsOnChange2 = _interopRequireDefault(_withPropsOnChange)

var _pure = require('recompose/pure')

var _pure2 = _interopRequireDefault(_pure)

var _d3Sankey = require('d3-sankey')

var _colors = require('../../../lib/colors')

var _hocs = require('../../../hocs')

var _props = require('../../../props')

var _SvgWrapper = require('../SvgWrapper')

var _SvgWrapper2 = _interopRequireDefault(_SvgWrapper)

var _SankeyNodes = require('./SankeyNodes')

var _SankeyNodes2 = _interopRequireDefault(_SankeyNodes)

var _SankeyLinks = require('./SankeyLinks')

var _SankeyLinks2 = _interopRequireDefault(_SankeyLinks)

var _SankeyLabels = require('./SankeyLabels')

var _SankeyLabels2 = _interopRequireDefault(_SankeyLabels)

var _Container = require('../Container')

var _Container2 = _interopRequireDefault(_Container)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var getId = function getId(d) {
    return d.id
}

var Sankey = function Sankey(_ref) {
    var _data = _ref.data,
        align = _ref.align,
        margin = _ref.margin,
        width = _ref.width,
        height = _ref.height,
        outerWidth = _ref.outerWidth,
        outerHeight = _ref.outerHeight,
        nodeOpacity = _ref.nodeOpacity,
        nodeHoverOpacity = _ref.nodeHoverOpacity,
        nodeWidth = _ref.nodeWidth,
        nodePaddingX = _ref.nodePaddingX,
        nodePaddingY = _ref.nodePaddingY,
        nodeBorderWidth = _ref.nodeBorderWidth,
        getNodeBorderColor = _ref.getNodeBorderColor,
        setCurrentNode = _ref.setCurrentNode,
        currentNode = _ref.currentNode,
        linkOpacity = _ref.linkOpacity,
        linkHoverOpacity = _ref.linkHoverOpacity,
        linkContract = _ref.linkContract,
        getLinkColor = _ref.getLinkColor,
        setCurrentLink = _ref.setCurrentLink,
        currentLink = _ref.currentLink,
        enableLabels = _ref.enableLabels,
        labelPosition = _ref.labelPosition,
        labelPadding = _ref.labelPadding,
        labelOrientation = _ref.labelOrientation,
        getLabelTextColor = _ref.getLabelTextColor,
        theme = _ref.theme,
        getColor = _ref.getColor,
        animate = _ref.animate,
        motionDamping = _ref.motionDamping,
        motionStiffness = _ref.motionStiffness,
        isInteractive = _ref.isInteractive

    var sankey = (0, _d3Sankey.sankey)()
        .nodeAlign((0, _props.sankeyAlignmentFromProp)(align))
        .nodeWidth(nodeWidth)
        .nodePadding(nodePaddingY)
        .size([width, height])
        .nodeId(getId)

    // deep clone is required as the sankey diagram mutates data
    var data = (0, _cloneDeep3.default)(_data)
    sankey(data)

    data.nodes.forEach(function(node) {
        node.color = getColor(node)
        node.x = node.x0 + nodePaddingX
        node.y = node.y0
        node.width = Math.max(node.x1 - node.x0 - nodePaddingX * 2, 0)
        node.height = Math.max(node.y1 - node.y0, 0)
    })

    data.links.forEach(function(link) {
        link.color = getLinkColor(link)
    })

    var motionProps = {
        animate: animate,
        motionDamping: motionDamping,
        motionStiffness: motionStiffness,
    }

    return _react2.default.createElement(
        _Container2.default,
        { isInteractive: isInteractive, theme: theme },
        function(_ref2) {
            var showTooltip = _ref2.showTooltip,
                hideTooltip = _ref2.hideTooltip
            return _react2.default.createElement(
                _SvgWrapper2.default,
                { width: outerWidth, height: outerHeight, margin: margin },
                _react2.default.createElement(
                    _SankeyLinks2.default,
                    _extends(
                        {
                            links: data.links,
                            linkContract: linkContract,
                            linkOpacity: linkOpacity,
                            linkHoverOpacity: linkHoverOpacity,
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip,
                            theme: theme,
                        },
                        motionProps
                    )
                ),
                _react2.default.createElement(
                    _SankeyNodes2.default,
                    _extends(
                        {
                            nodes: data.nodes,
                            nodePaddingX: nodePaddingX,
                            nodeOpacity: nodeOpacity,
                            nodeHoverOpacity: nodeHoverOpacity,
                            nodeBorderWidth: nodeBorderWidth,
                            getNodeBorderColor: getNodeBorderColor,
                            showTooltip: showTooltip,
                            hideTooltip: hideTooltip,
                            theme: theme,
                        },
                        motionProps
                    )
                ),
                enableLabels &&
                    _react2.default.createElement(
                        _SankeyLabels2.default,
                        _extends(
                            {
                                nodes: data.nodes,
                                width: width,
                                labelPosition: labelPosition,
                                labelPadding: labelPadding,
                                labelOrientation: labelOrientation,
                                getLabelTextColor: getLabelTextColor,
                                theme: theme,
                            },
                            motionProps
                        )
                    )
            )
        }
    )
}

Sankey.propTypes = {
    data: _propTypes2.default.shape({
        nodes: _propTypes2.default.arrayOf(
            _propTypes2.default.shape({
                id: _propTypes2.default.oneOfType([
                    _propTypes2.default.string,
                    _propTypes2.default.number,
                ]).isRequired,
            })
        ).isRequired,
        links: _propTypes2.default.arrayOf(
            _propTypes2.default.shape({
                source: _propTypes2.default.oneOfType([
                    _propTypes2.default.string,
                    _propTypes2.default.number,
                ]).isRequired,
                target: _propTypes2.default.oneOfType([
                    _propTypes2.default.string,
                    _propTypes2.default.number,
                ]).isRequired,
            })
        ).isRequired,
    }).isRequired,

    align: _props.sankeyAlignmentPropType.isRequired,

    // nodes
    nodeOpacity: _propTypes2.default.number.isRequired,
    nodeHoverOpacity: _propTypes2.default.number.isRequired,
    nodeWidth: _propTypes2.default.number.isRequired,
    nodePaddingX: _propTypes2.default.number.isRequired,
    nodePaddingY: _propTypes2.default.number.isRequired,
    nodeBorderWidth: _propTypes2.default.number.isRequired,
    nodeBorderColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]),

    // links
    linkOpacity: _propTypes2.default.number.isRequired,
    linkHoverOpacity: _propTypes2.default.number.isRequired,
    linkContract: _propTypes2.default.number.isRequired,

    // labels
    enableLabels: _propTypes2.default.bool.isRequired,
    labelPosition: _propTypes2.default.oneOf(['inside', 'outside']).isRequired,
    labelPadding: _propTypes2.default.number.isRequired,
    labelOrientation: _propTypes2.default.oneOf(['horizontal', 'vertical']).isRequired,
    labelTextColor: _propTypes2.default.oneOfType([
        _propTypes2.default.string,
        _propTypes2.default.func,
    ]),
    getLabelTextColor: _propTypes2.default.func.isRequired, // computed

    // interactivity
    isInteractive: _propTypes2.default.bool.isRequired,
}

var SankeyDefaultProps = (exports.SankeyDefaultProps = {
    align: 'center',

    // nodes
    nodeOpacity: 0.65,
    nodeHoverOpacity: 1,
    nodeWidth: 12,
    nodePaddingX: 0,
    nodePaddingY: 12,
    nodeBorderWidth: 1,
    nodeBorderColor: 'inherit:darker(0.5)',

    // links
    linkOpacity: 0.2,
    linkHoverOpacity: 0.4,
    linkContract: 0,

    // labels
    enableLabels: true,
    labelPosition: 'inside',
    labelPadding: 9,
    labelOrientation: 'horizontal',
    labelTextColor: 'inherit:darker(0.8)',

    // interactivity
    isInteractive: true,
})

var enhance = (0, _compose2.default)(
    (0, _defaultProps2.default)(SankeyDefaultProps),
    (0, _withState2.default)('currentNode', 'setCurrentNode', null),
    (0, _withState2.default)('currentLink', 'setCurrentLink', null),
    (0, _hocs.withColors)(),
    (0, _hocs.withColors)({
        colorByKey: 'linkColorBy',
        destKey: 'getLinkColor',
        defaultColorBy: 'source.id',
    }),
    (0, _hocs.withTheme)(),
    (0, _hocs.withDimensions)(),
    (0, _hocs.withMotion)(),
    (0, _withPropsOnChange2.default)(['nodeBorderColor'], function(_ref3) {
        var nodeBorderColor = _ref3.nodeBorderColor
        return {
            getNodeBorderColor: (0, _colors.getInheritedColorGenerator)(nodeBorderColor),
        }
    }),
    (0, _withPropsOnChange2.default)(['labelTextColor'], function(_ref4) {
        var labelTextColor = _ref4.labelTextColor
        return {
            getLabelTextColor: (0, _colors.getInheritedColorGenerator)(labelTextColor),
        }
    }),
    _pure2.default
)

exports.default = enhance(Sankey)
