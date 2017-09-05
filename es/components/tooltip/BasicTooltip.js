/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import Chip from './Chip'

var chipStyle = { marginRight: 7 }

var BasicTooltip = function BasicTooltip(_ref) {
    var id = _ref.id,
        value = _ref.value,
        enableChip = _ref.enableChip,
        color = _ref.color,
        theme = _ref.theme
    return React.createElement(
        'div',
        { style: theme.tooltip.container },
        React.createElement(
            'div',
            { style: theme.tooltip.basic },
            enableChip && React.createElement(Chip, { color: color, style: chipStyle }),
            value !== undefined
                ? React.createElement(
                      'span',
                      null,
                      id,
                      ': ',
                      React.createElement('strong', null, value)
                  )
                : id
        )
    )
}

BasicTooltip.propTypes = {
    id: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    enableChip: PropTypes.bool.isRequired,
    color: PropTypes.string,

    theme: PropTypes.shape({
        tooltip: PropTypes.shape({
            container: PropTypes.object.isRequired,
            basic: PropTypes.object.isRequired,
        }).isRequired,
    }).isRequired,
}

BasicTooltip.defaultProps = {
    enableChip: false,
}

export default pure(BasicTooltip)
