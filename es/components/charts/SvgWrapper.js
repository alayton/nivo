/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'

var SvgWrapper = function SvgWrapper(_ref) {
    var width = _ref.width,
        height = _ref.height,
        margin = _ref.margin,
        children = _ref.children
    return React.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', width: width, height: height },
        React.createElement(
            'g',
            { transform: 'translate(' + margin.left + ',' + margin.top + ')' },
            children
        )
    )
}

export default SvgWrapper
