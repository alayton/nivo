import _get from 'lodash/get'
import _isFunction from 'lodash/isFunction' /*
                                              * This file is part of the nivo project.
                                              *
                                              * Copyright 2016-present, Raphaël Benitte.
                                              *
                                              * For the full copyright and license information, please view the LICENSE
                                              * file that was distributed with this source code.
                                              */

import { format } from 'd3-format'

export var getLabelGenerator = function getLabelGenerator(_label, labelFormat) {
    if (_isFunction(_label)) {
        return _label
    }

    var label = function label(d) {
        return _get(d, _label)
    }

    var formatter = void 0
    if (labelFormat) {
        formatter = format(labelFormat)
    }

    return function(data) {
        var labelOutput = label(data)

        if (formatter) {
            labelOutput = formatter(labelOutput)
        }

        return labelOutput
    }
}

export var getAccessorFor = function getAccessorFor(directive) {
    return _isFunction(directive)
        ? directive
        : function(d) {
              return d[directive]
          }
}
