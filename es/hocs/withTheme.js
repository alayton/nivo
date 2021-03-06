import _merge from 'lodash/merge'
/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import withPropsOnChange from 'recompose/withPropsOnChange'

import { defaultTheme } from '../defaults'

/**
 * This HOC watch theme prop change
 * and returns it deeply merged with default theme.
 * Using it prevent from having a new ref each time
 * we pass through the component, useful for shallow comparison.
 */
export default (function() {
    var _setPropTypes

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$srcKey = _ref.srcKey,
        srcKey = _ref$srcKey === undefined ? 'theme' : _ref$srcKey,
        _ref$destKey = _ref.destKey,
        destKey = _ref$destKey === undefined ? 'theme' : _ref$destKey

    return compose(
        setPropTypes(
            ((_setPropTypes = {}), (_setPropTypes[srcKey] = PropTypes.object), _setPropTypes)
        ),
        withPropsOnChange([srcKey], function(props) {
            var _ref2

            return (_ref2 = {}), (_ref2[destKey] = _merge({}, defaultTheme, props[srcKey])), _ref2
        })
    )
})
