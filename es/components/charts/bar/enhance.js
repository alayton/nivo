/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import pure from 'recompose/pure'
import { withTheme, withColors, withDimensions, withMotion } from '../../../hocs'
import { getInheritedColorGenerator } from '../../../lib/colors'
import { getAccessorFor } from '../../../lib/propertiesConverters'
import { BarDefaultProps } from './props'

export default (function(Component) {
    return compose(
        defaultProps(BarDefaultProps),
        withTheme(),
        withColors(),
        withDimensions(),
        withMotion(),
        withPropsOnChange(['indexBy'], function(_ref) {
            var indexBy = _ref.indexBy
            return {
                getIndex: getAccessorFor(indexBy),
            }
        }),
        withPropsOnChange(['labelsTextColor'], function(_ref2) {
            var labelsTextColor = _ref2.labelsTextColor
            return {
                getLabelsTextColor: getInheritedColorGenerator(labelsTextColor, 'axis.textColor'),
            }
        }),
        withPropsOnChange(['labelsLinkColor'], function(_ref3) {
            var labelsLinkColor = _ref3.labelsLinkColor
            return {
                getLabelsLinkColor: getInheritedColorGenerator(labelsLinkColor, 'axis.tickColor'),
            }
        }),
        pure
    )(Component)
})
